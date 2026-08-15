import React, { useEffect, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar } from "flowbite-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreSideBar from '@/Components/StoreSideBar';
import SuperAdminSideBar from '@/Components/SuperAdminSideBar';
import UserActivity from '@/Components/UserActivity';

export default function DashboardLayout({ children, head, type }) {
    const { flash, theme_mode, user_status } = usePage().props;
    const user = usePage().props.auth?.user || {};
    const [showSidebar, setShowSidebar] = useState(true);

    const form = useForm({});

    useEffect(() => {
        if (theme_mode) {
            document.body.className = theme_mode;
        }
    }, [theme_mode]);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
        if (flash?.warning) toast.warning(flash.warning);
        if (flash?.info) toast.info(flash.info);
    }, [flash]);

    const signOut = () => {
        form.post(route('logout'));
    };

    // Determine if SuperAdmin layout mode should be rendered
    const isSuperAdminRoute = () => {
        if (type === 'superadmin') return true;
        if (type === 'store') return false;

        const currentRoute = route().current() || '';
        if (currentRoute.startsWith('superadmin.') ||
            currentRoute.startsWith('universal-products') ||
            currentRoute.startsWith('medicine-categories') ||
            currentRoute.startsWith('role.') ||
            currentRoute.startsWith('permission.')) {
            return true;
        }

        if (Array.isArray(user.roles)) {
            return user.roles.some(r => r.name === 'super-admin');
        }

        return false;
    };

    const isSuperAdmin = isSuperAdminRoute();

    return (
        <section className="flex h-screen dark:text-white">
            <Head title={head || 'Dashboard'} />
            <ToastContainer />

            {isSuperAdmin ? (
                <SuperAdminSideBar
                    signOut={signOut}
                    classNames={`shadow-md transition-all duration-300 ease-in-out ${showSidebar ? 'w-64' : 'w-0 overflow-hidden'}`}
                />
            ) : (
                <StoreSideBar
                    signOut={signOut}
                    classNames={`shadow-md transition-all duration-300 ease-in-out ${showSidebar ? 'w-64' : 'w-0 overflow-hidden'}`}
                />
            )}

            <section
                className={`flex flex-col transition-all duration-300 ease-in-out ${showSidebar ? 'w-[calc(100%-16rem)]' : 'w-full'}`}
            >
                <Navbar className="z-10 shadow-md sticky top-0">
                    <RxHamburgerMenu
                        className="hover:cursor-pointer scale-105 dark:text-white text-xl"
                        onClick={() => setShowSidebar(!showSidebar)}
                    />
                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <div className="flex flex-col items-center">
                                    <Avatar
                                        alt="User settings"
                                        img={
                                            user.profile_image
                                                ? '/storage/' + user.profile_image
                                                : 'https://cdn.pixabay.com/photo/2017/11/10/05/46/user-2935524_960_720.png'
                                        }
                                        rounded
                                    />
                                    {user_status && user_status.length > 0 && (
                                        <div
                                            className="relative -top-3 -right-4 -mb-2"
                                            dangerouslySetInnerHTML={{
                                                __html: user_status[
                                                    user.manual_status_id
                                                        ? user.manual_status_id - 1
                                                        : (user.user_status_id ? user.user_status_id - 1 : 0)
                                                ]?.svg || ''
                                            }}
                                        />
                                    )}
                                </div>
                            }
                        >
                            <DropdownHeader>
                                <span className="block text-sm font-semibold">{user.name}</span>
                                <span className="block truncate text-xs text-slate-500 font-medium">{user.email}</span>
                            </DropdownHeader>

                            {isSuperAdmin && <UserActivity />}

                            <DropdownItem as={Link} href={route('dashboard')}>
                                Dashboard
                            </DropdownItem>
                            <DropdownItem as={Link} href={route('settings.index')}>
                                Settings
                            </DropdownItem>
                            <DropdownDivider />
                            <DropdownItem onClick={signOut}>
                                Sign out
                            </DropdownItem>
                        </Dropdown>
                    </div>
                </Navbar>

                <div className="flex-1 p-4 overflow-auto bg-blue-50 dark:bg-gray-700">
                    {children}
                </div>
            </section>
        </section>
    );
}
