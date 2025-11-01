import SuperAdminDashboardLayout from '@/Layouts/SuperAdminDashboardLayout';
import React, { use } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Modal from '@/Components/Modal';
import { RxCross2 } from "react-icons/rx";
import {
  Button,

  Avatar
} from "flowbite-react";

import CardContainer from '@/Components/CardContainer';
import { formatToIST } from "@/utils/formatToIST";

import AdduserModal from '@/Components/AdduserModal';
const Users = ({ allusers, allCountry, defult_selected_country_id, allState, allCity, defult_selected_state_id, allRoles }) => {
  const [addUserModal, setAddUserModal] = React.useState(false);
  return (
    <SuperAdminDashboardLayout head={'Users'}>
      <AdduserModal open={addUserModal} setOpen={setAddUserModal} allCountry={allCountry} defult_selected_country_id={defult_selected_country_id} allState={allState} allCity={allCity} defult_selected_state_id={defult_selected_state_id} allRoles={allRoles} />
      <CardContainer className='w-full h-fit my-auto'>
        <div className='mx-5 my-10 flex items-center justify-between '>
          <h1 className='text-2xl font-bold '>All Users</h1>
          <Button color="green" onClick={() => setAddUserModal(true)}>Add User</Button>
        </div>
        <Table hoverable>
          <TableHead>
            <TableRow>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Profile</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
              <TableHeadCell>Active At</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone Number</TableHeadCell>
              <TableHeadCell>Address</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {allusers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">{user.name} </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">
                    <Avatar img={`${user.profile_image ? '/storage/' + user.profile_image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}`} />
                  </div>
                </TableCell>

                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">{user.status?.name || "N/A"}</div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">{user.roles?.map((role) => role.name).join(', ') || "N/A"}</div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900">
                      {formatToIST(user.last_activity_at)}
                  </div>

                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className={`text-sm ${user.email_verified_at ? "text-green-600" : "text-gray-900"}`}>{user.email}</div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">{user.phone_number || "N/A"}</div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="text-sm text-gray-900  dark:text-white">
                    {user.full_address
                      ? user.full_address.length > 20
                        ? user.full_address.slice(0, 20) + "..."
                        : user.full_address
                      : "N/A"}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4 flex items-center justify-center gap-x-2 ">
                  edit
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </CardContainer>

    </SuperAdminDashboardLayout>
  );
}

export default Users;
