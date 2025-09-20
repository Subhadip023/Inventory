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

function Index({ shopCategories }) {
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [isCategoryEdit, setIsCategoryEdit] = useState(false);
    const shopCategoryForm = useForm({
        id: null,
        name: '',
        is_active: true,
    });

    const submitCategory = (e) => {
        e.preventDefault();
        if (isCategoryEdit) {
            shopCategoryForm.put(route('shop-categories.update',shopCategoryForm.data.id), {
                onSuccess: () => {
                    setOpenCategoryModal(false);
                    shopCategoryForm.reset();
                },
                onError: () => { setIsCategoryEdit(false);}
            });
            return;
        }
        shopCategoryForm.post(route('shop-categories.store'), {
            onSuccess: () => {
                setOpenCategoryModal(false);
                shopCategoryForm.reset();
            },
            onError: () => { setIsCategoryEdit(false);}
        });
    };




    return (

        <SuperAdminDashboardLayout head={'Shop Categories'}>
            <Modal show={openCategoryModal} onClose={() => setOpenCategoryModal(false)} maxWidth='md:w-1/2' >
                <div className=' mx-10 my-5 '>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-mainColor font-bold text-straight my-6 md:my-10">
                            {isCategoryEdit?'Edit':'Add'} Shop Category
                        </h2>
                    </div>
                    <div>
                        <FormInput id='name' label='Category Name' type='text' placeholder='Category Name' value={shopCategoryForm.data.name} onChange={(e) => shopCategoryForm.setData('name', e.target.value)} error={shopCategoryForm.errors.name} />
                        <div className='my-5 flex items-center gap-x-2'>
                            <Checkbox checked={shopCategoryForm.data.is_active} onChange={(e) => shopCategoryForm.setData('is_active', e.target.checked)} /> active
                        </div>

                    </div>


                    <div className='flex justify-end items-center gap-x-2'>
                        <CancelButton onClick={() => { setOpenCategoryModal(false); shopCategoryForm.reset() }}>Cancel</CancelButton>
                        <SaveButton onClick={submitCategory}>{isCategoryEdit?"Edit":"Save"}</SaveButton>
                    </div>
                </div>
            </Modal>
            <CardContainer className='w-full'>
                <h1 className="text-3xl md:text-4xl font-mono text-mainColor font-bold text-start my-6 md:my-10">
                    Shop Categories
                </h1>

                <div className='my-5 mx-10 flex items-end justify-end gap-x-2'>
                    <AddButton onClick={() => setOpenCategoryModal(true)}>Add</AddButton>
                </div>
                <Table hoverable className='w-full'>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>ID</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Active</TableHeadCell>

                            <TableHeadCell>
                                <span className="sr-only">Edit</span>
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {shopCategories.map((cat) => (
                            <TableRow key={cat.id} >
                                <TableCell className="whitespace-nowrap py-4">
                                    {cat.id}
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    {cat.name}
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    {cat.is_active?"Yes":"No"}
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    <button onClick={() => {
                                        setIsCategoryEdit(true);
                                        setOpenCategoryModal(true);
                                        shopCategoryForm.setData({
                                            id: cat.id,
                                            name: cat.name,
                                            is_active: cat.is_active,
                                        })
                                    }}><Icons name='edit' className='text-blue-500 hover:text-blue-700 cursor-pointer' /></button>

                                    <button ><Icons name='delete'/> </button>
                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </CardContainer>
        </SuperAdminDashboardLayout>
    )
}

export default Index