import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Link } from '@inertiajs/react';
import { MdArrowBack } from "react-icons/md";

const Show = ({ order }) => {
    console.log(order);
    return (
        <DashboardLayout>
            <div className='flex items-center  my-4 mx-10 gap-x-2'>
                 <Link href={route('orders.index')} className=""><MdArrowBack className='text-2xl hover:scale-110' /></Link>
                <h2 className="text-2xl font-semibold">Show Order</h2>
            </div>
            <div className='grid grid-cols-3 gap-4 my-10 mx-10 '>
                <h3><span className='font-bold text-blue-600'>Order ID: </span>  {order.id}</h3>
                <h3><span className='font-bold text-blue-600'>Order Created By: </span> {order.created_by?.name??""}</h3>
                <h3><span className='font-bold text-blue-600'>Customer Name : </span>  {order.customer?.name??"gust"}</h3>
            </div>
           

            <div>
                <h2 className="text-xl font-semibold my-4 mx-10">Order Items</h2>
            </div>


            <div className="overflow-x-auto my-4 mx-10">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Product name</TableHeadCell>
                            <TableHeadCell>price</TableHeadCell>
                            <TableHeadCell>Quanttity</TableHeadCell>

                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {order.order_items.map((item) => (
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.product.name}
                                </TableCell>
                                <TableCell>{item.price}</TableCell>

                                <TableCell>{item.quantity}</TableCell>

                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </div>

            <div className='grid grid-cols-4 gap-4 my-10 mx-10 '>
                <h3>
                    <span className='font-bold text-green-600'>Total:</span>  
                    {order.grand_total} rs
                </h3>
                <h3>
                    <span className='font-bold text-red-600'>Tax: </span> 
                    {(order.grand_total * order.tax / 100).toFixed(2)} rs
                </h3>
                <h3>
                    <span className='font-bold text-blue-600'>Discount : </span>  
                    {(order.grand_total * order.discount / 100).toFixed(2)} rs
                </h3>
                <h3>
                    <span className='font-bold text-orange-600'>Net Total : </span>  
                    {order.net_amount} rs
                </h3>
            </div>

        </DashboardLayout>
    );
}

export default Show;
