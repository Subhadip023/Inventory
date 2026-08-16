import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, Pagination, Tooltip } from "flowbite-react";
import paginationOptions from '@/utils/paginationOptions';
import CardContainer from '@/Components/UI/CardContainer';
import AddButton from '@/Components/Buttons/AddButton';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import FormSelect from '@/Components/Form/FormSelect';
import { Link, useForm } from '@inertiajs/react';
import Icons from '@/Components/UI/Icons';
import ConfirmModal from '@/Components/Modal/ConfirmModal';
import FormInput from '@/Components/Form/FormInput';
import CancelButton from '@/Components/Buttons/CancelButton';
import SaveButton from '@/Components/Buttons/SaveButton';
import Modal from '@/Components/Modal/Modal';
import FormTextArea from '@/Components/Form/FormTextArea';
import HighlightText from '@/Components/UI/HighLightText';
import Checkbox from '@/Components/Form/Checkbox';

const Index = ({ universalProducts, per_page, allCategory = [], filterData = {} }) => {
    const [products, setProducts] = useState(universalProducts.data || []);
    const [currentPage, setCurrentPage] = useState(universalProducts.current_page || 1);
    const [totalPages, setTotalPages] = useState(universalProducts.last_page || 1);
    const [openActiveConfirmationModal, setOpenActiveConfirmationModal] = useState(false);
    const [openInactiveConfirmationModal, setOpenInactiveConfirmationModal] = useState(false);
    const [openConfirmProductDeleteModal, setOpenConfirmProductDeleteModal] = useState(false);
    const [openProductFormModal, setOpenProductFormModal] = useState(false);
    const [perPage, setPerPage] = useState(filterData['per_page'] || 5);
    const [categoryId, setCategoryId] = useState(filterData['medicine_category_id'] || null);
    const [filterVarified, setFilterVarified] = useState(filterData['verified'] || 'all');
    const [searchText, setSearchText] = useState(');

    const paginationForm = useForm();
    const productActivation = useForm();
    const universalProductForm = useForm({
        id: null,
        name: ',
        description: ',
        salt_composition: ',
        manufacturer: ',
        hsn_code: ',
        gst_rate: ',
        drug_schedule: 'OTC',
        medicine_category_id: ',
        verified: true,
    });

    const categoryOptions = [
        { id: 'all', name: 'All Categories' },
        ...allCategory.map(cat => ({ id: cat.id, name: cat.name }))
    ];

    const drugScheduleOptions = [
        { id: 'OTC', name: 'OTC (Over The Counter)' },
        { id: 'H', name: 'Schedule H (Prescription)' },
        { id: 'H1', name: 'Schedule H1 (Controlled Antibiotics)' },
        { id: 'X', name: 'Schedule X (Narcotics)' },
        { id: 'G', name: 'Schedule G (Medical Supervision)' },
    ];

    const filterCategory = (e) => {
        e.preventDefault();
        const selectedCat = e.target.value;
        setCategoryId(selectedCat);
        paginationForm.get(route('universal-products.index', { per_page: perPage, medicine_category_id: selectedCat, verified: filterVarified }));
    };

    const filterVarifiedChange = (e) => {
        e.preventDefault();
        const selectedVerified = e.target.value;
        setFilterVarified(selectedVerified);
        paginationForm.get(route('universal-products.index', { per_page: perPage, medicine_category_id: categoryId, verified: selectedVerified }));
    };

    const allpaginationOptions = paginationOptions.filter(option => {
        if (option.id === 'all') return true;
        return option.id <= (universalProducts.total || 100);
    });

    useEffect(() => {
        setProducts(universalProducts.data || []);
        setCurrentPage(universalProducts.current_page || 1);
        setTotalPages(universalProducts.last_page || 1);
    }, [universalProducts]);

    const searchProduct = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
        axios.post(route('universal-products.search', { search: e.target.value })).then(res => {
            setProducts(res.data);
        });
    };

    const onPageChange = (page) => {
        paginationForm.get(route('universal-products.index', { page: page, per_page: perPage, medicine_category_id: categoryId, verified: filterVarified }));
    };

    const handlePerPageChange = (e) => {
        const newPerPage = e.target.value;
        setPerPage(newPerPage);
        paginationForm.get(route('universal-products.index', { per_page: newPerPage, medicine_category_id: categoryId, verified: filterVarified }));
    };

    const handleProductVerification = (e) => {
        e.preventDefault();
        productActivation.post(route('universal-products.changeVarifyStatus'), {
            onSuccess: () => {
                setOpenActiveConfirmationModal(false);
                setOpenInactiveConfirmationModal(false);
                productActivation.reset();
            },
        });
    };

    const handleProductFormSubmit = (e) => {
        e.preventDefault();
        if (universalProductForm.data.id) {
            universalProductForm.put(route('universal-products.update', universalProductForm.data.id), {
                onSuccess: () => {
                    setOpenProductFormModal(false);
                    universalProductForm.reset();
                },
            });
            return;
        }

        universalProductForm.post(route('universal-products.store'), {
            onSuccess: () => {
                setOpenProductFormModal(false);
                universalProductForm.reset();
            },
        });
    };

    const deleteProductSubmit = (e) => {
        e.preventDefault();
        universalProductForm.delete(route('universal-products.destroy', universalProductForm.data.id), {
            onSuccess: () => {
                setOpenConfirmProductDeleteModal(false);
                universalProductForm.reset();
            },
        });
    };

    const openAddModal = () => {
        universalProductForm.reset();
        universalProductForm.setData({
            id: null,
            name: ',
            description: ',
            salt_composition: ',
            manufacturer: ',
            hsn_code: ',
            gst_rate: '12.00',
            drug_schedule: 'OTC',
            medicine_category_id: allCategory[0]?.id || ',
            verified: true,
        });
        setOpenProductFormModal(true);
    };

    const openEditModal = (prod) => {
        universalProductForm.setData({
            id: prod.id,
            name: prod.name || ',
            description: prod.description || ',
            salt_composition: prod.salt_composition || ',
            manufacturer: prod.manufacturer || ',
            hsn_code: prod.hsn_code || ',
            gst_rate: prod.gst_rate || ',
            drug_schedule: prod.drug_schedule || 'OTC',
            medicine_category_id: prod.medicine_category_id || ',
            verified: Boolean(prod.verified),
        });
        setOpenProductFormModal(true);
    };

    return (
        <DashboardLayout>
            <ConfirmModal open={openConfirmProductDeleteModal} onCancel={() => setOpenConfirmProductDeleteModal(false)} title={'Delete Master Product'} message={`Are you sure you want to delete ${universalProductForm.data.name}?`} confirmText='Delete' onConfirm={deleteProductSubmit} />

            <Modal show={openProductFormModal} onClose={() => setOpenProductFormModal(false)} maxWidth='md:w-1/2'>
                <div className='mx-8 my-5 space-y-4'>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white my-4">
                            {universalProductForm.data.id ? "Edit" : "Add"} Master Universal Product
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <FormInput id='name' label='Brand / Medicine Name' type='text' placeholder='e.g. Paracetamol 500mg' value={universalProductForm.data.name} onChange={(e) => universalProductForm.setData('name', e.target.value)} error={universalProductForm.errors.name} required />
                        </div>

                        <div className="col-span-2">
                            <FormInput id='salt_composition' label='Salt Composition / Active Ingredient' type='text' placeholder='e.g. Paracetamol IP 500mg' value={universalProductForm.data.salt_composition} onChange={(e) => universalProductForm.setData('salt_composition', e.target.value)} error={universalProductForm.errors.salt_composition} />
                        </div>

                        <div>
                            <FormInput id='manufacturer' label='Manufacturer / Pharma Company' type='text' placeholder='e.g. Cipla Ltd, Sun Pharma' value={universalProductForm.data.manufacturer} onChange={(e) => universalProductForm.setData('manufacturer', e.target.value)} error={universalProductForm.errors.manufacturer} />
                        </div>

                        <div>
                            <FormSelect id='medicine_category_id' label='Category / Form' options={[{ id: ', name: 'Select Form' }, ...allCategory]} value={universalProductForm.data.medicine_category_id} onChange={(e) => universalProductForm.setData('medicine_category_id', e.target.value)} error={universalProductForm.errors.medicine_category_id} />
                        </div>

                        <div>
                            <FormSelect id='drug_schedule' label='Drug Schedule' options={drugScheduleOptions} value={universalProductForm.data.drug_schedule} onChange={(e) => universalProductForm.setData('drug_schedule', e.target.value)} error={universalProductForm.errors.drug_schedule} />
                        </div>

                        <div>
                            <FormInput id='hsn_code' label='HSN Code' type='text' placeholder='e.g. 30049099' value={universalProductForm.data.hsn_code} onChange={(e) => universalProductForm.setData('hsn_code', e.target.value)} error={universalProductForm.errors.hsn_code} />
                        </div>

                        <div>
                            <FormInput id='gst_rate' label='GST Rate (%)' type='number' placeholder='12.00' value={universalProductForm.data.gst_rate} onChange={(e) => universalProductForm.setData('gst_rate', e.target.value)} error={universalProductForm.errors.gst_rate} />
                        </div>

                        <div className="col-span-2">
                            <FormTextArea id={'description'} label="Description / Indications" type='textarea' value={universalProductForm.data.description} onChange={(e) => universalProductForm.setData('description', e.target.value)} placeholder='Indications, uses, precautions...' error={universalProductForm.errors.description} />
                        </div>

                        <div className='col-span-2 my-2 flex items-center gap-x-2'>
                            <Checkbox checked={universalProductForm.data.verified} onChange={(e) => universalProductForm.setData('verified', e.target.checked)} />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Verified Master Catalog Product</span>
                        </div>
                    </div>

                    <div className='flex justify-end items-center gap-x-2 pt-4 border-t border-slate-200 dark:border-slate-700'>
                        <CancelButton onClick={() => { setOpenProductFormModal(false); universalProductForm.reset(); }}>Cancel</CancelButton>
                        <SaveButton disable={universalProductForm.processing} onClick={handleProductFormSubmit}>Save Product</SaveButton>
                    </div>
                </div>
            </Modal>

            {/* Verification Confirmation Modals */}
            <ConfirmModal open={openActiveConfirmationModal} onCancel={() => setOpenActiveConfirmationModal(false)} title={'Verify Product'} message='Mark this product as verified in master catalog?' confirmText='Verify' onConfirm={handleProductVerification} />
            <ConfirmModal open={openInactiveConfirmationModal} onCancel={() => setOpenInactiveConfirmationModal(false)} title={'Unverify Product'} message='Unmark this product verification status?' confirmText='Unverify' onConfirm={handleProductVerification} />

            <CardContainer className='h-fit flex flex-col items-center justify-center w-full'>
                <div className='flex items-center justify-start w-full mt-6 mb-4 text-mainColor'>
                    <h1 className='text-3xl font-bold'>Universal Master Products</h1>
                </div>

                <div className='flex flex-col sm:flex-row items-center justify-between w-full mb-4 gap-4'>
                    <div className='w-full sm:w-1/2 flex items-center justify-start'>
                        <TextInput id="search" type="text" icon={FaSearch} placeholder="Search Product / Salt / Manufacturer..." required className='w-full' onChange={searchProduct} />
                    </div>
                    <AddButton onClick={openAddModal}>Add Product</AddButton>
                </div>

                <div className='w-full'>
                    <div className='flex flex-wrap items-center justify-end mb-4 gap-2'>
                        <FormSelect onChange={filterVarifiedChange} options={
                            [
                                { id: 'all', name: "All Verification Status" },
                                { id: '1', name: "Verified" },
                                { id: '0', name: "Unverified" },
                            ]
                        } value={filterVarified} id="Verified" label="Verified" width='w-44' />

                        <FormSelect onChange={filterCategory} options={categoryOptions} value={categoryId || 'all'} id="category" label="Category" width='w-44' />

                        <FormSelect onChange={handlePerPageChange} options={allpaginationOptions} value={perPage} id={'per_page'} label="Per Page" width='w-32' />

                        <Link href={route('universal-products.index')} className='flex items-center text-xl justify-center bg-blue-600 hover:bg-blue-500 text-white h-10 w-10 mt-7 rounded-lg'>
                            <Tooltip content="Reset filter">
                                <Icons name='reset' />
                            </Tooltip>
                        </Link>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-10 text-slate-400">
                            No universal products found.
                        </div>
                    ) : (
                        <Table hoverable className='w-full'>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>ID</TableHeadCell>
                                    <TableHeadCell>Name & Salt</TableHeadCell>
                                    <TableHeadCell>Manufacturer</TableHeadCell>
                                    <TableHeadCell>Form & Schedule</TableHeadCell>
                                    <TableHeadCell>GST %</TableHeadCell>
                                    <TableHeadCell>Status</TableHeadCell>
                                    <TableHeadCell>
                                        <span className="sr-only">Actions</span>
                                    </TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {products.map((prod) => (
                                    <TableRow key={prod.id}>
                                        <TableCell className="whitespace-nowrap py-3 font-mono text-xs text-slate-400">
                                            #{prod.id}
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                <HighlightText text={prod.name} search={searchText} />
                                            </div>
                                            {prod.salt_composition && (
                                                <div className="text-xs text-slate-500 font-mono">
                                                    <HighlightText text={prod.salt_composition} search={searchText} />
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-3 text-xs text-slate-600 dark:text-slate-300">
                                            {prod.manufacturer || 'N/A'}
                                        </TableCell>
                                        <TableCell className="py-3 text-xs">
                                            <span className="inline-block px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-semibold mr-1">
                                                {prod.medicine_category?.name || prod.category?.name || 'N/A'}
                                            </span>
                                            <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                                                Sch {prod.drug_schedule || 'OTC'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-3 text-xs font-mono">
                                            {prod.gst_rate ? `${prod.gst_rate}%` : 'N/A'}
                                        </TableCell>
                                        <TableCell className="py-3 hover:cursor-pointer">
                                            {prod.verified ? (
                                                <div className='text-green-500 text-xl' onClick={() => { setOpenInactiveConfirmationModal(true); productActivation.setData('id', prod.id); }}>
                                                    <Tooltip content="Verified Product">
                                                        <Icons name='verified' />
                                                    </Tooltip>
                                                </div>
                                            ) : (
                                                <div className='text-red-500 text-xl' onClick={() => { setOpenActiveConfirmationModal(true); productActivation.setData('id', prod.id); }}>
                                                    <Tooltip content="Unverified Product">
                                                        <Icons name='cross' />
                                                    </Tooltip>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap py-3 space-x-2">
                                            <button onClick={() => openEditModal(prod)} title="Edit Product">
                                                <Icons name='edit' />
                                            </button>
                                            <button onClick={() => {
                                                universalProductForm.reset();
                                                universalProductForm.setData({ id: prod.id, name: prod.name });
                                                setOpenConfirmProductDeleteModal(true);
                                            }} title="Delete Product">
                                                <Icons name='delete' />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                    {per_page !== 'all' && (
                        <div className="flex overflow-x-auto sm:justify-center my-5">
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                        </div>
                    )}
                </div>
            </CardContainer>
        </DashboardLayout>
    );
};

export default Index;
