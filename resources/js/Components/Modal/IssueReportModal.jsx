import React, { useState } from 'react';
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
import { HiExclamationCircle } from 'react-icons/hi';

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

        // Simulate frontend submission
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
        <DialogModal
            show={show}
            onClose={handleClose}
            maxWidth="2xl"
            icon={HiExclamationCircle}
            iconBgClass="bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
            title="Report an Issue"
            description="Submit bugs, feedback, or system issues for prompt assistance."
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

                {/* Category & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="issue-category" value="Category" />
                        <SelectInput
                            id="issue-category"
                            className="mt-1 block w-full text-sm"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="bug">Bug / Defect</option>
                            <option value="feature">Feature Request</option>
                            <option value="performance">Performance Issue</option>
                            <option value="general">General Query</option>
                        </SelectInput>
                    </div>

                    <div>
                        <InputLabel htmlFor="issue-priority" value="Priority" />
                        <SelectInput
                            id="issue-priority"
                            className="mt-1 block w-full text-sm"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </SelectInput>
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
        </DialogModal>
    );
}
