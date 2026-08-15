import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow ,Button } from "flowbite-react";
import { Link } from '@inertiajs/react';
import timeAgo from '@/utils/timeAgo';
import CardContainer from '@/Components/CardContainer';
import AddButton from '@/Components/AddButton';
import Icons from '@/Components/Icons';
const Index = ({ allOrder }) => {
    return (
        <DashboardLayout>
          <div>
            <h2 className="text-2xl font-semibold my-4 mx-10">All Order</h2>
          </div>
          <div className='my-5 mx-10 flex items-end justify-end '>
            {/* <Button as={Link} href={route('orders.create')} className='' color="green">Add </Button> */}
            <AddButton href={route('orders.create')}>Add</AddButton>
          </div>
          <CardContainer>
            <Table hoverable>
                       <TableHead>
                         <TableRow>
                           <TableHeadCell>Counter Employee</TableHeadCell>
                           <TableHeadCell>Coustomer Name</TableHeadCell>
                           <TableHeadCell>Time</TableHeadCell>
                           <TableHeadCell>Status</TableHeadCell>
                           <TableHeadCell>Total</TableHeadCell>
                           <TableHeadCell>Tax</TableHeadCell>
                           <TableHeadCell>Discount</TableHeadCell>
                           <TableHeadCell>Net Amount</TableHeadCell>
                           <TableHeadCell>
                             <span className="sr-only">Edit</span>
                           </TableHeadCell>
                         </TableRow>
                       </TableHead>
                       <TableBody className="divide-y">
                         {allOrder.map((order) => (
                           <TableRow key={order.id}>
                             <TableCell className="whitespace-nowrap py-4">
                               <div className="text-sm text-gray-900">{order.created_by.name}</div>
                             </TableCell>
                             <TableCell className="whitespace-nowrap py-4">
                               <div className="text-md text-gray-900">{order.customer?.name || "Guest"}</div>
                             </TableCell>
                             <TableCell className="whitespace-nowrap py-4">
                               <div className={`text-sm ${timeAgo(order.created_at).isToday ? "text-green-500" : "text-blue-500"} `}>
                                 { timeAgo(order.created_at).time }
                                                                </div>
                             </TableCell>
                             <TableCell className="whitespace-nowrap py-4">
                               <div className="text-sm text-gray-900">{order.status}</div>
                             </TableCell>
                             <TableCell className="whitespace-nowrap py-4">
                               <div className="text-sm text-gray-900">{order.grand_total}</div>
                             </TableCell>
                             <TableCell className="whitespace-nowrap py-4">
                               <div className="text-sm text-red-500">{order.grand_total*order.tax/100} ({order.tax}%)</div>
                             </TableCell>
                             <TableCell className="whitespace-nowrap py-4">
                               <div className="text-sm text-blue-500">{order.grand_total*order.discount/100} {order.discount > 0 && (`(${order.discount}%)`)}</div>
                             </TableCell>
                             <TableCell className="whitespace-nowrap py-4">
                               <div className="text-sm text-green-500">{order.net_amount}</div>
                             </TableCell>
                             <TableCell className="whitespace-nowrap py-4">
                               <div className="flex gap-x-2">
                                <div className='text-green-400 '><Link href={route('orders.show',order.id)}><Icons name="view" /></Link></div>
                                <div><Icons name="edit" /></div>
                                <div><Icons name="delete" /></div>
                               </div>
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
