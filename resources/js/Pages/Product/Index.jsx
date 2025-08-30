import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tooltip } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link, useForm } from '@inertiajs/react';

import CardContainer from '@/Components/CardContainer';
import Icons from '@/Components/Icons';
const Index = ({ products }) => {

  const deleteFrom = useForm();
  const deleteProduct = (id) => {

    deleteFrom.delete(route('products.destroy', id));

  }
  return (
    <DashboardLayout head={"Dashboard | Product"}>
      <div className='m-5 flex items-end justify-end '>
        <Button as={Link} href={route('products.create')} color="green">Add Product</Button>
      </div>
      <CardContainer className='min-h-48 flex items-center justify-center'>
       {products.length > 0 && <Table hoverable>
          <TableHead>
            <TableRow >
              <TableHeadCell>Product name</TableHeadCell>
              <TableHeadCell>description</TableHeadCell>
              <TableHeadCell>Quantity</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
              <TableHeadCell>
                Actions
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900">{product.name}</div>
                </TableCell>

                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900">{product.description==' '?'No description':product.description}</div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900">{product.quantity}</div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900">{product.price}</div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4 flex items-center justify-center gap-x-2 ">
                  <div className="text-sm text-gray-900 duration-200">
                    <Link href={route('products.edit', product.id)} ><Icons name="edit" /></Link>
                  </div>
                  <div className="text-sm text-gray-900 mt-1">
                    <button onClick={() => deleteProduct(product.id)} ><Icons name="delete" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>}
        {products.length == 0 && <div className='text-3xl text-rose-500 text-bold flex items-center justify-center '>No Product Found</div>}
      </CardContainer>
    </DashboardLayout>
  );
}

export default Index;
