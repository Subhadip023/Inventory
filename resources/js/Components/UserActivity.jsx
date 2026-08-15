import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { Listbox } from '@headlessui/react';

const UserActivity = () => {
  const { user_status } = usePage().props;
  const user = usePage().props.auth?.user || {};

  const [selected, setSelected] = useState(null);

  // Initialize the form
  const UserStatusChangeForm = useForm({
    status_id: null,
  });

  // Set default selected status
  useEffect(() => {
    if (user_status && Array.isArray(user_status) && user_status.length > 0) {
      const activeStatusId = user.manual_status_id || user.user_status_id;
      const currentStatus = user_status.find((s) => s.id === activeStatusId) || user_status[0];
      setSelected(currentStatus);
      UserStatusChangeForm.setData('status_id', currentStatus?.id);
    }
  }, [user_status, user.manual_status_id, user.user_status_id]);

  // Handle status change
  const handleStatusChange = (status) => {
    if (!status) return;
    setSelected(status);
    UserStatusChangeForm.setData('status_id', status.id);

    // Send the request to your Laravel route
    UserStatusChangeForm.post(route('user.status.change', { status: status.id }), {
      preserveScroll: true,
      onSuccess: () => console.log('Status updated successfully!'),
      onError: (errors) => console.error(errors),
    });
  };

  if (!user_status || !Array.isArray(user_status) || user_status.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-2 border-y border-slate-100 dark:border-slate-700 my-1">
      <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
        Set Activity Status
      </p>
      {selected && (
        <Listbox value={selected} onChange={handleStatusChange}>
          <div className="relative">
            <Listbox.Button className="flex items-center justify-between w-full border border-slate-200 dark:border-slate-700 rounded-md px-2.5 py-1.5 bg-slate-50 dark:bg-slate-700/50 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
              <div className="flex items-center gap-2 truncate">
                {selected.svg && (
                  <span
                    className="w-3.5 h-3.5 flex items-center justify-center [&>svg]:w-3.5 [&>svg]:h-3.5 flex-shrink-0"
                    dangerouslySetInnerHTML={{ __html: selected.svg }}
                  />
                )}
                <span className="truncate">{selected.name}</span>
              </div>
              <span className="text-slate-400 text-[10px] ml-1">▼</span>
            </Listbox.Button>

            <Listbox.Options className="absolute left-0 right-0 z-50 mt-1 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-xs shadow-lg max-h-48 overflow-auto py-1">
              {user_status.map((item) => (
                <Listbox.Option
                  key={item.id}
                  value={item}
                  className={({ active }) =>
                    `flex items-center gap-2 px-2.5 py-1.5 cursor-pointer ${
                      active
                        ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                        : 'text-slate-700 dark:text-slate-300'
                    }`
                  }
                >
                  {item.svg && (
                    <span
                      className="w-3.5 h-3.5 flex items-center justify-center [&>svg]:w-3.5 [&>svg]:h-3.5 flex-shrink-0"
                      dangerouslySetInnerHTML={{ __html: item.svg }}
                    />
                  )}
                  <span>{item.name}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      )}
    </div>
  );
};

export default UserActivity;
