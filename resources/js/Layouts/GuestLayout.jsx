import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import storeImage from '@/Images/store.png';
import { Button } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';

const GuestLayout = ({ title = 'Welcome', children }) => {
    const { auth, flash } = usePage().props;
    const user = auth?.user;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
        if (flash?.warning) toast.warning(flash.warning);
        if (flash?.info) toast.info(flash.info);
    }, [flash]);

    useEffect(() => {
        document.documentElement.classList.add('light');
    }, []);

    const logout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
            <ToastContainer />
            <Head title={title} />

            {/* Left Brand Banner (50% split, perfectly centered) */}
            <section className="hidden md:flex md:w-1/2 min-h-screen bg-mainColor justify-center items-center p-12 relative overflow-hidden">
                <img 
                    src={storeImage} 
                    alt="Store Illustration" 
                    className="w-full max-w-md object-contain  select-none"
                />
            </section>

            {/* Logout button for authenticated sessions */}
            {user && (
                <Button 
                    color="dark" 
                    size="sm"
                    className="absolute top-6 right-6 cursor-pointer z-30" 
                    onClick={logout}
                >
                    Logout
                </Button>
            )}

            {/* Right Content Area (50% split) */}
            <section className="flex-1 md:w-1/2 min-h-screen flex flex-col justify-center items-center p-6 sm:p-12 relative">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </section>
        </div>
    );
};

export default GuestLayout;