import { forwardRef, useState } from 'react';
import { HiEye, HiEyeOff, HiOutlineLockClosed } from 'react-icons/hi';
import TextInput from './TextInput';

export default forwardRef(function PasswordInput(
    { className = '', showIcon = true, ...props },
    ref,
) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full">
            {showIcon && (
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                    <HiOutlineLockClosed className="h-5 w-5" />
                </div>
            )}
            <TextInput
                {...props}
                type={showPassword ? 'text' : 'password'}
                className={`${showIcon ? 'pl-10' : ''} pr-10 ${className}`}
                ref={ref}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#119ABF] dark:text-gray-500 dark:hover:text-[#119ABF] focus:outline-none transition-colors cursor-pointer"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
                {showPassword ? (
                    <HiEyeOff className="h-5 w-5" />
                ) : (
                    <HiEye className="h-5 w-5" />
                )}
            </button>
        </div>
    );
});
