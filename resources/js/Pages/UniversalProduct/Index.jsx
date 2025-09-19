import React from 'react';
import SuperAdminDashboardLayout from '@/Layouts/SuperAdminDashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button, TextInput, Pagination } from "flowbite-react";
import paginationOptions from '@/utils/paginationOptions';
import CardContainer from '@/Components/CardContainer';
import AddButton from '@/Components/AddButton';
import FormInput from '@/Components/FormInput';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import FormSelect from '@/Components/FormSelect';
import { useForm } from '@inertiajs/react';
const Index = ({ universalProducts,per_page }) => {
    console.log(universalProducts);
    const [products, setProducts] = React.useState(universalProducts.data || []);
    const [currentPage, setCurrentPage] = React.useState(universalProducts.current_page || 1);
    const [totalPages, setTotalPages] = React.useState(universalProducts.links.length-2 || 1);
    const [perPage, setPerPage] = React.useState(per_page ||10);
    const paginationForm = useForm();

    const searchProduct = (e) => {
        e.preventDefault();
        axios.post(route('universal-products.search', { search: e.target.value })).then(res => {
            setProducts(res.data);
        })
    }
    const onPageChange = (page) => {
        paginationForm.setData('page', page);
        paginationForm.get(route('universal-products.index',{page:page}));
    };

    const handlePerPageChange = (e) => {
        const newPerPage = e.target.value;
        setPerPage(newPerPage);
        paginationForm.setData('per_page', newPerPage);
        paginationForm.get(route('universal-products.index',{per_page:newPerPage}));
    }

    return (
        <SuperAdminDashboardLayout>
            <CardContainer className='h-fit flex flex-col items-center justify-center w-full'>
                <div className='flex  items-center justify-start w-full mt-10 mb-5 text-mainColor '>
                    <h1 className='text-3xl font-bold'>Universal Product</h1>
                </div>

                <div className='flex items-center justify-between w-full mb-10'>

                    <div className='w-2/3 flex items-center justify-center'>
                        <TextInput id="email4" type="email" icon={FaSearch} placeholder="Search Product" required className='w-1/3 hover:border-none focus:border-none' onChange={searchProduct} />
                    </div>
                    <AddButton > Add Product
                    </AddButton>
                </div>
                <div className='w-full'>
                    <div className='flex items-center justify-end mb-2'>
                        <FormSelect onChange={handlePerPageChange} options={paginationOptions} defaultValue={perPage} label="Per Page" width='w-1/6' />
                    </div>
                    <Table hoverable className='w-full'>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>ID</TableHeadCell>
                                <TableHeadCell>Name</TableHeadCell>
                                <TableHeadCell>Description</TableHeadCell>
                                <TableHeadCell>Category</TableHeadCell>
                                <TableHeadCell>
                                    <span className="sr-only">Edit</span>
                                </TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {products.map((products) => (
                                <TableRow key={products.id}>
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

                                    <TableCell className="whitespace-nowrap py-4">

                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

                    <div className="flex overflow-x-auto sm:justify-center">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                    </div>
                </div>


            </CardContainer>
        </SuperAdminDashboardLayout>
    );
}

export default Index;
