import InputError from '@/Components/Form/InputError';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import PasswordInput from '@/Components/Form/PasswordInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { HiOutlineMail, HiOutlineUser, HiArrowLeft } from 'react-icons/hi';

export default function Register() {
    const appName = import.meta.env.VITE_APP_NAME || 'ShopEssey';
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout title="Create Account">
            <Head title="Register" />

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
                    Create an account on <span className="text-mainColor">{appName}</span>
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Get started today. Enter your details to create your workspace.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Full Name" className="font-medium text-sm text-gray-700 dark:text-gray-300" />
                    <div className="mt-1.5">
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            icon={HiOutlineUser}
                            className="w-full text-sm"
                            autoComplete="name"
                            isFocused={true}
                            placeholder="John Doe"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="mt-1.5" />
                </div>

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
                            placeholder="name@company.com"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="font-medium text-sm text-gray-700 dark:text-gray-300" />
                    <div className="mt-1.5">
                        <PasswordInput
                            id="password"
                            name="password"
                            value={data.password}
                            showIcon={true}
                            className="w-full text-sm"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="font-medium text-sm text-gray-700 dark:text-gray-300"
                    />
                    <div className="mt-1.5">
                        <PasswordInput
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            showIcon={true}
                            className="w-full text-sm"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5"
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 px-4 bg-mainColor hover:opacity-95 active:scale-[0.99] text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Creating account...' : 'Create Account'}
                    </button>
                </div>

                <div className="text-center text-sm text-gray-500 pt-2">
                    Already registered?{' '}
                    <Link
                        href={route('login')}
                        className="font-semibold text-mainColor hover:underline"
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
