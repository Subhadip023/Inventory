import React from 'react';
import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import {
    HiArrowSmRight,
    HiChartPie,
    HiShoppingBag,
    HiUser,
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiReceiptTax,
} from "react-icons/hi";
import { Link } from '@inertiajs/react';
import { twMerge } from "tailwind-merge";

const customSidebarTheme = {
    root: {
        inner: "h-full overflow-y-auto overflow-x-hidden bg-white py-4 px-3 dark:bg-slate-800"
    }
};

const SuperAdminSideBar = ({ classNames = '', signOut }) => {
    return (
        <section className={`h-full ${classNames}`}>
            <Sidebar aria-label="SuperAdmin Sidebar Navigation" theme={customSidebarTheme} className="h-full w-full">
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem as={Link} href={route('dashboard')} icon={HiChartPie} active={route().current('dashboard') || route().current('superadmin.dashboard')}>
                            Dashboard
                        </SidebarItem>

                        <SidebarItem as={Link} href={route('universal-products.index')} active={route().current('universal-products.index')} icon={HiShoppingBag}>
                            Universal Products
                        </SidebarItem>

                        <SidebarItem as={Link} href={route('medicine-categories.index')} active={route().current('medicine-categories.index')} icon={HiShoppingBag}>
                            Medicine Categories
                        </SidebarItem>

                        <SidebarCollapse
                            icon={HiUser}
                            label="User Management"
                            renderChevronIcon={(theme, open) => {
                                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                                return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? "on" : "off"])} />;
                            }}
                            open={
                                route().current('superadmin.users.index') ||
                                route().current('superadmin.users-status.index') ||
                                route().current('superadmin.all-activity') ||
                                route().current('role.index')
                            }
                        >
                            <SidebarItem as={Link} href={route('superadmin.users.index')} active={route().current('superadmin.users.index')}>
                                All Users
                            </SidebarItem>
                            <SidebarItem as={Link} href={route('superadmin.users-status.index')} active={route().current('superadmin.users-status.index')}>
                                User Status
                            </SidebarItem>
                            <SidebarItem as={Link} href={route('superadmin.all-activity')} active={route().current('superadmin.all-activity')}>
                                Users Activity
                            </SidebarItem>
                            <SidebarItem as={Link} href={route('role.index')} active={route().current('role.index')}>
                                Roles & Permissions
                            </SidebarItem>
                        </SidebarCollapse>

                        <SidebarItem as={Link} href={route('superadmin.tax.index')} active={route().current('superadmin.tax.index')} icon={HiReceiptTax}>
                            Tax Management
                        </SidebarItem>

                        <SidebarItem onClick={signOut} icon={HiArrowSmRight} className="cursor-pointer">
                            Sign Out
                        </SidebarItem>
                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </section>
    );
};

export default SuperAdminSideBar;
