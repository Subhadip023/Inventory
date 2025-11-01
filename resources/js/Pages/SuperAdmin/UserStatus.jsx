import React, { useState } from 'react';
import SuperAdminDashboardLayout from '@/Layouts/SuperAdminDashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import CardContainer from '@/Components/CardContainer';
import Icons from '@/Components/Icons';
import Modal from '@/Components/Modal';

import { RxCross2 } from "react-icons/rx";
import { Link, useForm } from '@inertiajs/react';
import SaveButton from '@/Components/SaveButton';
import CancelButton from '@/Components/CancelButton';
import FormInput from '@/Components/FormInput';
import FormSelect from '@/Components/FormSelect';
// import 
const UserStatus = ({ allStatus = [] }) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const userStatusForm = useForm({
        id:null,
        name:'',
        description:"",
        manual:true,
        show:false,
        svg:''
    });
    const closeEditModal = () => {
        setOpenEditModal(false);
        userStatusForm.reset()
    }


    console.log(userStatusForm.data)
    return (
        <SuperAdminDashboardLayout head={'User Status'}>
            <Modal show={openEditModal} onClose={closeEditModal} maxWidth='md:w-1/3'>
              <section className='m-5 '>
                <div className=' flex items-center justify-between'>
                    <h2 className='text-2xl font-bold '>Edit Status</h2>
                    <RxCross2 className='text-2xl hover:scale-110 duration-200' onClick={closeEditModal} />
                </div>
                <div className='w-full border-b border-gray-400 my-2'></div>

                <div className='my-5 min-h-32 h-4/5 '>
                    <div className=' flex-1 overflow-y-auto h-full'>
                        <form  id='userStatusForm'>
                            
                        </form>
                    </div>
                </div>
                <div className='w-full border-b border-gray-400 my-2 '></div>
                <div className='flex items-center justify-end gap-x-4 mx-5'>
                    <SaveButton >Save</SaveButton>
                    <CancelButton onClick={closeEditModal}>Cancel</CancelButton>
                </div>
            </section>
            </Modal>

            <CardContainer className='w-full h-fit my-auto'>
                <div className='mx-5 my-10 flex items-center justify-between '>
                    <h1 className='text-2xl font-bold '>All Status</h1>
                    {/* <Button color="green" onClick={() => setAddUserModal(true)}>Add User</Button> */}
                </div>
                {allStatus.length > 0 ? <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>ID</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>description</TableHeadCell>
                            <TableHeadCell>Manual</TableHeadCell>
                            <TableHeadCell>Show</TableHeadCell>
                            <TableHeadCell>svg</TableHeadCell>

                            <TableHeadCell>
                                <span className="sr-only">Edit</span>
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {allStatus.map((s) => (
                            <TableRow key={s.id}>
                                <TableCell className="whitespace-nowrap py-4">
                                    <div className="text-sm text-gray-900  dark:text-white">{s.id} </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    <div className="text-sm text-gray-900  dark:text-white">{s.name} </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    <div className="text-sm text-gray-900  dark:text-white">{s.description} </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    <div className="text-sm text-gray-900  dark:text-white">{s.manual ? 'Manual' : 'Auto'} </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    <div className="text-sm text-gray-900  dark:text-white">{s.show ? 'Yes' : 'No'} </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    <div className="text-sm text-gray-900  dark:text-white">{s.svg} </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    <div className="text-sm text-gray-900  dark:text-white">
                                        <button onClick={(e)=>{
                                            setOpenEditModal(true)
                                            userStatusForm.setData('id',s.id);
                                            userStatusForm.setData('name',s.name);
                                            userStatusForm.setData('description',s.description);
                                            userStatusForm.setData('manual',s.manual);
                                            userStatusForm.setData('show',s.show);
                                            userStatusForm.setData('svg',s.svg);
                                        }}>
                                            <Icons name='edit' />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>))}
                    </TableBody>
                </Table> : "No Data Available"}
            </CardContainer>
        </SuperAdminDashboardLayout>
    );
}

export default UserStatus;
