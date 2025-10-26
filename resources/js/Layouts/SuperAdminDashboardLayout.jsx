import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Alert } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { useForm } from '@inertiajs/react';
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Sidebar,
  SidebarItems,
  SidebarItem,
  SidebarItemGroup,

} from "flowbite-react";

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
import { FaStore } from 'react-icons/fa';


import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function DashboardLayout({ children, head }) {
  const { flash } = usePage().props;
  const user = usePage().props.auth.user;
  const { theme_mode } = usePage().props;
  const [showSidebar, setShowSidebar] = useState(true);
  const form = useForm({

  });
  console.log(theme_mode);

  useEffect(() => {
    document.body.className = theme_mode;
  }, [theme_mode]);

  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
    if (flash.warning) toast.warning(flash.warning);
    if (flash.info) toast.info(flash.info);
  }, [flash]);

  const signOut = () => {
    // event.preventDefault();
    form.post(route('logout'));
  };

  return (
    <section className="flex h-screen ">
      <Head title={head || 'Dashboard'} />
      <ToastContainer />


      <section className={`h-screen shadow-md transition-all duration-300 ease-in-out 
                  ${showSidebar ? 'w-64' : 'w-0 overflow-hidden'} sticky top-0 `}>
        <Sidebar aria-label="Sidebar with multi-level dropdown example" className='dark:bg-gray-800'>
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem as={Link} href={route('dashboard')} icon={HiChartPie} active={route().current('dashboard')}>
                Dashboard
              </SidebarItem>
              <SidebarItem as={Link} href={route('universal-products.index')} active={route().current('universal-products.index')} icon={HiShoppingBag}>
                Universal Products
              </SidebarItem>
              <SidebarItem as={Link} href={route('role.index')} active={route().current('role.index')} icon={HiUser}>
                Role
              </SidebarItem>
              <SidebarItem as={Link} href={route('superadmin.users.index')} active={route().current('superadmin.users.index')} icon={HiUser}>
                Users
              </SidebarItem>

              <SidebarItem as={Link} href={route('shop-categories.index')} active={route().current('shop-categories.index')} icon={FaStore}>
                Shop Categories
              </SidebarItem>

              <SidebarItem onClick={signOut} icon={HiArrowSmRight}>
                Sign Out
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </section>

      <section
        className={`flex flex-col transition-all duration-300 ease-in-out
      ${showSidebar ? 'w-[calc(100%-16rem)]' : 'w-full'}`}
      >
        <Navbar className="z-10 shadow-md sticky top-0">
          <RxHamburgerMenu
            className="hover:cursor-pointer hover:scale-105 dark:text-white"
            onClick={() => setShowSidebar(!showSidebar)}
          />
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={user.profile_image ? '/storage/' + user.profile_image : 'https://cdn.pixabay.com/photo/2017/11/10/05/46/user-2935524_960_720.png'}
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{user.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </DropdownHeader>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem as={Link} href={route('settings.index')}>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={signOut}>Sign out</DropdownItem>
            </Dropdown>
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <NavbarLink href="#" active>Home</NavbarLink>
            <NavbarLink href="#">About</NavbarLink>
            <NavbarLink href="#">Services</NavbarLink>
            <NavbarLink href="#">Pricing</NavbarLink>
            <NavbarLink href="#">Contact</NavbarLink>
          </NavbarCollapse>
        </Navbar>

        {/* Main content goes here */}
        <div className="flex h-full  p-4 overflow-auto bg-blue-50  dark:bg-gray-600">
          {children}    </div>
      </section>
    </section>

  );
}
