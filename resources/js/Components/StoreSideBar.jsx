import React from 'react';
import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiShoppingBag,
    HiTable,
    HiUser,
} from "react-icons/hi";
import { Link } from '@inertiajs/react';
import { twMerge } from "tailwind-merge";
import { IoSettingsSharp } from "react-icons/io5";
import { usePage } from "@inertiajs/react";


const StoreSideBar = ({classNames,signOut}) => {
    const {current_shop} = usePage().props
    const {user}=usePage().props
    // console.log(current_shop);
    return (
        <section className= {`h-screen ${classNames} sticky top-0 `}>
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem as={Link} href={route('dashboard')} icon={HiChartPie} active={route().current('dashboard')}>
                            Dashboard
                        </SidebarItem>
                        <SidebarCollapse
                            icon={HiShoppingBag}
                            label="E-commerce"
                            renderChevronIcon={(theme, open) => {
                                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                return <IconComponent aria-hidden className={ twMerge(theme.label.icon.open[open ? "on" : "off"])} />;
                            }}
                            open={route().current('products.index') || route().current('products.create') || route().current('products.edit') || route().current('orders.index') || route().current('orders.create') || route().current('orders.edit') || route().current('orders.show')}
                        >
                            <SidebarItem as={Link} href={route('products.index')} active={route().current('products.index')}>Products</SidebarItem>
                            <SidebarItem as={Link} href={route('orders.index') } active={route().current('orders.index') || route().current('orders.create') || route().current('orders.edit') || route().current('orders.show')}>Orders</SidebarItem>
                            <SidebarItem href="#">Sales</SidebarItem>
                            <SidebarItem href="#">Refunds</SidebarItem>
                            <SidebarItem href="#">Shipping</SidebarItem>
                        </SidebarCollapse>
                        <SidebarItem href="#" icon={HiInbox}>
                            Inbox
                        </SidebarItem>
                        <SidebarItem as={Link} href={route('users.index')} active={route().current('users.index')} icon={HiUser}>
                            Users
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiShoppingBag}>
                            Products
                        </SidebarItem>
                        <SidebarItem as={Link} href={route('stores.edit',current_shop || user.stores[0].id)} active={route().current('stores.edit')} icon={IoSettingsSharp}>
                            Settings
                        </SidebarItem>
                        <SidebarItem onClick={signOut} icon={HiArrowSmRight}>
                            Sign Out
                        </SidebarItem>
                        {/* <SidebarItem href="#" icon={HiTable}>
                            Sign Up
                        </SidebarItem> */}
                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </section>

    );
}

export default StoreSideBar;
