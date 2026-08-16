import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import defultImgCDNs from '@/utils/defultImgCDNs';
import { HiOutlineShoppingBag, HiArrowRight } from 'react-icons/hi';

const Welcome = ({ stores = [] }) => {
    const appName = import.meta.env.VITE_APP_NAME || 'ShopEssey';
    const { auth } = usePage().props;
    const user = auth?.user;
    const storeForm = useForm();

    const selectStore = (e, id) => {
        e.preventDefault();
        storeForm.post(route('setShop', { shop_id: id }), {
            onError: (err) => {
                console.log('Error setting shop:', err);
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
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Select Your Store to Enter
                            </h2>
                            <span className="text-xs font-medium text-mainColor">
                                {stores.length} {stores.length === 1 ? 'Store' : 'Stores'} Available
                            </span>
                        </div>

                        {stores && stores.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                                {stores.map((store) => {
                                    const typeName = store.type_name || (Number(store.type) === 2 ? 'Wholesale' : 'Retail');
                                    const isWholesale = Number(store.type) === 2;

                                    return (
                                        <div
                                            key={store.id}
                                            onClick={(e) => selectStore(e, store.id)}
                                            className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800 rounded-xl hover:border-mainColor hover:bg-white dark:hover:bg-slate-900 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer w-full relative"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between gap-2 mb-3">
                                                    <img
                                                        className="w-12 h-12 object-contain rounded-md bg-white p-1 border border-gray-100 dark:border-slate-800"
                                                        src={store.logo ? '/storage/' + store.logo : defultImgCDNs.defaultLogoCDN}
                                                        alt={store.name}
                                                    />
                                                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                                                        isWholesale
                                                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                                                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                                    }`}>
                                                        {typeName}
                                                    </span>
                                                </div>

                                                <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-mainColor transition-colors line-clamp-1">
                                                    {store.name}
                                                </h3>
                                            </div>

                                            <div className="mt-4 pt-2 border-t border-gray-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-mainColor font-semibold group-hover:translate-x-0.5 transition-transform">
                                                <span>Enter Store</span>
                                                <HiArrowRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-6 text-center bg-slate-50 dark:bg-slate-900/50 border border-dashed border-gray-300 dark:border-slate-800 rounded-xl mb-4">
                                <HiOutlineShoppingBag className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">No stores found</p>
                                <p className="text-xs text-gray-500 mt-1">Create your first shop to get started</p>
                            </div>
                        )}
                    </div>

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
