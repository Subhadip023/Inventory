import React from 'react';
import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import {
    HiArrowSmRight,
    HiChartPie,
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiShoppingBag,
    HiUser,
} from "react-icons/hi";
import { Link } from '@inertiajs/react';
import { twMerge } from "tailwind-merge";
import { IoSettingsSharp } from "react-icons/io5";

const customSidebarTheme = {
    root: {
        inner: "h-full overflow-y-auto overflow-x-hidden bg-white py-4 px-3 dark:bg-slate-800"
    }
};

const StoreSideBar = ({ classNames = '', signOut }) => {
    return (
        <section className={`h-full ${classNames}`}>
            <Sidebar aria-label="Store Sidebar Navigation" theme={customSidebarTheme} className="h-full w-full">
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem as={Link} href={route('shop.dashboard')} icon={HiChartPie} active={route().current('shop.dashboard')}>
                            Dashboard
                        </SidebarItem>

                        <SidebarCollapse
                            icon={HiShoppingBag}
                            label="Inventory & Sales"
                            renderChevronIcon={(theme, open) => {
                                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                                return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? "on" : "off"])} />;
                            }}
                            open={
                                route().current('products.index') ||
                                route().current('products.create') ||
                                route().current('products.edit') ||
                                route().current('batches.index') ||
                                route().current('orders.index') ||
                                route().current('orders.create') ||
                                route().current('orders.edit') ||
                                route().current('orders.show')
                            }
                        >
                            <SidebarItem as={Link} href={route('products.index')} active={route().current('products.index')}>
                                Products Catalog
                            </SidebarItem>
                            <SidebarItem as={Link} href={route('products.create')} active={route().current('products.create')}>
                                Add Product
                            </SidebarItem>
                            <SidebarItem as={Link} href={route('batches.index')} active={route().current('batches.index')}>
                                Stock / Batches
                            </SidebarItem>
                            <SidebarItem as={Link} href={route('orders.index')} active={route().current('orders.index') || route().current('orders.create') || route().current('orders.edit') || route().current('orders.show')}>
                                Orders
                            </SidebarItem>
                        </SidebarCollapse>

                        <SidebarItem as={Link} href={route('users.index')} active={route().current('users.index')} icon={HiUser}>
                            Users
                        </SidebarItem>

                        <SidebarItem as={Link} href={route('profile.edit')} active={route().current('profile.edit')} icon={HiUser}>
                            Profile
                        </SidebarItem>

                        <SidebarItem as={Link} href={route('settings.index')} active={route().current('settings.index')} icon={IoSettingsSharp}>
                            Settings
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

export default StoreSideBar;
