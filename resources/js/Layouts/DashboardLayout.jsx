import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Alert } from "flowbite-react";
import { Avatar } from "flowbite-react";
import SideBar from '@/Components/SideBar';
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
} from "flowbite-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';
import { usePage } from '@inertiajs/react';


export default function DashboardLayout({ children, head }) {
  const { flash } = usePage().props;
  const user = usePage().props.auth.user;
  const [showSidebar, setShowSidebar] = useState(true);
  const form = useForm({

  });
  const signOut = () => {
    // event.preventDefault();
    form.post(route('logout'));
  };

  return (
    <section className="flex h-screen">
      <Head title={head || 'Dashboard'} />
      <SideBar
        signOut={signOut}
        classNames={`shadow-md transition-all duration-300 ease-in-out 
      ${showSidebar ? 'w-64' : 'w-0 overflow-hidden'}`}
      />

      <section
        className={`flex flex-col transition-all duration-300 ease-in-out
      ${showSidebar ? 'w-[calc(100%-16rem)]' : 'w-full'}`}
      >
        <Navbar className="z-10 shadow-md sticky top-0">
          <RxHamburgerMenu
            className="hover:cursor-pointer scale-105"
            onClick={() => setShowSidebar(!showSidebar)}
          />
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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
              <DropdownItem>Settings</DropdownItem>
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
        <div className="flex-1 p-4 overflow-auto">
          {children}    </div>
      </section>
    </section>

  );
}
