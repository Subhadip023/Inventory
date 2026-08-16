import Checkbox from '@/Components/Form/Checkbox';
import InputError from '@/Components/Form/InputError';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import PasswordInput from '@/Components/Form/PasswordInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { HiOutlineMail, HiArrowLeft } from 'react-icons/hi';

export default function Login({ status, canResetPassword }) {
    const appName = import.meta.env.VITE_APP_NAME || 'ShopEssey';
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout title="Sign In">
            <Head title="Log in" />

            {/* Back to Home Link */}
            <div className="mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-mainColor transition-colors gap-1.5"
                >
                    <HiArrowLeft className="w-4 h-4" />
                    Back to home
                </Link>
            </div>

            {/* Form Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Sign in to <span className="text-mainColor">{appName}</span>
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Welcome back! Please enter your details to access your account.
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="font-medium text-sm text-gray-700 dark:text-gray-300" />
                    <div className="mt-1.5">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            icon={HiOutlineMail}
                            className="w-full text-sm"
                            autoComplete="username"
                            isFocused={true}
                            placeholder="name@company.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Password" className="font-medium text-sm text-gray-700 dark:text-gray-300" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-semibold text-mainColor hover:underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <div className="mt-1.5">
                        <PasswordInput
                            id="password"
                            name="password"
                            value={data.password}
                            showIcon={true}
                            className="w-full text-sm"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer group select-none">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                            Remember me on this device
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 px-4 bg-mainColor hover:opacity-95 active:scale-[0.99] text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>

                <div className="text-center text-sm text-gray-500 pt-2">
                    Don't have an account?{' '}
                    <Link
                        href={route('register')}
                        className="font-semibold text-mainColor hover:underline"
                    >
                        Create an account
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}