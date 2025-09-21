import React, { useEffect, useState } from 'react';
import SuperAdminDashboardLayout from '@/Layouts/SuperAdminDashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button, TextInput, Pagination, Tooltip } from "flowbite-react";
import paginationOptions from '@/utils/paginationOptions';
import CardContainer from '@/Components/CardContainer';
import AddButton from '@/Components/AddButton';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import FormSelect from '@/Components/FormSelect';
import { useForm } from '@inertiajs/react';
import Icons from '@/Components/Icons';
import ConfirmModal from '@/Components/ConfirmModal';
import FormInput from '@/Components/FormInput';
import CancelButton from '@/Components/CancelButton';
import SaveButton from '@/Components/SaveButton';
import Modal from '@/Components/Modal';
import FormTextArea from '@/Components/FormTextArea';
import HighlightText from '@/Components/HighLightText';
import Checkbox from '@/Components/Checkbox';


const Index = ({ universalProducts, per_page, allCategory, filterData }) => {

    console.log(universalProducts)

    const [products, setProducts] = React.useState(universalProducts.data || []);
    const [currentPage, setCurrentPage] = React.useState(universalProducts.current_page || 1);
    const [totalPages, setTotalPages] = React.useState(universalProducts.links?.length - 2 || 1);
    const [openActiveConfirmationModal, setOpenActiveConfirmationModal] = React.useState(false);
    const [openInactiveConfirmationModal, setOpenInactiveConfirmationModal] = React.useState(false);
    const [openConfirmProductDeleteModal, setOpenConfirmProductDeleteModal] = React.useState(false);
    const [openProductFormModal, setOpenProductFormModal] = React.useState(false);
    const [perPage, setPerPage] = React.useState(filterData['per_page'] || 5);
    const [categoryId, setCategoryId] = React.useState(filterData['shop_category_id'] || null);
    const [searchText, setSerchText] = useState('');
    const paginationForm = useForm();
    const productActiation = useForm();
    const universalProductForm = useForm({
        name: '',
        description: '',
        shop_category_id: '',
        verified: true,
    });



    const filterCategory = (e) => {
        e.preventDefault();
        setCategoryId(e.target.value)
        paginationForm.setData('shop_category_id', categoryId);
        paginationForm.setData('page', currentPage);
        paginationForm.get(route('universal-products.index', { per_page: perPage, shop_category_id: e.target.value }));
    }

    const allpaginationOptions = paginationOptions.filter(option => {
        if (option.id == 'all') return true
        return option.id < universalProducts.total
    });

    useEffect(() => {
        setProducts(universalProducts.data || []);
        setCurrentPage(universalProducts.current_page || 1);
        setTotalPages(universalProducts.links?.length - 2 || 1);
    }, [universalProducts]);

    const searchProduct = (e) => {
        e.preventDefault();
        setSerchText(e.target.value);
        axios.post(route('universal-products.search', { search: e.target.value })).then(res => {
            setProducts(res.data.data);
            setTotalPages(res.data.total === 0 ? 1 : res.data.total);
        })
    }
    const onPageChange = (page) => {
        paginationForm.setData('page', page);
        console.log(categoryId)
        paginationForm.get(route('universal-products.index', { page: page, per_page: perPage, shop_category_id: categoryId }));
    };

    const handlePerPageChange = (e) => {
        const newPerPage = e.target.value;
        setPerPage(newPerPage);
        paginationForm.setData('per_page', newPerPage);
        paginationForm.get(route('universal-products.index', { per_page: newPerPage, shop_category_id: categoryId }));
    }

    const handleProductVerification = (e) => {
        e.preventDefault();
        productActiation.post(route('universal-products.changeVarifyStatus'), {
            onSuccess: (response) => {
                setOpenActiveConfirmationModal(false);
                setOpenInactiveConfirmationModal(false);
                productActiation.reset();
            },
            onError: (errors) => {
                // Handle error (e.g., show an error message)
                console.error('Error changing product status:', errors);
            },
            onFinish: () => {
                paginationForm.get(route('universal-products.index', { per_page: perPage, page: currentPage }));
            },
        });
    }

    const handelProductFormSubmit = (e) => {
        e.preventDefault();
        if (universalProductForm.data.id) {
            universalProductForm.put(route('universal-products.update', { universal_product: universalProductForm.data.id }), {
                onSuccess: () => {
                    setOpenProductFormModal(false);
                    universalProductForm.reset();
                },
                onError: (errors) => {
                    console.log(errors);
                    setOpenProductFormModal(true);

                },

            })
            return;
        }
        universalProductForm.post(route('universal-products.store'), {
            onSuccess: () => {
                setOpenProductFormModal(false);
                universalProductForm.reset();
            },
            onError: (errors) => {
                console.log(errors);
                setOpenProductFormModal(true);

            },



        })
    }

    const deleteProductSubmit = (e) => {
        e.preventDefault();
        universalProductForm.delete(route('universal-products.destroy', { universal_product: universalProductForm.data.id }), {
            onSuccess: () => {
                setOpenConfirmProductDeleteModal(false);
                universalProductForm.reset();
            },
            onError: (errors) => {
                console.log(errors);
                setOpenConfirmProductDeleteModal(true);

            }
        })
    }

    return (
        <SuperAdminDashboardLayout>
            {/* delete universal product ConfirmModal  */}

            <ConfirmModal open={openConfirmProductDeleteModal} onCancel={() => setOpenConfirmProductDeleteModal(false)} title={'Delete Product '} message={`Do You want to delete ${universalProductForm.data.name} ?`} confirmText='Delete' onConfirm={deleteProductSubmit} />

            {/* Add and Edit product form */}

            <Modal show={openProductFormModal} onClose={() => setOpenProductFormModal(false)} maxWidth='md:w-1/3' >
                <div className=' mx-10 my-5 '>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-mainColor font-bold text-straight my-6 md:my-10">
                            {universalProductForm.data.id ? "Edit" : "Add"} Product
                        </h2>
                    </div>
                    <div>
                        <FormInput id='name' label=' Name' type='text' placeholder=' Name' value={universalProductForm.data.name} onChange={(e) => universalProductForm.setData('name', e.target.value)} error={universalProductForm.errors.name} />
                        <FormTextArea id={'description'} label="Description" type='textarea' value={universalProductForm.data.description} onChange={(e) => universalProductForm.setData('description', e.target.value)} placeholder='Description' error={universalProductForm.errors.description} />
                        <FormSelect id='shop_category_id' label='Category' options={[{ id: 'all', name: 'Select Category' }, ...allCategory]} value={universalProductForm.data.shop_category_id} onChange={(e) => universalProductForm.setData('shop_category_id', e.target.value)} error={universalProductForm.errors.shop_category_id} />
                        <div className='my-5 flex items-center gap-x-2'>
                            <Checkbox checked={universalProductForm.data.verified} onChange={
                                (e) => universalProductForm.setData('verified', e.target.checked)
                            } /> verified

                            <div>
                                {universalProductForm.errors.verified && <div className="text-red-500">{universalProductForm.errors.verified}</div>}
                            </div>
                        </div>
                    </div>


                    <div className='flex justify-end items-center gap-x-2 my-5'>
                        <CancelButton onClick={() => { setOpenProductFormModal(false); universalProductForm.reset(); }}>Cancel</CancelButton>
                        <SaveButton disable={universalProductForm.processing} onClick={handelProductFormSubmit}>Save</SaveButton>
                    </div>
                </div>
            </Modal>

            {/* Active product  */}
            <ConfirmModal open={openActiveConfirmationModal} onCancel={() => setOpenActiveConfirmationModal(false)} title={'Active Product'} message='Do You to active the product ? ' confirmText='Active' onConfirm={handleProductVerification} />

            {/* Inactive product  */}
            <ConfirmModal open={openInactiveConfirmationModal} onCancel={() => setOpenInactiveConfirmationModal(false)} title={'InActive Product'} message='Do You to Inactive the product ? ' confirmText='InActive' onConfirm={handleProductVerification} />

            <CardContainer className='h-fit flex flex-col items-center justify-center w-full'>
                <div className='flex  items-center justify-start w-full mt-10 mb-5 text-mainColor '>
                    <h1 className='text-3xl font-bold'>Universal Product</h1>
                </div>

                <div className='flex items-center justify-between w-full mb-0'>

                    <div className='w-2/3 flex items-center justify-start'>
                        <TextInput id="search" type="text" icon={FaSearch} placeholder="Search Product" required className='w-1/3 hover:border-none focus:border-none' onChange={searchProduct} />
                    </div>
                    <AddButton onClick={() => setOpenProductFormModal(true)}> Add Product
                    </AddButton>
                </div>
                <div className='w-full'>
                    <div className='flex items-center justify-end mb-2 gap-x-2'>
                        <FormSelect onChange={filterCategory} options={[{ id: "all", name: 'Select Category' }, ...allCategory]} value={categoryId} id="category" label="Category" width='w-1/6' />

                        <FormSelect onChange={handlePerPageChange} options={allpaginationOptions} value={perPage} id={'per_page'} label="Per Page" width='w-1/6' />

                    </div>
                    {products.length == 0 && <div>
                        No products found
                    </div>}
                    {products.length != 0 &&
                        <Table hoverable className='w-full'>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>ID</TableHeadCell>
                                    <TableHeadCell>Name</TableHeadCell>
                                    <TableHeadCell>Description</TableHeadCell>
                                    <TableHeadCell>Category</TableHeadCell>
                                    <TableHeadCell>Verified</TableHeadCell>
                                    <TableHeadCell>
                                        <span className="sr-only">Edit</span>
                                    </TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {products.map((products) => (
                                    <TableRow key={products.id} >
                                        <TableCell className="whitespace-nowrap py-4">
                                            {products.id}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap py-4">
                                            {/* {products.name} */}
                                            <HighlightText text={products.name} search={searchText} />
                                        </TableCell>
                                        <TableCell className=" py-4 ">
                                            {products.description == null ? 'No Description' : <HighlightText text={products.description} search={searchText} />
                                            }


                                        </TableCell>
                                        <TableCell className=" py-4 ">
                                            {products.category ? products.category.name : 'N/A'}
                                        </TableCell>
                                        <TableCell className=" py-4 hover:cursor-pointer">
                                            {products.verified ?
                                                <div className='text-green-500 text-xl' onClick={() => { setOpenInactiveConfirmationModal(true); productActiation.setData('id', products.id) }}>
                                                    <Tooltip content="Not verified">
                                                        <Icons name='verified' />
                                                    </Tooltip>
                                                </div> :
                                                <div className='text-red-500 text-xl' onClick={() => { setOpenActiveConfirmationModal(true); productActiation.setData('id', products.id); }}>
                                                    <Tooltip content="verify" >
                                                        <Icons name='cross' />
                                                    </Tooltip>

                                                </div>
                                            }
                                        </TableCell>

                                        <TableCell className="whitespace-nowrap py-4">
                                            <button onClick={() => {
                                                universalProductForm.setData('id', products.id);
                                                universalProductForm.setData('name', products.name);
                                                universalProductForm.setData('description', products.description);
                                                universalProductForm.setData('shop_category_id', products.shop_category_id);
                                                universalProductForm.setData('verified', products.verified);
                                                setOpenProductFormModal(true);
                                            }}>
                                                <Icons name='edit' />
                                            </button>

                                            <button onClick={() => {
                                                universalProductForm.reset();
                                                universalProductForm.setData('id', products.id);
                                                universalProductForm.setData('name', products.name);
                                                setOpenConfirmProductDeleteModal(true);
                                            }}>
                                                <Icons name='delete' />
                                            </button>

                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>}

                    {per_page !== 'all' && <div className="flex overflow-x-auto sm:justify-center my-5">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                    </div>}
                </div>


            </CardContainer>
        </SuperAdminDashboardLayout>
    );
}

export default Index;
