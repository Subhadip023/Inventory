<?php

namespace App\Http\Controllers;

use App\Models\MedicineCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MedicineCategoryController extends Controller
{
    /**
     * Display a listing of medicine categories.
     */
    public function index(Request $request)
    {
        $query = MedicineCategory::query();

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $categories = $query->orderBy('name', 'asc')->get();

        return Inertia::render('SuperAdmin/MedicineCategories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created medicine category in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:medicine_categories,name',
        ]);

        MedicineCategory::create($validated);

        return redirect()->back()->with('success', 'Medicine category created successfully.');
    }

    /**
     * Update the specified medicine category in storage.
     */
    public function update(Request $request, MedicineCategory $medicineCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:medicine_categories,name,' . $medicineCategory->id,
        ]);

        $medicineCategory->update($validated);

        return redirect()->back()->with('success', 'Medicine category updated successfully.');
    }

    /**
     * Remove the specified medicine category from storage.
     */
    public function destroy(MedicineCategory $medicineCategory)
    {
        $medicineCategory->delete();

        return redirect()->back()->with('success', 'Medicine category deleted successfully.');
    }
}
