import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import defultImgCDNs from '@/utils/defultImgCDNs';

const Welcome = ({ stores = [] }) => {
    const appName = import.meta.env.VITE_APP_NAME || 'ShopEssey';
    const { auth } = usePage().props;
    const user = auth?.user;
    const storeForm = useForm();

    const selectStore = (e, id) => {
        e.preventDefault();
        storeForm.post(route('setShop', { shop_id: id }), {
            onError: (e) => {
                console.log('Error', e);
            }
        });
    };

    return (
        <GuestLayout title="Welcome">
            <Head title="Welcome" />

            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Welcome to <span className="text-mainColor">{appName}</span>
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                    Everything you need in one place. Easy tools, clean design, and smart features to make your daily workflow smoother and faster.
                </p>
            </div>

            {/* Guest View: Login / Register Actions */}
            {!user && (
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                        href={route('login')}
                        className="w-full sm:w-1/2 py-3 px-4 bg-mainColor hover:opacity-95 active:scale-[0.99] text-white text-center font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                        Sign In
                    </Link>
                    <Link
                        href={route('register')}
                        className="w-full sm:w-1/2 py-3 px-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-center font-semibold text-sm rounded-lg transition-all cursor-pointer"
                    >
                        Create Account
                    </Link>
                </div>
            )}

            {/* Logged In View: Store Selector */}
            {user && (
                <div className="space-y-6">
                    {stores && stores.length > 0 && (
                        <div>
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                                Select Your Store
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
                                {stores.map((store) => (
                                    <button
                                        key={store.id}
                                        onClick={(e) => selectStore(e, store.id)}
                                        className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800 rounded-xl hover:border-mainColor hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm transition-all flex flex-col items-center gap-2 group cursor-pointer w-full text-center"
                                    >
                                        <img
                                            className="w-12 h-12 object-contain rounded-md"
                                            src={store.logo ? '/storage/' + store.logo : defultImgCDNs.defaultLogoCDN}
                                            alt={store.name}
                                        />
                                        <span className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-mainColor transition-colors">
                                            {store.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <Link
                            href={route('shops.create')}
                            className="w-full py-3 px-4 bg-mainColor hover:opacity-95 active:scale-[0.99] text-white font-semibold text-sm rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                            <span>+ Create a Store</span>
                        </Link>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
};

export default Welcome;
