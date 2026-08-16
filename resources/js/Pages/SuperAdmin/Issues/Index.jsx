import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import {
    HiExclamationCircle,
    HiRefresh,
    HiSearch,
    HiEye,
    HiPaperClip,
    HiXCircle,
    HiCheckCircle,
    HiClock,
    HiViewGrid,
    HiViewList,
    HiClipboardList,
} from 'react-icons/hi';
import {
    HiOutlineBugAnt,
    HiOutlineLightBulb,
} from 'react-icons/hi2';
import DialogModal from '@/Components/Modal/DialogModal';
import CancelButton from '@/Components/Buttons/CancelButton';

const TYPE_CONFIG = {
    1: { label: 'Task', bg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800' },
    2: { label: 'Bug', bg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800' },
    3: { label: 'Feature', bg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800' },
    4: { label: 'Improvement', bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' },
};

const PRIORITY_CONFIG = {
    1: { label: 'Low', bg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700' },
    2: { label: 'Medium', bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800' },
    3: { label: 'High', bg: 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-200 dark:border-orange-800' },
    4: { label: 'Urgent', bg: 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-200 border border-red-300 dark:border-red-800' },
};

const STATUS_CONFIG = {
    1: { label: 'To Do', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
    2: { label: 'In Progress', bg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300' },
    3: { label: 'Completed', bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' },
    4: { label: 'On Hold', bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' },
};

export default function IssuesIndex({ issues = [], apiError = null }) {
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedPriority, setSelectedPriority] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        router.reload({
            onFinish: () => setRefreshing(false),
        });
    };

    // Calculate Summary Counts
    const stats = useMemo(() => {
        const list = Array.isArray(issues) ? issues : [];
        return {
            total: list.length,
            bugs: list.filter((i) => Number(i.type) === 2).length,
            features: list.filter((i) => Number(i.type) === 3).length,
            open: list.filter((i) => Number(i.status) === 1 || Number(i.status) === 2).length,
        };
    }, [issues]);

    // Filter Issues
    const filteredIssues = useMemo(() => {
        if (!Array.isArray(issues)) return [];
        return issues.filter((issue) => {
            const matchesSearch =
                !search.trim() ||
                (issue.title && issue.title.toLowerCase().includes(search.toLowerCase())) ||
                (issue.description && issue.description.toLowerCase().includes(search.toLowerCase()));

            const matchesType =
                selectedType === 'all' || String(issue.type) === String(selectedType);

            const matchesPriority =
                selectedPriority === 'all' || String(issue.priority) === String(selectedPriority);

            const matchesStatus =
                selectedStatus === 'all' || String(issue.status) === String(selectedStatus);

            return matchesSearch && matchesType && matchesPriority && matchesStatus;
        });
    }, [issues, search, selectedType, selectedPriority, selectedStatus]);

    return (
        <DashboardLayout type="superadmin" head="System Issues">
            {/* Top Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                    <HiExclamationCircle className="w-7 h-7 text-amber-500" />
                    System Issues & Tasks
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Manage reported bugs, feature requests, and system tasks powered by Workhub.
                </p>
            </div>

            {/* Stat Cards Overview (All 4 in 1 Row) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6">
                <div className="p-3 sm:p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shrink-0">
                        <HiClipboardList className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">Total Issues</p>
                        <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">{stats.total}</p>
                    </div>
                </div>

                <div className="p-3 sm:p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shrink-0">
                        <HiOutlineBugAnt className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">Bugs Reported</p>
                        <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">{stats.bugs}</p>
                    </div>
                </div>

                <div className="p-3 sm:p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shrink-0">
                        <HiOutlineLightBulb className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">Features</p>
                        <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">{stats.features}</p>
                    </div>
                </div>

                <div className="p-3 sm:p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                        <HiClock className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">Active / Open</p>
                        <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">{stats.open}</p>
                    </div>
                </div>
            </div>

            {/* API Connection Error Notice */}
            {apiError && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm mb-6 flex items-start gap-3">
                    <HiXCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold">API Connection Error</p>
                        <p className="text-xs mt-0.5">{apiError}</p>
                    </div>
                </div>
            )}

            {/* Controls & Filter Bar (All in 1 Row) */}
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm mb-6">
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full">
                    {/* Search Input */}
                    <div className="relative flex-1 min-w-[200px]">
                        <HiSearch className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by title or text..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-mainColor focus:border-mainColor"
                        />
                    </div>

                    {/* Type Dropdown */}
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-mainColor focus:border-mainColor cursor-pointer shrink-0"
                    >
                        <option value="all">All Types</option>
                        <option value="1">Task</option>
                        <option value="2">Bug</option>
                        <option value="3">Feature Request</option>
                        <option value="4">Improvement</option>
                    </select>

                    {/* Priority Dropdown */}
                    <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-mainColor focus:border-mainColor cursor-pointer shrink-0"
                    >
                        <option value="all">All Priorities</option>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                        <option value="4">Urgent</option>
                    </select>

                    {/* Status Dropdown */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-mainColor focus:border-mainColor cursor-pointer shrink-0"
                    >
                        <option value="all">All Statuses</option>
                        <option value="1">To Do</option>
                        <option value="2">In Progress</option>
                        <option value="3">Completed</option>
                        <option value="4">On Hold</option>
                    </select>

                    {/* View Switcher Toggle */}
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                        <button
                            type="button"
                            onClick={() => setViewMode('table')}
                            className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                                viewMode === 'table'
                                    ? 'bg-white dark:bg-slate-800 text-mainColor shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                            }`}
                            title="Table View"
                        >
                            <HiViewList className="w-4 h-4" />
                            <span className="hidden sm:inline">Table</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                                viewMode === 'grid'
                                    ? 'bg-white dark:bg-slate-800 text-mainColor shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                            }`}
                            title="Grid View"
                        >
                            <HiViewGrid className="w-4 h-4" />
                            <span className="hidden sm:inline">Cards</span>
                        </button>
                    </div>

                    {/* Refresh Button */}
                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-mainColor text-white hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-sm shrink-0"
                    >
                        <HiRefresh className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            {/* Content Views */}
            {filteredIssues.length > 0 ? (
                viewMode === 'table' ? (
                    /* Table View */
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm overflow-hidden">
                        <Table hoverable>
                            <TableHead className="bg-slate-50 dark:bg-slate-900/60">
                                <TableRow>
                                    <TableHeadCell className="py-3 text-xs">ID</TableHeadCell>
                                    <TableHeadCell className="py-3 text-xs">Title & Description</TableHeadCell>
                                    <TableHeadCell className="py-3 text-xs">Type</TableHeadCell>
                                    <TableHeadCell className="py-3 text-xs">Priority</TableHeadCell>
                                    <TableHeadCell className="py-3 text-xs">Status</TableHeadCell>
                                    <TableHeadCell className="py-3 text-xs text-right">Action</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {filteredIssues.map((issue, idx) => {
                                    const typeInfo = TYPE_CONFIG[issue.type] || { label: 'Task', bg: 'bg-gray-100 text-gray-700' };
                                    const priorityInfo = PRIORITY_CONFIG[issue.priority] || { label: 'Medium', bg: 'bg-gray-100 text-gray-700' };
                                    const statusInfo = STATUS_CONFIG[issue.status] || { label: 'To Do', bg: 'bg-gray-100 text-gray-700' };

                                    return (
                                        <TableRow key={issue.id || idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition">
                                            <TableCell className="py-4 font-bold text-xs text-slate-500">
                                                #{issue.id || idx + 1}
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="max-w-md">
                                                    <p className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1">
                                                        {issue.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                                        {issue.description ? issue.description.replace(/<[^>]*>?/gm, '') : 'No description'}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${typeInfo.bg}`}>
                                                    {typeInfo.label}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${priorityInfo.bg}`}>
                                                    {priorityInfo.label}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusInfo.bg}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedIssue(issue)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-mainColor/10 text-mainColor hover:bg-mainColor/20 transition cursor-pointer"
                                                >
                                                    <HiEye className="w-3.5 h-3.5" />
                                                    View
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    /* Grid View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredIssues.map((issue, idx) => {
                            const typeInfo = TYPE_CONFIG[issue.type] || { label: 'Task', bg: 'bg-gray-100 text-gray-700' };
                            const priorityInfo = PRIORITY_CONFIG[issue.priority] || { label: 'Medium', bg: 'bg-gray-100 text-gray-700' };
                            const statusInfo = STATUS_CONFIG[issue.status] || { label: 'To Do', bg: 'bg-gray-100 text-gray-700' };

                            return (
                                <div
                                    key={issue.id || idx}
                                    className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${typeInfo.bg}`}>
                                                {typeInfo.label}
                                            </span>
                                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${priorityInfo.bg}`}>
                                                {priorityInfo.label}
                                            </span>
                                        </div>

                                        <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-mainColor transition line-clamp-2">
                                            {issue.title}
                                        </h3>

                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                                            {issue.description ? issue.description.replace(/<[^>]*>?/gm, '') : 'No description provided.'}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${statusInfo.bg}`}>
                                            {statusInfo.label}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedIssue(issue)}
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-mainColor hover:underline cursor-pointer"
                                        >
                                            <HiEye className="w-3.5 h-3.5" />
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            ) : (
                /* Empty State */
                <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
                    <HiExclamationCircle className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                    <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">No issues found</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {search || selectedType !== 'all' || selectedPriority !== 'all' || selectedStatus !== 'all'
                            ? 'Try clearing search or filter selections.'
                            : 'No system issues reported.'}
                    </p>
                </div>
            )}

            {/* Issue Detail Modal */}
            {selectedIssue && (
                <DialogModal
                    show={!!selectedIssue}
                    onClose={() => setSelectedIssue(null)}
                    maxWidth="2xl"
                    icon={HiExclamationCircle}
                    iconBgClass="bg-mainColor/10 text-mainColor"
                    title={selectedIssue.title}
                    description={`Issue #${selectedIssue.id || 'N/A'}`}
                >
                    <div className="space-y-4">
                        {/* Meta Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${TYPE_CONFIG[selectedIssue.type]?.bg}`}>
                                Type: {TYPE_CONFIG[selectedIssue.type]?.label || 'Task'}
                            </span>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${PRIORITY_CONFIG[selectedIssue.priority]?.bg}`}>
                                Priority: {PRIORITY_CONFIG[selectedIssue.priority]?.label || 'Medium'}
                            </span>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_CONFIG[selectedIssue.status]?.bg}`}>
                                Status: {STATUS_CONFIG[selectedIssue.status]?.label || 'To Do'}
                            </span>
                        </div>

                        {/* Description */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Description</h4>
                            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed border border-slate-200 dark:border-slate-800">
                                {selectedIssue.description || 'No description available.'}
                            </div>
                        </div>

                        {/* Attachment Image Preview */}
                        {(selectedIssue.image_url || selectedIssue.image_base64 || selectedIssue.image) && (
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                                    <HiPaperClip className="w-3.5 h-3.5" />
                                    Attachment Image
                                </h4>
                                <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-h-[300px] overflow-auto flex items-center justify-center">
                                    <img
                                        src={selectedIssue.image_url || selectedIssue.image_base64 || selectedIssue.image}
                                        alt="Issue Attachment"
                                        className="max-h-[280px] object-contain rounded-lg shadow-sm"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end pt-3 border-t border-slate-200 dark:border-slate-700">
                            <CancelButton onClick={() => setSelectedIssue(null)}>
                                Close
                            </CancelButton>
                        </div>
                    </div>
                </DialogModal>
            )}
        </DashboardLayout>
    );
}
