import React, { useState, useMemo, useEffect } from 'react';
import DialogModal from '@/Components/Modal/DialogModal';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import InputError from '@/Components/Form/InputError';
import SaveButton from '@/Components/Buttons/SaveButton';
import CancelButton from '@/Components/Buttons/CancelButton';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { HiExclamationCircle, HiPaperClip } from 'react-icons/hi';
import axios from 'axios';

const quillModules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'code-block'],
        ['clean'],
    ],
};

const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'code-block',
    'image',
];

export default function IssueReportModal({ show, onClose }) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('2'); // 1=Task, 2=Bug, 3=Feature, 4=Improvement
    const [priority, setPriority] = useState('2'); // 1=Low, 2=Medium, 3=High, 4=Urgent
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // Create object URL for attached image preview
    const imagePreviewUrl = useMemo(() => {
        if (!image) return null;
        if (typeof image === 'string') return image;
        return URL.createObjectURL(image);
    }, [image]);

    useEffect(() => {
        return () => {
            if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [imagePreviewUrl]);

    // Handle clipboard paste (Ctrl+V) for images anywhere in description or modal
    const handlePaste = (e) => {
        const items = e.clipboardData?.items || e.clipboardData?.files;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const file = item.getAsFile ? item.getAsFile() : item;
            if (file && file.type && file.type.startsWith('image/')) {
                const ext = file.type.split('/')[1] || 'png';
                const fileName = file.name && file.name !== 'image.png'
                    ? file.name
                    : `clipboard-image-${Date.now()}.${ext}`;

                const pastedFile = new File([file], fileName, { type: file.type });
                setImage(pastedFile);
                toast.info('Image attached from clipboard!');
                break;
            }
        }
    };

    // Handle drag & drop image
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            const droppedFile = files[0];
            if (droppedFile.type.startsWith('image/')) {
                setImage(droppedFile);
                toast.info('Image attached from drop!');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = 'Issue title is required.';
        }
        if (!description || description === '<p><br></p>' || !description.trim()) {
            newErrors.description = 'Please provide detailed issue description.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('title', title.trim());
            formData.append('description', description);
            formData.append('type', type);
            formData.append('priority', priority);
            if (image) {
                formData.append('image', image);
            }

            const res = await axios.post(route('issue.report'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data?.success) {
                toast.success(res.data.message || 'Issue report submitted successfully!');
                handleClose();
            } else {
                toast.error(res.data?.message || 'Failed to submit issue report.');
            }
        } catch (err) {
            console.error('Issue submission error:', err);
            const errMsg = err.response?.data?.message || 'An error occurred while submitting the issue.';
            toast.error(errMsg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setTitle('');
        setType('2');
        setPriority('2');
        setDescription('');
        setImage(null);
        setErrors({});
        onClose();
    };

    return (
        <DialogModal
            show={show}
            onClose={handleClose}
            maxWidth="2xl"
            icon={HiExclamationCircle}
            iconBgClass="bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
            title="Report an Issue"
            description="Submit bugs, feedback, or feature requests directly to our issue tracking system."
        >
            {/* Issue Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <InputLabel htmlFor="issue-title" value="Issue Title *" />
                    <TextInput
                        id="issue-title"
                        type="text"
                        className="mt-1 block w-full text-sm"
                        placeholder="e.g. Order tax calculation error on checkout"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <InputError message={errors.title} className="mt-1" />}
                </div>

                {/* Type & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="issue-type" value="Issue Type *" />
                        <SelectInput
                            id="issue-type"
                            className="mt-1 block w-full text-sm"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="2">Bug / Defect</option>
                            <option value="1">Task</option>
                            <option value="3">Feature Request</option>
                            <option value="4">Improvement</option>
                        </SelectInput>
                    </div>

                    <div>
                        <InputLabel htmlFor="issue-priority" value="Priority *" />
                        <SelectInput
                            id="issue-priority"
                            className="mt-1 block w-full text-sm"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                            <option value="4">Urgent / Critical</option>
                        </SelectInput>
                    </div>
                </div>

                {/* Description (Quill Editor) */}
                <div>
                    <InputLabel htmlFor="issue-description" value="Detailed Description *" />
                    <div
                        onPaste={handlePaste}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="mt-1 border border-slate-300 dark:border-slate-700 rounded-md overflow-hidden dark:bg-slate-900 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-200 [&_.ql-toolbar]:dark:border-slate-700 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[140px] [&_.ql-editor]:text-slate-800 [&_.ql-editor]:dark:text-slate-100"
                    >
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            modules={quillModules}
                            formats={quillFormats}
                            placeholder="Describe the issue, steps to reproduce, or expected behavior..."
                        />
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <span>💡</span> Tip: You can paste screenshots directly from your clipboard (<kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[10px] font-mono text-slate-700 dark:text-slate-300">Ctrl+V</kbd>) into the description box!
                    </p>
                    {errors.description && (
                        <InputError message={errors.description} className="mt-1" />
                    )}
                </div>

                {/* Optional Image Upload & Clipboard Attachment */}
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <InputLabel htmlFor="issue-image" value="Screenshot / Image Attachment (Optional)" />
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                            Paste clipboard image (Ctrl+V) or Drag & Drop supported
                        </span>
                    </div>

                    <div
                        onPaste={handlePaste}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className={`mt-1 border border-dashed rounded-lg p-3 transition-colors ${
                            image
                                ? 'border-indigo-400/60 dark:border-indigo-500/60 bg-indigo-50/50 dark:bg-indigo-950/30'
                                : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:border-indigo-400/40'
                        }`}
                    >
                        {imagePreviewUrl ? (
                            <div className="flex items-center gap-3">
                                <img
                                    src={imagePreviewUrl}
                                    alt="Attachment preview"
                                    className="w-14 h-14 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm shrink-0 bg-white dark:bg-slate-800"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                                        {image.name || 'Attached Screenshot'}
                                    </p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                        {image.size ? `${(image.size / 1024).toFixed(1)} KB` : 'Image Attachment'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition shrink-0 cursor-pointer"
                                    onClick={() => setImage(null)}
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <HiPaperClip className="w-5 h-5 text-slate-400 shrink-0" />
                                <input
                                    id="issue-image"
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-mainColor/10 file:text-mainColor hover:file:bg-mainColor/20 cursor-pointer"
                                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <CancelButton type="button" onClick={handleClose}>
                        Cancel
                    </CancelButton>
                    <SaveButton type="submit" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Issue'}
                    </SaveButton>
                </div>
            </form>
        </DialogModal>
    );
}

