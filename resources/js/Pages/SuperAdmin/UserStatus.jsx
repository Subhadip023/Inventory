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
import FormTextArea from '@/Components/FormTextArea';
import Checkbox from '@/Components/Checkbox';
// import 
const UserStatus = ({ allStatus = [] }) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const userStatusForm = useForm({
        id: null,
        name: '',
        description:null,
        manual: true,
        show: false,
        svg: ''
    });
    const closeEditModal = () => {
        setOpenEditModal(false);
        userStatusForm.reset();
    }

    const submit = (e) => {
        e.preventDefault();
        userStatusForm.post(route('superadmin.users-status.store'), {
            onSuccess: () => {
                closeEditModal();

            },
            onError: (e) => {
                console.log('Error', e);
            }
        });

    }


    console.log(allStatus);
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
                        <div className=' flex-1 overflow-y-auto h-full px-10'>
                            <form onSubmit={submit} id='userStatusForm'>
                                <FormInput id='name' label='Name' value={userStatusForm.data.name} onChange={(e) => userStatusForm.setData('name', e.target.value)} error={userStatusForm.errors.name} />
                                <FormTextArea id='description' name='description' label='Description' value={userStatusForm.data.description} onChange={(e) => userStatusForm.setData('description', e.target.value)} error={userStatusForm.errors.description} />
                                <div className='my-2'>
                                    <span className="font-medium">Manual</span>

                                    <div className='flex gap-x-2'>
                                        <div className="flex items-center gap-x-2">
                                            <input
                                                type="radio"
                                                id="form-manual_true"
                                                name="manual"
                                                value="true"
                                                onChange={() => userStatusForm.setData('manual', true)}
                                                checked={userStatusForm.data.manual == true}
                                            />
                                            <label
                                                htmlFor="form-manual_true"
                                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Manual
                                            </label>
                                        </div>

                                        <div className="flex items-center gap-x-2">
                                            <input
                                                type="radio"
                                                id="form-manual_false"
                                                name="manual"
                                                value="false"
                                                onChange={() => userStatusForm.setData('manual', false)}
                                                checked={userStatusForm.data.manual == false}
                                            />
                                            <label
                                                htmlFor="form-manual_false"
                                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Auto
                                            </label>
                                        </div>
                                    </div>
                                </div>


                                <FormTextArea id='svg' name='svg' label='SVG' value={userStatusForm.data.svg || ''} onChange={(e) => userStatusForm.setData('svg', e.target.value)} error={userStatusForm.errors.svg} />

                                <div className='my-2'>
                                    <span className="font-medium">Show</span>

                                    <div className='flex gap-x-2'>
                                        <div className="flex items-center gap-x-2">
                                            <input
                                                type="radio"
                                                id="form-show_true"
                                                name="show"
                                                value="true"
                                                onChange={() => userStatusForm.setData('show', true)}
                                                checked={userStatusForm.data.show == true}
                                            />
                                            <label
                                                htmlFor="form-show_true"
                                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Yes
                                            </label>
                                        </div>

                                        <div className="flex items-center gap-x-2">
                                            <input
                                                type="radio"
                                                id="form-show_false"
                                                name="show"
                                                value="false"
                                                onChange={() => userStatusForm.setData('show', false)}
                                                checked={userStatusForm.data.show == false}
                                            />
                                            <label
                                                htmlFor="form-show_false"
                                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='w-full border-b border-gray-400 my-2 '></div>
                    <div className='flex items-center justify-end gap-x-4 mx-5'>
                        <SaveButton onClick={submit} >Save</SaveButton>
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
                                    <div className="text-sm text-gray-900  dark:text-white">{s.description==null ? 'N/A' : s.description} </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    <div className="text-sm text-gray-900  dark:text-white">{s.manual ? 'Manual' : 'Auto'} </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    <div className="text-sm text-gray-900  dark:text-white">{s.show ? 'Yes' : 'No'} </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    <div className="text-sm text-gray-900 dark:text-white">
                                    {s.svg == null ? (
                                        'N/A'
                                    ) : (
                                        <span dangerouslySetInnerHTML={{ __html: s.svg }} />
                                    )}
                                    </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    <div className="text-sm text-gray-900  dark:text-white">
                                        <button onClick={(e) => {
                                            setOpenEditModal(true)
                                            userStatusForm.setData('id', s.id);
                                            userStatusForm.setData('name', s.name);
                                            userStatusForm.setData('description', s.description);
                                            userStatusForm.setData('manual', s.manual);
                                            userStatusForm.setData('show', s.show);
                                            userStatusForm.setData('svg', s.svg);
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
