import React, { useEffect, useState, useMemo } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreSideBar from '@/Components/StoreSideBar';
import SuperAdminSideBar from '@/Components/SuperAdminSideBar';
import UserActivity from '@/Components/UserActivity';

export default function DashboardLayout({ children, head, type }) {
    const { flash, theme_mode, user_status } = usePage().props;
    const user = usePage().props.auth?.user || {};

    const [showSidebar, setShowSidebar] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 768;
        }
        return true;
    });

    const form = useForm({});

    // Dark mode HTML & Body sync
    useEffect(() => {
        const isDark = theme_mode === 'dark';
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }
    }, [theme_mode]);

    // Flash toast notifications
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
        if (flash?.warning) toast.warning(flash.warning);
        if (flash?.info) toast.info(flash.info);
    }, [flash]);

    // Auto-close sidebar on mobile navigation
    useEffect(() => {
        const unbind = router.on('navigate', () => {
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
                setShowSidebar(false);
            }
        });
        return () => unbind();
    }, []);

    const signOut = () => {
        form.post(route('logout'));
    };

    const isSuperAdmin = useMemo(() => {
        if (type === 'superadmin') return true;
        if (type === 'store') return false;

        const currentRoute = route().current() || '';
        if (
            currentRoute.startsWith('superadmin.') ||
            currentRoute.startsWith('universal-products') ||
            currentRoute.startsWith('medicine-categories') ||
            currentRoute.startsWith('role.') ||
            currentRoute.startsWith('permission.')
        ) {
            return true;
        }

        if (Array.isArray(user.roles)) {
            return user.roles.some((r) => r.name === 'super-admin');
        }

        return false;
    }, [type, user.roles]);

    const profileImageUrl = useMemo(() => {
        if (!user.profile_image) {
            return 'https://cdn.pixabay.com/photo/2017/11/10/05/46/user-2935524_960_720.png';
        }
        if (
            user.profile_image.startsWith('http://') ||
            user.profile_image.startsWith('https://') ||
            user.profile_image.startsWith('/')
        ) {
            return user.profile_image;
        }
        return `/storage/${user.profile_image}`;
    }, [user.profile_image]);

    const activeStatus = useMemo(() => {
        if (!user_status || !Array.isArray(user_status)) return null;
        const activeStatusId = user.manual_status_id || user.user_status_id;
        return user_status.find((s) => s.id === activeStatusId) || user_status[0];
    }, [user_status, user.manual_status_id, user.user_status_id]);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <Head title={head || 'Dashboard'} />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme={theme_mode === 'dark' ? 'dark' : 'light'}
            />

            {/* Mobile Backdrop Overlay */}
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden transition-opacity"
                    onClick={() => setShowSidebar(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 
                    transition-all duration-300 ease-in-out h-full
                    fixed inset-y-0 left-0 z-40 w-64 shadow-2xl md:shadow-none md:static md:z-20
                    ${showSidebar ? 'translate-x-0 md:w-64' : '-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden md:border-none'}
                `}
            >
                {isSuperAdmin ? (
                    <SuperAdminSideBar signOut={signOut} />
                ) : (
                    <StoreSideBar signOut={signOut} />
                )}
            </aside>

            {/* Main View Area */}
            <div className="flex flex-1 flex-col h-full overflow-hidden min-w-0">
                {/* Navbar */}
                <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-6 z-10 flex-shrink-0 shadow-sm">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setShowSidebar(!showSidebar)}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none transition"
                            aria-label="Toggle Sidebar"
                            aria-expanded={showSidebar}
                        >
                            <RxHamburgerMenu className="text-xl" />
                        </button>

                        <Link
                            href={isSuperAdmin ? route('dashboard') : route('shop.dashboard')}
                            className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-white group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-black text-xs shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                                INV
                            </div>
                            <span className="text-base tracking-tight font-semibold hidden sm:inline">
                                Inventory
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/60 transition">
                                    <div className="relative">
                                        <Avatar
                                            alt={user.name || 'User'}
                                            img={profileImageUrl}
                                            rounded
                                            size="sm"
                                        />
                                        {activeStatus?.svg && (
                                            <div
                                                className="absolute -bottom-1 -right-1 w-3.5 h-3.5 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 p-0.5 shadow-sm [&>svg]:w-3 [&>svg]:h-3"
                                                dangerouslySetInnerHTML={{ __html: activeStatus.svg }}
                                            />
                                        )}
                                    </div>
                                    <div className="hidden md:block text-left text-xs">
                                        <p className="font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                                            {user.name || 'Account'}
                                        </p>
                                        <p className="text-slate-400 font-normal">
                                            {isSuperAdmin ? 'Super Admin' : 'Pharmacy Admin'}
                                        </p>
                                    </div>
                                </div>
                            }
                        >
                            <DropdownHeader className="px-4 py-2">
                                <span className="block text-sm font-semibold text-slate-800 dark:text-white">
                                    {user.name}
                                </span>
                                <span className="block truncate text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    {user.email}
                                </span>
                            </DropdownHeader>

                            {isSuperAdmin && <UserActivity />}

                            <DropdownItem as={Link} href={isSuperAdmin ? route('dashboard') : route('shop.dashboard')}>
                                Dashboard
                            </DropdownItem>
                            <DropdownItem as={Link} href={route('settings.index')}>
                                Settings
                            </DropdownItem>
                            <DropdownDivider />
                            <DropdownItem onClick={signOut} className="text-red-600 dark:text-red-400 font-medium cursor-pointer">
                                Sign out
                            </DropdownItem>
                        </Dropdown>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-100 dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}