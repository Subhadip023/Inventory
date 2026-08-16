<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class IssueReportController extends Controller
{
    /**
     * Handle issue submission and forward to Workhub API.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|integer|in:1,2,3,4',
            'priority' => 'required|integer|in:1,2,3,4',
            'status' => 'nullable|integer|in:1,2,3,4',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp,svg|max:5120',
        ]);

        $apiUrl = config('services.workhub.url');
        $apiKey = config('services.workhub.api_key');
        $secretKey = config('services.workhub.secret_key');

        if (!$apiUrl) {
            return response()->json([
                'success' => false,
                'message' => 'WORKHUB_API_URL is not configured in .env',
            ], 500);
        }

        // Construct task payload
        $payloadData = [
            'title' => $validated['title'],
            'description' => strip_tags($validated['description']),
            'type' => (int) $validated['type'],
            'priority' => (int) $validated['priority'],
            'status' => isset($validated['status']) ? (int) $validated['status'] : 1,
        ];

        // Attach user info to description for context if user is logged in
        if (auth()->check()) {
            $user = auth()->user();
            $payloadData['description'] .= "<br><br>--- Reported By ---<br>Name: {$user->name}<br>Email: {$user->email}";
        }

        // Convert image file to base64 if provided
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $mime = $file->getMimeType();
            $base64Data = base64_encode(file_get_contents($file->getRealPath()));
            $payloadData['image_base64'] = "data:{$mime};base64,{$base64Data}";
        }

        $jsonPayload = json_encode($payloadData, JSON_UNESCAPED_SLASHES);
        $signature = hash_hmac('sha256', $jsonPayload, $secretKey);

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'X-Api-Key' => $apiKey,
                'X-Api-Signature' => $signature,
            ])
            ->withBody($jsonPayload, 'application/json')
            ->post($apiUrl);

            if ($response->successful()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Issue report submitted successfully!',
                    'data' => $response->json(),
                ]);
            }

            Log::error('Workhub API Issue Submission Failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to process issue report: ' . ($response->json('message') ?? 'External API error'),
            ], $response->status());

        } catch (\Throwable $e) {
            Log::error('Workhub API Connection Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Could not connect to issue tracker service.',
            ], 500);
        }
    }

    /**
     * Display list of issues fetched from Workhub API (Super Admin view).
     */
    public function index()
    {
        $apiUrl = config('services.workhub.url');
        $apiKey = config('services.workhub.api_key');
        $secretKey = config('services.workhub.secret_key');

        $issues = [];
        $apiError = null;

        if (!$apiUrl) {
            $apiError = 'WORKHUB_API_URL is not configured in .env';
        } else {
            try {
                $signature = hash_hmac('sha256', '', $secretKey);

                $response = Http::withHeaders([
                    'X-Api-Key' => $apiKey,
                    'X-Api-Signature' => $signature,
                    'Accept' => 'application/json',
                ])->get($apiUrl);

                if ($response->successful()) {
                    $jsonRes = $response->json();
                    $issues = $jsonRes['data'] ?? $jsonRes['tasks'] ?? $jsonRes ?? [];
                    if (!is_array($issues)) {
                        $issues = [];
                    }
                } else {
                    $apiError = 'Failed to fetch issues from Workhub API (Status: ' . $response->status() . ')';
                }
            } catch (\Throwable $e) {
                Log::error('Workhub Fetch Issues Error: ' . $e->getMessage());
                $apiError = 'Could not connect to Workhub API: ' . $e->getMessage();
            }
        }

        return \Inertia\Inertia::render('SuperAdmin/Issues/Index', [
            'issues' => $issues,
            'apiError' => $apiError,
        ]);
    }
}
