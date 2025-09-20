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
const AdminSideBar = ({classNames,signOut}) => {
    return (
        <section className= {`h-screen ${classNames} sticky top-0 `}>
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem as={Link} href={route('dashboard')} icon={HiChartPie} active={route().current('dashboard')}>
                            Dashboard
                        </SidebarItem>
                        <SidebarItem as={Link} href={route('role.index')} active={route().current('role.index')} icon={HiUser}>
                            Role
                        </SidebarItem>    
                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </section>

    );
}

export default AdminSideBar;
