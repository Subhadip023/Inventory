import React, { useEffect } from 'react';
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
const Index = ({ universalProducts,per_page }) => {
    const [products, setProducts] = React.useState(universalProducts.data || []);
    const [currentPage, setCurrentPage] = React.useState(universalProducts.current_page || 1);
    const [totalPages, setTotalPages] = React.useState(universalProducts.links?.length-2 || 1);
    const [openActiveConfirmationModal, setOpenActiveConfirmationModal] = React.useState(false);
    const [openInactiveConfirmationModal, setOpenInactiveConfirmationModal] = React.useState(false);
    const [perPage, setPerPage] = React.useState(per_page ||10);
    const paginationForm = useForm();
    const productActiation = useForm();

    const allpaginationOptions = paginationOptions.filter(option=>{
        if (option.id=='all') return true
        return option.id < universalProducts.total
    });

    const searchProduct = (e) => {
        e.preventDefault();
        axios.post(route('universal-products.search', { search: e.target.value })).then(res => {
            setProducts(res.data);
        })
    }
    const onPageChange = (page) => {
        paginationForm.setData('page', page);
        paginationForm.get(route('universal-products.index',{page:page,per_page:perPage}));
    };

    const handlePerPageChange = (e) => {
        const newPerPage = e.target.value;
        setPerPage(newPerPage);
        paginationForm.setData('per_page', newPerPage);
        paginationForm.get(route('universal-products.index',{per_page:newPerPage}));
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
                paginationForm.get(route('universal-products.index',{per_page:perPage,page:currentPage}));                
            },
        });
    }

    return (
        <SuperAdminDashboardLayout>
            {/* Active product  */}
            <ConfirmModal open={openActiveConfirmationModal} onCancel={()=>setOpenActiveConfirmationModal(false)} title={'Active Product'} message='Do You to active the product ? ' confirmText='Active' onConfirm={handleProductVerification}/>
                
            {/* Inactive product  */}
            <ConfirmModal open={openInactiveConfirmationModal} onCancel={()=>setOpenInactiveConfirmationModal(false)} title={'InActive Product'} message='Do You to Inactive the product ? ' confirmText='InActive' onConfirm={handleProductVerification} />

            <CardContainer className='h-fit flex flex-col items-center justify-center w-full'>
                <div className='flex  items-center justify-start w-full mt-10 mb-5 text-mainColor '>
                    <h1 className='text-3xl font-bold'>Universal Product</h1>
                </div>

                <div className='flex items-center justify-between w-full mb-0'>

                    <div className='w-2/3 flex items-center justify-start'>
                        <TextInput id="search" type="text" icon={FaSearch} placeholder="Search Product" required className='w-1/3 hover:border-none focus:border-none' onChange={searchProduct} />
                    </div>
                    <AddButton > Add Product
                    </AddButton>
                </div>
                <div className='w-full'>
                    <div className='flex items-center justify-end mb-2'>
                        <FormSelect onChange={handlePerPageChange} options={allpaginationOptions} defaultValue={perPage} label="Per Page" width='w-1/6' />
                    </div>
                    {products.length==0&& <div>
                        No products found
                        </div>}
                    {products.length!=0&&  
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
                                        {products.name}
                                    </TableCell>
                                    <TableCell className=" py-4 ">
                                        {products.description}
                                    </TableCell>
                                    <TableCell className=" py-4 ">
                                        {products.category}
                                    </TableCell> 
                                    <TableCell className=" py-4 hover:cursor-pointer">
                                        {products.verified?
                                    <div className='text-green-500 text-xl'  onClick={()=>{setOpenInactiveConfirmationModal(true); productActiation.setData('id', products.id)}}>
                                        <Tooltip content="Not verified">
                                            <Icons name='verified'/>
                                        </Tooltip>
                                    </div>:
                                   <div className='text-red-500 text-xl' onClick={()=>{setOpenActiveConfirmationModal(true); productActiation.setData('id', products.id);}}>
                                        <Tooltip content="verify" >
                                            <Icons name='cross' />
                                        </Tooltip>

                                    </div>
                                    }
                                    </TableCell>

                                    <TableCell className="whitespace-nowrap py-4">

                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>}

                    {per_page!=='all' && <div className="flex overflow-x-auto sm:justify-center my-5">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                    </div>}
                </div>


            </CardContainer>
        </SuperAdminDashboardLayout>
    );
}

export default Index;
