import { Head, Link } from '@inertiajs/react';
import React, { useEffect } from 'react';
import storeImage from '@/Images/store.png'
import { Button, Card} from 'flowbite-react';
import { usePage } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import defultImgCDNs from '@/utils/defultImgCDNs';
// import Image from "next/image";

import AddButton from '@/Components/AddButton';
import {useForm} from  '@inertiajs/react'
const Welcome = ({ stores }) => {
    const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
    const { user } = usePage().props.auth;
    const { flash } = usePage().props;
    const deleteFrom = useForm();
    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (flash.warning) toast.warning(flash.warning);
        if (flash.info) toast.info(flash.info);
    }, [flash]);


    const logout = () => {
       deleteFrom.post(route('logout'));
    };

    return (
        <div className="flex flex-col-reverse md:flex-row">
            <ToastContainer />
            <Head title={'Welcome'} />

            {/* Left Section (Image) */}
            <section className="h-[50vh] md:h-screen flex justify-center items-center w-full md:w-1/3 bg-mainColor">
                <img src={storeImage} className="w-[80%] md:w-[700px]" />
            </section>
            <Button color={'dark'} className='absolute top-5 right-5 hover:cursor-pointer z-20' onClick={logout}>logout</Button>

            {/* Right Section (Content) */}
            <section className="h-auto md:h-screen w-full md:w-2/3 flex flex-col items-center justify-center relative p-5">
                <h1 className="text-3xl md:text-4xl font-mono text-mainColor font-bold text-center my-6 md:my-10">
                    Welcome to {appName}!
                </h1>

                <div className="text-justify px-4 md:px-20">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad explicabo voluptatem impedit odit maxime voluptatum soluta molestias obcaecati sed consectetur, sequi molestiae, omnis, veritatis quos quia fugit. Deleniti, laborum similique.
                </div>

                {user ? null : <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-5 my-8 md:my-10">
                    <Button color="dark" outline as={Link} href={route('login')}>Login</Button>
                    <Button color="dark" as={Link} href={route('register')} className='hover:bg-gray-600'>Register</Button>
                </div>}
                {
                    stores.length > 0 ?
                        <div className='my-10 flex flex-wrap gap-5 ' >
                            {stores.map((store) => (
                                <Card
                                    className="max-w-sm "
                                    renderImage={() => <img className="rounded-md w-32 mx-auto mt-2" src={store.logo ? '/storage/' + store.logo:defultImgCDNs.defaultLogoCDN} alt="image 1" />}
                                    key={store.id}

                                    as={Link}
                                    href={route('store.dashboard', store.id)}
                                >
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {store.name}
                                    </h5>
                                    
                                </Card>
                            ))}
                        </div> : null
                }

                {user &&
                    <div className='my-10'>
                        <AddButton as={Link} href={route('stores.create')} color="dark" className='hover:bg-gray-600'>Create a Store  </AddButton>
                    </div>
                }
            </section>
        </div>
    );
}

export default Welcome;
