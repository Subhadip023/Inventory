import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link, useForm } from '@inertiajs/react';

const Index = ({products}) => {

  const deleteFrom = useForm();
  const deleteProduct = (id) => {
    
      deleteFrom.delete(route('products.destroy',id));
    
  }
    return (
       <DashboardLayout head={"Dashboard | Product"}>
        <div className='m-5 flex items-end justify-end '>
            <Button as={Link} href={route('products.create')} color="green">Add Product</Button>
        </div>
            <div className="overflow-x-auto">
                     <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Product name</TableHeadCell>
            <TableHeadCell>SKU</TableHeadCell>
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
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
                <div className="text-sm text-gray-900">{product.sku}</div>
              </TableCell>
              <TableCell className="whitespace-nowrap py-4">
                <div className="text-sm text-gray-900">{product.quantity}</div>
              </TableCell>
              <TableCell className="whitespace-nowrap py-4">
                <div className="text-sm text-gray-900">{product.price}</div>
              </TableCell>
              <TableCell className="whitespace-nowrap py-4">
                <div className="text-sm text-gray-900"><Link  href={route('products.edit',product.id)} >Edit</Link></div>
                <div className="text-sm text-gray-900"><button onClick={() => deleteProduct(product.id)}>Delete</button></div>
              </TableCell>
            </TableRow>
          ))}
      
        </TableBody>
      </Table>
            </div>

       </DashboardLayout>
    );
}

export default Index;
