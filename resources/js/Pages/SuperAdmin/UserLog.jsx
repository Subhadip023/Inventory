import React from 'react'
import SuperAdminDashboardLayout from '@/Layouts/SuperAdminDashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import CardContainer from '@/Components/CardContainer';
import { Link } from '@inertiajs/react';
export default function UserLog({ allLogs,view=true}) {
  console.log(allLogs)
  return (
    <SuperAdminDashboardLayout>
      <CardContainer className='w-full h-fit my-auto'>
        <div className='mx-5 my-10 flex items-center justify-between '>
          <h1 className='text-2xl font-bold '>All Users</h1>

        </div>
        <Table hoverable>
          <TableHead>
            <TableRow>
              <TableHeadCell>Time</TableHeadCell>
              <TableHeadCell>User Name</TableHeadCell>
              <TableHeadCell>activity_type</TableHeadCell>
              <TableHeadCell>description</TableHeadCell>
              <TableHeadCell>ip_address At</TableHeadCell>
              <TableHeadCell>user_agent</TableHeadCell>

              {view &&<TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>}
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {allLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">{log.activity_time} </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">{log.user.name} </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">{log.activity_type} </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">{log.description} </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">{log.ip_address} </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">{log.user_agent} </div>
                </TableCell>
                {view && <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">
                    <Link href={route('superadmin.all-activity-user', log.user.id)}>
                      View
                    </Link>
                  </div>
                </TableCell>}


              </TableRow>
            ))}

          </TableBody>
        </Table>
      </CardContainer>
    </SuperAdminDashboardLayout>
  )
}
