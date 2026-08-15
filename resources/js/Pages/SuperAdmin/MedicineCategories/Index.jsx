import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import CardContainer from '@/Components/CardContainer';
import AddButton from '@/Components/AddButton';
import Icons from '@/Components/Icons';
import Modal from '@/Components/Modal';
import FormInput from '@/Components/FormInput';
import CancelButton from '@/Components/CancelButton';
import SaveButton from '@/Components/SaveButton';
import ConfirmModal from '@/Components/ConfirmModal';
import { useForm } from '@inertiajs/react';

function Index({ categories = [] }) {
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [isCategoryEdit, setIsCategoryEdit] = useState(false);
    const [confirmDeleteCategory, setConfirmDeleteCategory] = useState(false);

    const categoryForm = useForm({
        id: null,
        name: '',
    });

    const submitCategory = (e) => {
        e.preventDefault();
        if (isCategoryEdit) {
            categoryForm.put(route('medicine-categories.update', categoryForm.data.id), {
                onSuccess: () => {
                    setOpenCategoryModal(false);
                    categoryForm.reset();
                    setIsCategoryEdit(false);
                },
                onError: () => {}
            });
            return;
        }

        categoryForm.post(route('medicine-categories.store'), {
            onSuccess: () => {
                setOpenCategoryModal(false);
                categoryForm.reset();
            },
            onError: () => {}
        });
    };

    const deleteCatSubmit = (e) => {
        e.preventDefault();
        categoryForm.delete(route('medicine-categories.destroy', categoryForm.data.id), {
            onSuccess: () => {
                setConfirmDeleteCategory(false);
                categoryForm.reset();
            }
        });
    };

    return (
        <DashboardLayout head={'Medicine Categories'}>
            <ConfirmModal 
                open={confirmDeleteCategory} 
                title={'Delete Medicine Category'} 
                message={`Are you sure you want to delete ${categoryForm.data.name} category?`} 
                onConfirm={deleteCatSubmit} 
                onCancel={() => setConfirmDeleteCategory(false)} 
            />

            <Modal show={openCategoryModal} onClose={() => setOpenCategoryModal(false)} maxWidth='md:w-1/2'>
                <div className='mx-10 my-5'>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-mainColor font-bold text-straight my-6 md:my-10">
                            {isCategoryEdit ? 'Edit' : 'Add'} Medicine Category
                        </h2>
                    </div>
                    <div>
                        <FormInput 
                            id='name' 
                            label='Category Name' 
                            type='text' 
                            placeholder='Category Name (e.g. Tablet, Syrup)' 
                            value={categoryForm.data.name} 
                            onChange={(e) => categoryForm.setData('name', e.target.value)} 
                            error={categoryForm.errors.name} 
                        />
                    </div>

                    <div className='flex justify-end items-center gap-x-2 my-5'>
                        <CancelButton onClick={() => { setOpenCategoryModal(false); categoryForm.reset(); setIsCategoryEdit(false); }}>Cancel</CancelButton>
                        <SaveButton onClick={submitCategory}>{isCategoryEdit ? "Edit" : "Save"}</SaveButton>
                    </div>
                </div>
            </Modal>

            <CardContainer className='w-full'>
                <h1 className="text-3xl md:text-4xl font-mono text-mainColor font-bold text-start my-6 md:my-10">
                    Medicine Categories
                </h1>

                <div className='my-5 mx-10 flex items-end justify-end gap-x-2'>
                    <AddButton onClick={() => { setIsCategoryEdit(false); categoryForm.reset(); setOpenCategoryModal(true); }}>Add</AddButton>
                </div>

                <Table hoverable className='w-full'>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>ID</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Created Date</TableHeadCell>
                            <TableHeadCell>
                                <span className="sr-only">Actions</span>
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {categories.map((cat) => (
                            <TableRow key={cat.id}>
                                <TableCell className="whitespace-nowrap py-4">
                                    {cat.id}
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4 font-semibold">
                                    {cat.name}
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4 text-gray-500">
                                    {cat.created_at ? new Date(cat.created_at).toLocaleDateString() : 'N/A'}
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4 flex gap-x-2">
                                    <button onClick={() => {
                                        setIsCategoryEdit(true);
                                        setOpenCategoryModal(true);
                                        categoryForm.setData({
                                            id: cat.id,
                                            name: cat.name,
                                        });
                                    }}>
                                        <Icons name='edit' className='text-blue-500 hover:text-blue-700 cursor-pointer' />
                                    </button>

                                    <button onClick={() => {
                                        setConfirmDeleteCategory(true);
                                        categoryForm.setData({
                                            id: cat.id,
                                            name: cat.name,
                                        });
                                    }}>
                                        <Icons name='delete' />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContainer>
        </DashboardLayout>
    );
}

export default Index;
