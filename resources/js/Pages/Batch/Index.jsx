import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, Tooltip } from "flowbite-react";
import CardContainer from '@/Components/CardContainer';
import AddButton from '@/Components/AddButton';
import { FaSearch } from "react-icons/fa";
import FormSelect from '@/Components/FormSelect';
import { useForm } from '@inertiajs/react';
import Icons from '@/Components/Icons';
import ConfirmModal from '@/Components/ConfirmModal';
import FormInput from '@/Components/FormInput';
import CancelButton from '@/Components/CancelButton';
import SaveButton from '@/Components/SaveButton';
import Modal from '@/Components/Modal';

function Index({ batches = [], products = [], filters = {} }) {
    const [openBatchModal, setOpenBatchModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [search, setSearch] = useState(filters.search || '');

    const batchForm = useForm({
        id: null,
        product_id: '',
        batch_no: '',
        expiry_date: '',
        quantity: 0,
        purchase_price: '',
        mrp: '',
    });

    const productOptions = [
        { id: '', name: 'Select Product' },
        ...products.map(p => ({
            id: p.id,
            name: `${p.universal_product?.name || 'Product #' + p.id} (SKU: ${p.sku || 'N/A'})`
        }))
    ];

    const submitBatch = (e) => {
        e.preventDefault();
        if (isEdit) {
            batchForm.put(route('batches.update', batchForm.data.id), {
                onSuccess: () => {
                    setOpenBatchModal(false);
                    batchForm.reset();
                    setIsEdit(false);
                }
            });
            return;
        }

        batchForm.post(route('batches.store'), {
            onSuccess: () => {
                setOpenBatchModal(false);
                batchForm.reset();
            }
        });
    };

    const deleteBatchSubmit = (e) => {
        e.preventDefault();
        batchForm.delete(route('batches.destroy', batchForm.data.id), {
            onSuccess: () => {
                setConfirmDeleteModal(false);
                batchForm.reset();
            }
        });
    };

    const openAdd = () => {
        setIsEdit(false);
        batchForm.reset();
        batchForm.setData({
            id: null,
            product_id: products[0]?.id || '',
            batch_no: '',
            expiry_date: '',
            quantity: 0,
            purchase_price: '',
            mrp: '',
        });
        setOpenBatchModal(true);
    };

    const openEdit = (b) => {
        setIsEdit(true);
        batchForm.setData({
            id: b.id,
            product_id: b.product_id,
            batch_no: b.batch_no,
            expiry_date: b.expiry_date ? b.expiry_date.split('T')[0] : '',
            quantity: b.quantity,
            purchase_price: b.purchase_price || '',
            mrp: b.mrp || '',
        });
        setOpenBatchModal(true);
    };

    const filteredBatches = batches.filter(b => {
        if (!search) return true;
        const q = search.toLowerCase();
        const batchNoMatch = b.batch_no.toLowerCase().includes(q);
        const nameMatch = b.product?.universal_product?.name?.toLowerCase().includes(q);
        return batchNoMatch || nameMatch;
    });

    return (
        <DashboardLayout head={'Stock / Batches'}>
            <ConfirmModal
                open={confirmDeleteModal}
                title={'Delete Stock Batch'}
                message={`Are you sure you want to delete batch ${batchForm.data.batch_no}?`}
                onConfirm={deleteBatchSubmit}
                onCancel={() => setConfirmDeleteModal(false)}
            />

            <Modal show={openBatchModal} onClose={() => setOpenBatchModal(false)} maxWidth='md:w-1/2'>
                <div className='mx-8 my-5 space-y-4'>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white my-4">
                            {isEdit ? 'Edit' : 'Add'} Stock Batch
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <FormSelect
                                id='product_id'
                                label='Select Catalog Product'
                                options={productOptions}
                                value={batchForm.data.product_id}
                                onChange={(e) => batchForm.setData('product_id', e.target.value)}
                                error={batchForm.errors.product_id}
                                required
                            />
                        </div>

                        <div>
                            <FormInput
                                id='batch_no'
                                label='Batch Number'
                                type='text'
                                placeholder='e.g. BATCH-2026-A1'
                                value={batchForm.data.batch_no}
                                onChange={(e) => batchForm.setData('batch_no', e.target.value)}
                                error={batchForm.errors.batch_no}
                                required
                            />
                        </div>

                        <div>
                            <FormInput
                                id='expiry_date'
                                label='Expiry Date'
                                type='date'
                                value={batchForm.data.expiry_date}
                                onChange={(e) => batchForm.setData('expiry_date', e.target.value)}
                                error={batchForm.errors.expiry_date}
                            />
                        </div>

                        <div>
                            <FormInput
                                id='quantity'
                                label='Stock Quantity'
                                type='number'
                                placeholder='0'
                                value={batchForm.data.quantity}
                                onChange={(e) => batchForm.setData('quantity', e.target.value)}
                                error={batchForm.errors.quantity}
                                required
                            />
                        </div>

                        <div>
                            <FormInput
                                id='purchase_price'
                                label='Purchase Price (Cost)'
                                type='number'
                                placeholder='0.00'
                                value={batchForm.data.purchase_price}
                                onChange={(e) => batchForm.setData('purchase_price', e.target.value)}
                                error={batchForm.errors.purchase_price}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <FormInput
                                id='mrp'
                                label='M.R.P. (Selling Price)'
                                type='number'
                                placeholder='0.00'
                                value={batchForm.data.mrp}
                                onChange={(e) => batchForm.setData('mrp', e.target.value)}
                                error={batchForm.errors.mrp}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end items-center gap-x-2 pt-4 border-t border-slate-200 dark:border-slate-700'>
                        <CancelButton onClick={() => { setOpenBatchModal(false); batchForm.reset(); }}>Cancel</CancelButton>
                        <SaveButton disable={batchForm.processing} onClick={submitBatch}>{isEdit ? 'Update' : 'Save Batch'}</SaveButton>
                    </div>
                </div>
            </Modal>

            <CardContainer className='w-full'>
                <div className='flex items-center justify-between w-full mt-4 mb-4'>
                    <h1 className="text-3xl font-bold text-mainColor">
                        Stock Inventory & Batches
                    </h1>
                    <AddButton onClick={openAdd}>Add Stock Batch</AddButton>
                </div>

                <div className="w-full mb-4">
                    <TextInput
                        id="search"
                        type="text"
                        icon={FaSearch}
                        placeholder="Search Batch No / Product Name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/3"
                    />
                </div>

                {filteredBatches.length === 0 ? (
                    <div className="text-center py-10 text-slate-400">
                        No stock batches found. Add your first batch to update inventory.
                    </div>
                ) : (
                    <Table hoverable className='w-full'>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Batch No</TableHeadCell>
                                <TableHeadCell>Product Name</TableHeadCell>
                                <TableHeadCell>Form & Salt</TableHeadCell>
                                <TableHeadCell>Expiry Date</TableHeadCell>
                                <TableHeadCell>Quantity</TableHeadCell>
                                <TableHeadCell>Purchase Price</TableHeadCell>
                                <TableHeadCell>M.R.P.</TableHeadCell>
                                <TableHeadCell>
                                    <span className="sr-only">Actions</span>
                                </TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {filteredBatches.map((b) => (
                                <TableRow key={b.id}>
                                    <TableCell className="whitespace-nowrap py-3 font-mono font-bold text-slate-800 dark:text-white">
                                        {b.batch_no}
                                    </TableCell>
                                    <TableCell className="py-3 font-semibold">
                                        {b.product?.universal_product?.name || `Product #${b.product_id}`}
                                    </TableCell>
                                    <TableCell className="py-3 text-xs">
                                        <div className="text-purple-600 font-medium">
                                            {b.product?.universal_product?.medicine_category?.name || 'N/A'}
                                        </div>
                                        <div className="text-slate-400 font-mono text-[11px]">
                                            {b.product?.universal_product?.salt_composition || ''}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 text-xs font-mono">
                                        {b.expiry_date ? new Date(b.expiry_date).toLocaleDateString() : 'N/A'}
                                    </TableCell>
                                    <TableCell className="py-3 font-bold font-mono">
                                        <span className={b.quantity > 10 ? 'text-green-600' : b.quantity > 0 ? 'text-amber-600' : 'text-red-600'}>
                                            {b.quantity}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-3 text-xs font-mono">
                                        {b.purchase_price ? `₹${parseFloat(b.purchase_price).toFixed(2)}` : 'N/A'}
                                    </TableCell>
                                    <TableCell className="py-3 font-semibold font-mono text-slate-800 dark:text-white">
                                        {b.mrp ? `₹${parseFloat(b.mrp).toFixed(2)}` : 'N/A'}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap py-3 space-x-2">
                                        <button onClick={() => openEdit(b)} title="Edit Batch">
                                            <Icons name='edit' className='text-blue-500 hover:text-blue-700 cursor-pointer' />
                                        </button>
                                        <button onClick={() => {
                                            batchForm.setData({ id: b.id, batch_no: b.batch_no });
                                            setConfirmDeleteModal(true);
                                        }} title="Delete Batch">
                                            <Icons name='delete' />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContainer>
        </DashboardLayout>
    );
}

export default Index;
