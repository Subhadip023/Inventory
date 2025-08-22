import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";


const Index = ({users}) => {
    const userType = (type) => {
        if (type === 1) {
            return "User"
        }else if (type === 2) {
            return "Manager"
        }else if (type == 3) {
            return "Customer"
        } else {
            return "User"
        }
    }
    return (
        <DashboardLayout head={"Dashboard | Users"}>
            <h1 className='text-2xl font-bold'>All Users</h1>
 <div className="overflow-x-auto">

                    <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone Number</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="whitespace-nowrap py-4">
                <div className="text-sm text-gray-900">{user.name}</div>
              </TableCell>
          
              <TableCell className="whitespace-nowrap py-4">
                <div className="text-sm text-gray-900">{user.email}</div>
              </TableCell>
              <TableCell className="whitespace-nowrap py-4">
                <div className="text-sm text-gray-900">{user.phone_number || "N/A"}</div>
              </TableCell>
              <TableCell className="whitespace-nowrap py-4">
                <div className="text-sm text-gray-900">{userType(user.user_type)}</div>
              </TableCell>
              <TableCell className="whitespace-nowrap py-4 flex items-center justify-center gap-x-2 ">
                Edit
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
