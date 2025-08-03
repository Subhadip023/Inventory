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
import { twMerge } from "tailwind-merge";
const SideBar = ({classNames}) => {
    return (
        <section className= {`h-screen ${classNames} sticky top-0 `}>
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem href="#" icon={HiChartPie}>
                            Dashboard
                        </SidebarItem>
                        <SidebarCollapse
                            icon={HiShoppingBag}
                            label="E-commerce"
                            renderChevronIcon={(theme, open) => {
                                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? "on" : "off"])} />;
                            }}
                        >
                            <SidebarItem href="#">Products</SidebarItem>
                            <SidebarItem href="#">Sales</SidebarItem>
                            <SidebarItem href="#">Refunds</SidebarItem>
                            <SidebarItem href="#">Shipping</SidebarItem>
                        </SidebarCollapse>
                        <SidebarItem href="#" icon={HiInbox}>
                            Inbox
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiUser}>
                            Users
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiShoppingBag}>
                            Products
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiArrowSmRight}>
                            Sign In
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiTable}>
                            Sign Up
                        </SidebarItem>
                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </section>

    );
}

export default SideBar;
