import React from 'react';
import SuperAdminDashboardLayout from '@/Layouts/SuperAdminDashboardLayout';
import { Card } from 'flowbite-react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from "flowbite-react";

import CardContainer from '@/Components/CardContainer';
const Index = ({products}) => {
    return (
        <SuperAdminDashboardLayout>
            <CardContainer className='min-h-48 h-fit flex items-center justify-center w-full'>
                <Table hoverable>
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

            </CardContainer>
        </SuperAdminDashboardLayout>
    );
}

export default Index;
