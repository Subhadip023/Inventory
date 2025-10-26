import React ,{useEffect} from 'react';
import { Head ,usePage} from '@inertiajs/react';
import { ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserDashboardLayout = ({children, head}) => {
      const { flash } = usePage().props;
        useEffect(() => {
            if (flash.success) toast.success(flash.success);
            if (flash.error) toast.error(flash.error);
            if(flash.warning) toast.warning(flash.warning);
            if(flash.info) toast.info(flash.info);
          }, [flash]);
    return (
   
        <section className="flex h-screen w-screen flex-wrap items-center justify-center bg-gray-100 dark:bg-gray-600 p-4">
            <Head title={head || 'User Dashboard'} />
            <ToastContainer />
            <div className='w-4/5'>{children}</div>
        </section>
    );
}

export default UserDashboardLayout;
