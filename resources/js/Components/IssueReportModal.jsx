import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SaveButton from '@/Components/SaveButton';
import CancelButton from '@/Components/CancelButton';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { HiExclamationCircle, HiX } from 'react-icons/hi';

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
];

export default function IssueReportModal({ show, onClose }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('bug');
    const [priority, setPriority] = useState('medium');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
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

        // Simulate frontend submission / TODO: Connect to backend route e.g. router.post(route('issues.store'), data)
        setTimeout(() => {
            setSubmitting(false);
            toast.success('Issue report submitted successfully!');
            handleClose();
        }, 600);
    };

    const handleClose = () => {
        setTitle('');
        setCategory('bug');
        setPriority('medium');
        setDescription('');
        setErrors({});
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose} maxWidth="2xl">
            <div className="p-6 space-y-5 text-slate-800 dark:text-slate-100">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                            <HiExclamationCircle className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold tracking-tight">Report an Issue</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Submit bugs, feedback, or system issues for prompt assistance.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                    >
                        <HiX className="text-lg" />
                    </button>
                </div>

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

                    {/* Category & Priority */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="issue-category" value="Category" />
                            <select
                                id="issue-category"
                                className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 text-sm focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="bug">Bug / Defect</option>
                                <option value="feature">Feature Request</option>
                                <option value="performance">Performance Issue</option>
                                <option value="general">General Query</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="issue-priority" value="Priority" />
                            <select
                                id="issue-priority"
                                className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 text-sm focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                    </div>

                    {/* Description (Quill Editor) */}
                    <div>
                        <InputLabel htmlFor="issue-description" value="Detailed Description *" />
                        <div className="mt-1 border border-slate-300 dark:border-slate-700 rounded-md overflow-hidden dark:bg-slate-900 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-200 [&_.ql-toolbar]:dark:border-slate-700 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[140px] [&_.ql-editor]:text-slate-800 [&_.ql-editor]:dark:text-slate-100">
                            <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={setDescription}
                                modules={quillModules}
                                formats={quillFormats}
                                placeholder="Describe the issue, steps to reproduce, or expected behavior..."
                            />
                        </div>
                        {errors.description && (
                            <InputError message={errors.description} className="mt-1" />
                        )}
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
            </div>
        </Modal>
    );
}
