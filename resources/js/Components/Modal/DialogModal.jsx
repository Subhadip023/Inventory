import React from 'react';
import Modal from '@/Components/Modal/Modal';
import { HiX } from 'react-icons/hi';

export function ModalHeader({
    icon: Icon,
    iconBgClass = 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    title,
    description,
    onClose,
    closeable = true,
    children,
}) {
    return (
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-2.5">
                {Icon && (
                    <div className={`p-2 rounded-lg ${iconBgClass}`}>
                        {React.isValidElement(Icon) ? (
                            Icon
                        ) : (
                            <Icon className="text-xl" />
                        )}
                    </div>
                )}
                <div>
                    {title && (
                        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {description}
                        </p>
                    )}
                    {children}
                </div>
            </div>
            {closeable && onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                    <HiX className="text-lg" />
                </button>
            )}
        </div>
    );
}

export function ModalBody({ children, className = '' }) {
    return <div className={className}>{children}</div>;
}

export function ModalFooter({ children, className = '' }) {
    return (
        <div className={`flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700 ${className}`}>
            {children}
        </div>
    );
}

export default function DialogModal({
    show = false,
    onClose = () => {},
    maxWidth = '2xl',
    closeable = true,
    icon,
    iconBgClass = 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    title,
    description,
    children,
    footer,
    className = '',
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth={maxWidth} closeable={closeable}>
            <div className={`p-6 space-y-5 text-slate-800 dark:text-slate-100 ${className}`}>
                {(title || description || icon) && (
                    <ModalHeader
                        icon={icon}
                        iconBgClass={iconBgClass}
                        title={title}
                        description={description}
                        onClose={onClose}
                        closeable={closeable}
                    />
                )}

                {children}

                {footer && <ModalFooter>{footer}</ModalFooter>}
            </div>
        </Modal>
    );
}
