import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { Listbox } from '@headlessui/react';

const UserActivity = () => {
  const { user_status } = usePage().props;
  const user = usePage().props.auth.user;

  const [selected, setSelected] = useState(null);

  // Initialize the form
  const UserStatusChangeForm = useForm({
    status_id: null,
  });

  // Set default selected status
  useEffect(() => {
    if (user_status && user_status.length > 0) {
      setSelected(user_status[user.manual_status_id ? user.manual_status_id-1 : user.user_status_id-1]);
      UserStatusChangeForm.setData('status_id', user_status[0].id);
    }
  }, [user_status]);

  // Handle status change
  const handleStatusChange = (status) => {
    setSelected(status);
    UserStatusChangeForm.setData('status_id', status.id);

    // Send the request to your Laravel route
    UserStatusChangeForm.post(route('user.status.change',{status:status.id}), {
      preserveScroll: true,
      onSuccess: () => console.log('Status updated successfully!'),
      onError: (errors) => console.error(errors),
    });
  };

  return (
    <div className="w-64">
      {selected && (
        <Listbox value={selected} onChange={handleStatusChange}>
          <Listbox.Button className="flex items-center gap-2 w-full border rounded-md p-2 bg-white dark:bg-gray-800 text-sm">
            {selected.svg && (
              <span dangerouslySetInnerHTML={{ __html: selected.svg }} />
            )}
            <span>{selected.name}</span>
          </Listbox.Button>

          <Listbox.Options className="mt-1 border rounded-md bg-white dark:bg-gray-800 text-sm shadow-md">
            {user_status.map((item) => (
              <Listbox.Option
                key={item.id}
                value={item}
                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                {item.svg && (
                  <span dangerouslySetInnerHTML={{ __html: item.svg }} />
                )}
                <span>{item.name}</span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      )}
    </div>
  );
};

export default UserActivity;
