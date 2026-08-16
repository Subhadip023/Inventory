import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, icon: Icon, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const inputElement = (
        <input
            {...props}
            type={type}
            className={
                `w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-[#119ABF] focus:ring-2 focus:ring-[#119ABF]/25 dark:focus:border-[#119ABF] dark:focus:ring-[#119ABF]/30 ${
                    Icon ? 'pl-10' : ''
                } ` + className
            }
            ref={localRef}
        />
    );

    if (!Icon) return inputElement;

    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <Icon className="h-5 w-5" />
            </div>
            {inputElement}
        </div>
    );
});
