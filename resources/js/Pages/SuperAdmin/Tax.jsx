import React, { useState } from 'react'
import SuperAdminDashboardLayout from '@/Layouts/SuperAdminDashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button, TextInput, Pagination, Tooltip, CheckIcon } from "flowbite-react";
import CardContainer from '@/Components/CardContainer';

import AddButton from '@/Components/AddButton';
import Icons from '@/Components/Icons';
import Modal from '@/Components/Modal';
import FormInput from '@/Components/FormInput';
import CancelButton from '@/Components/CancelButton';
import SaveButton from '@/Components/SaveButton';
import { useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import ConfirmModal from '@/Components/ConfirmModal';
function Tax({ taxes }) {
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const taxForm = useForm({
        id: null,
        name: '',
        rate: '',
        is_active: true,
    });

    const saveTax = (e)=>{
        e.preventDefault();
        taxForm.post(route('superadmin.tax.store'), {
            onSuccess: () => {
                setOpenCategoryModal(false);
                taxForm.reset();
            },onError: () => {
                setOpenCategoryModal(true);
            }
        })
    }

    const editTaxSubmit = (e) => {
        e.preventDefault();
        taxForm.put(route('superadmin.tax.update',taxForm.data.id), {
            onSuccess: () => {
                setOpenCategoryModal(false);
                taxForm.reset();
            },onError: () => {
                setOpenCategoryModal(true);
            }
        });
    }

    const deleteCatSubmit = (e) => {
        e.preventDefault();
        taxForm.delete(route('superadmin.tax.destroy',taxForm.data.id), {
            onSuccess: () => {
                setConfirmModal(false);
                taxForm.reset();
            },onError: () => {
                setConfirmModal(false);
            }
        });
    }



    return (

        <SuperAdminDashboardLayout head={'Shop Categories'}>
            <ConfirmModal open={confirmModal} title={'Delete'} message={`Are you sure you want to delete ${taxForm.data.name} tax?`} onConfirm={deleteCatSubmit} onCancel={() => setConfirmModal(false)} />
            <Modal show={openCategoryModal} onClose={() => {setOpenCategoryModal(false);taxForm.reset();}} maxWidth='md:w-1/3'>
                <div className='px-10 py-5'>
                    <h1 className="text-2xl md:text-3xl font-mono text-mainColor font-bold text-start my-6 md:my-10">
                        {taxForm.data.id ? 'Update' : 'Create'} Tax
                    </h1>
                        <FormInput id='name' label='Tax Name' type='text' placeholder='Tax Name' value={taxForm.data.name} onChange={(e) => taxForm.setData('name', e.target.value)} error={taxForm.errors.name} />
                        <FormInput id='rate' label='Rate' type='text' placeholder='Rate' value={taxForm.data.rate} onChange={(e) => taxForm.setData('rate', e.target.value)} error={taxForm.errors.rate} />
                        <Checkbox label='Active' checked={taxForm.data.is_active} onChange={(e) => taxForm.setData('is_active', e.target.checked)} /> Active
                        <div className='flex justify-end gap-x-2'>
                            <CancelButton onClick={() => {setOpenCategoryModal(false);taxForm.reset();}}>Cancel</CancelButton>
                            <SaveButton onClick={taxForm.data.id ? editTaxSubmit : saveTax}>Save</SaveButton>
                        </div>
                </div>    
            </Modal>

            <CardContainer className='w-full'>
                <h1 className="text-3xl md:text-4xl font-mono text-mainColor font-bold text-start my-6 md:my-10">
                    Taxes
                </h1>

                <div className='my-5 mx-10 flex items-end justify-end gap-x-2'>
                    <AddButton onClick={() => {setOpenCategoryModal(true);taxForm.reset();}}>Add</AddButton>
                </div>
                <Table hoverable className='w-full'>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>ID</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Rate</TableHeadCell>
                            <TableHeadCell>Active</TableHeadCell>

                            <TableHeadCell>
                                <span className="sr-only">Edit</span>
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {taxes.map((tax) => (
                            <TableRow key={tax.id}>
                                <TableCell>{tax.id}</TableCell>
                                <TableCell>{tax.name}</TableCell>
                                <TableCell>{tax.rate}</TableCell>
                                <TableCell>{tax.is_active ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>
                                    <button 
                                    onClick={()=>{
                                        taxForm.reset();
                                        setOpenCategoryModal(true);
                                        taxForm.setData('id',tax.id);
                                        taxForm.setData('name',tax.name);
                                        taxForm.setData('rate',tax.rate);
                                        taxForm.setData('is_active',tax.is_active);
                                    }}
                                    ><Icons name='edit' className='text-mainColor' /></button>
                                    <button
                                    onClick={()=>{
                                        taxForm.reset();
                                        setConfirmModal(true);
                                        taxForm.setData('id',tax.id);
                                        taxForm.setData('name',tax.name);
                                        taxForm.setData('rate',tax.rate);
                                        taxForm.setData('is_active',tax.is_active);
                                    }}
                                    
                                    ><Icons name='delete'  /></button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContainer>
        </SuperAdminDashboardLayout>
    )
}

export default Tax