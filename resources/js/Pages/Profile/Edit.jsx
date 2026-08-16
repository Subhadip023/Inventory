import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CardContainer from '@/Components/UI/CardContainer';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { HiUser, HiKey, HiExclamationCircle } from 'react-icons/hi';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <DashboardLayout head="Profile Settings">
            <Head title="Profile Settings" />

            <div className="space-y-6 max-w-5xl mx-auto">
                <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                        Profile & Account Settings
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your account settings, personal details, security credentials, and preferences.
                    </p>
                </div>

                <div className="space-y-6">
                    <CardContainer>
                        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
                            <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                                <HiUser className="text-xl" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                                    Profile Information
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Update your account's name and primary email address.
                                </p>
                            </div>
                        </div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </CardContainer>

                    <CardContainer>
                        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
                            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                                <HiKey className="text-xl" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                                    Security & Password
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Ensure your account is using a strong, unique password to stay secure.
                                </p>
                            </div>
                        </div>
                        <UpdatePasswordForm />
                    </CardContainer>

                    <CardContainer className="border-red-200 dark:border-red-900/40">
                        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
                            <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                <HiExclamationCircle className="text-xl" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-red-600 dark:text-red-400">
                                    Danger Zone: Delete Account
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Permanently delete your account and remove access to all associated stores.
                                </p>
                            </div>
                        </div>
                        <DeleteUserForm />
                    </CardContainer>
                </div>
            </div>
        </DashboardLayout>
    );
}
