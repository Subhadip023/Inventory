import CardContainer from '@/Components/CardContainer';
import SuperAdminDashboardLayout from '@/Layouts/SuperAdminDashboardLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from "flowbite-react";
import Modal from '@/Components/Modal';
import AddButton from '@/Components/AddButton';
import CancelButton from '@/Components/CancelButton';
import SaveButton from '@/Components/SaveButton';
import FormInput from '@/Components/FormInput';
import { useForm } from '@inertiajs/react';
import Icons from '@/Components/Icons';
import { RxCrossCircled } from "react-icons/rx";
import ConfirmModal from '@/Components/ConfirmModal';

const Index = ({ roles, all_permissions, all_users }) => {
    const [openAddRoleModal, setOpenAddRoleModal] = React.useState(false);
    const [isEditRole, setIsEditRole] = React.useState(false);
    const [showPermissionModal, setShowPermissionModal] = React.useState(false);
    const [openAddPermissionModal, setOpenAddPermissionModal] = React.useState(false);
    const [isEditPermission, setIsEditPermission] = React.useState(false);
    const [confirmDeleteRole, setConfirmDeleteRole] = React.useState(false);

    const addRoleForm = useForm({
        name: '',
        permissions: [],
    });

    const addPermissionForm = useForm({
        name: '',

    });


    const editRoleFunction = (role) => {
        setIsEditRole(true);
        addRoleForm.setData('id', role.id);
        addRoleForm.setData('name', role.name);
        addRoleForm.setData('permissions', role.permissions.map((p) => p.name));
        setOpenAddRoleModal(true);
    }

    const editPermissionFunction = (permission) => {
        setIsEditPermission(true);
        addPermissionForm.setData('id', permission.id);
        addPermissionForm.setData('name', permission.name);
        setOpenAddPermissionModal(true);
    }

    const addRole = (e) => {
        e.preventDefault();
        if (isEditRole) {
            addRoleForm.put(route('role.update', addRoleForm.data.id), {
                onSuccess: () => {
                    addRoleForm.reset();
                    setOpenAddRoleModal(false);
                },
                onError: () => {
                    setOpenAddRoleModal(true);
                }
            }
            );
        } else {
            addRoleForm.post(route('role.store'), {
                onSuccess: () => {
                    addRoleForm.reset();
                    setOpenAddRoleModal(false);
                },
                onError: () => {
                    setOpenAddRoleModal(true);
                }
            });

        }
    }

    const addPermission = (e) => {
        e.preventDefault();
        if (isEditPermission) {
            addPermissionForm.put(route('permission.update', addPermissionForm.data.id), {
                onSuccess: () => {
                    addPermissionForm.reset();
                    setOpenAddPermissionModal(false);
                },
                onError: () => {
                    setOpenAddPermissionModal(true);
                }
            });

        } else {
            addPermissionForm.post(route('permission.store'), {
                onSuccess: () => {
                    addPermissionForm.reset();
                    setOpenAddPermissionModal(false);
                },
                onError: () => {
                    setOpenAddPermissionModal(true);
                }
            });

        }

    }
    const deleteRoleForm = useForm({});
    const deletePermissionForm = useForm({});

    const deleteRole = (role) => {
        setConfirmDeleteRole(true);
        deleteRoleForm.setData('id', role.id);
        deleteRoleForm.setData('name', role.name);
    }

    const deleteRoleSubmit = () => {
        deleteRoleForm.delete(route('role.destroy', deleteRoleForm.data.id),{
            onSuccess: () => {
                setConfirmDeleteRole(false);
            },
            onError: () => {
                console.log('error', deleteRoleForm.errors);
            }
        });
    }

    const deletePermission = (permission) => {
        deletePermissionForm.setData('id', permission.id);
        deletePermissionForm.setData('name', permission.name);
        deletePermissionForm.delete(route('permission.destroy',permission.id),{
            onSuccess: () => {
                setShowPermissionModal(true);
            },
            onError: () => {
                console.log('error', deleteRoleForm.errors);
            }
        });
    }


    return (
        <SuperAdminDashboardLayout >
            <Head title="Role" />
            <ConfirmModal open={confirmDeleteRole} title={'Delete Role'} message={`Are you sure you want to delete ${deleteRoleForm.data.name} role?`} onConfirm={deleteRoleSubmit} onCancel={() => setConfirmDeleteRole(false)} />
            <Modal show={openAddRoleModal} onClose={() => setOpenAddRoleModal(false)} maxWidth='md:w-1/2' >
                <div className=' mx-10 my-5 '>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-mainColor font-bold text-straight my-6 md:my-10">
                            {isEditRole ? 'Edit' : 'Add'} Role
                        </h2>
                    </div>
                    <div>
                        <FormInput id='name' label='Role Name' type='text' placeholder='Role Name' value={addRoleForm.data.name} onChange={(e) => addRoleForm.setData('name', e.target.value)} error={addRoleForm.errors.name} />
                        <div className='my-5 p-5 grid grid-cols-3 '>
                            {
                                all_permissions.map((permission) => (
                                    <div key={permission.id} className='flex  items-center gap-x-2'>

                                        <input
                                            type="checkbox"
                                            value={permission.name}
                                            id={permission.name}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    addRoleForm.setData("permissions", [
                                                        ...addRoleForm.data.permissions,
                                                        e.target.value,
                                                    ]);
                                                } else {
                                                    addRoleForm.setData(
                                                        "permissions",
                                                        addRoleForm.data.permissions.filter((p) => p !== e.target.value)
                                                    );
                                                }
                                            }}
                                            checked={addRoleForm.data.permissions.includes(permission.name)}
                                        />
                                        <label htmlFor={permission.name}>{permission.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                        {addRoleForm.errors.permissions && <div className="text-red-500">{addRoleForm.errors.permissions}</div>}
                    </div>


                    <div className='flex justify-end items-center gap-x-2'>
                        <CancelButton onClick={() => { setOpenAddRoleModal(false); addRoleForm.reset(); }}>Cancel</CancelButton>
                        <SaveButton onClick={addRole}>Save</SaveButton>
                    </div>
                </div>
            </Modal>
            <CardContainer className='w-full '>
                <h1 className="text-3xl md:text-4xl font-mono text-mainColor font-bold text-center my-6 md:my-10">
                    Role
                </h1>

                <div className='my-5 mx-10 flex items-end justify-end gap-x-2'>
                    <AddButton onClick={() => setOpenAddRoleModal(true)}>Add</AddButton>
                    <button onClick={() => setShowPermissionModal(true)} className='flex items-center gap-x-1 justify-center h-10 bg-gray-400 text-white py-2 px-4 rounded-lg'><Icons name='view' /> Permissions </button>                </div>

                <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>ID</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Permissons</TableHeadCell>
                            <TableHeadCell>
                                <span className="sr-only">Edit</span>
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {roles.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell className="whitespace-nowrap py-4">
                                    {role.id}
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-4">
                                    {role.name}
                                </TableCell>
                                <TableCell className=" py-4 ">
                                    {role.permissions.map((permission) => permission.name).join(", ")}
                                </TableCell>

                                <TableCell className="whitespace-nowrap py-4">
                                    <button onClick={() => editRoleFunction(role)}><Icons name='edit' /></button>
                                    <button onClick={() => deleteRole(role)}><Icons name='delete' /></button>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>

                <div className='w-full border-b border-gray-400 my-10'>

                </div>

                <Modal show={showPermissionModal} onClose={() => setShowPermissionModal(false)} maxWidth='md:w-1/2' className='w-full' >
                    <h1 className="text-3xl md:text-4xl font-mono text-mainColor font-bold text-center my-6 md:my-10">
                        Permissions
                    </h1>

                    <div className='my-5 mx-10 flex items-end justify-end '>
                        <AddButton onClick={() => setOpenAddPermissionModal(true)}>Add</AddButton>
                    </div>
                    <div className='w-[90%] mb-5 mx-auto max-h-[50vh] overflow-auto'>
                        <Table hoverable >
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>ID</TableHeadCell>
                                    <TableHeadCell>Name</TableHeadCell>
                                    <TableHeadCell>
                                        <span className="sr-only">Edit</span>
                                    </TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {all_permissions.map((permission) => (
                                    <TableRow key={permission.id}>
                                        <TableCell className="whitespace-nowrap py-4">
                                            {permission.id}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap py-4">
                                            {permission.name}
                                        </TableCell>

                                        <TableCell className="whitespace-nowrap py-4">
                                            <button onClick={() => editPermissionFunction(permission)}><Icons name='edit' /></button>
                                            <button onClick={() => deletePermission(permission)}><Icons name='delete' /></button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>

                    </div>
                    <div className='flex justify-end mx-5 mb-5'>
                        <CancelButton onClick={() => setShowPermissionModal(false)}>Close</CancelButton>
                    </div>

                </Modal>

                {/* permission add or edit modal */}

                <Modal
                    show={openAddPermissionModal}
                    onClose={() => setOpenAddPermissionModal(false)}
                    maxWidth='md:w-1/3'
                    className='w-full'
                >
                    <div className='mx-10 my-5  overflow-y-auto'>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif text-mainColor font-bold text-straight my-6 md:my-10">
                                {isEditPermission ? 'Edit' : 'Add'} Permission
                            </h2>
                        </div>

                        <div>
                            <FormInput
                                id='name'
                                label='Permission Name'
                                type='text'
                                placeholder='Permission Name'
                                value={addPermissionForm.data.name}
                                onChange={(e) => addPermissionForm.setData('name', e.target.value)}
                                error={addPermissionForm.errors.name}
                            />
                        </div>

                        <div className='flex justify-end items-center gap-x-2 mt-6'>
                            <CancelButton
                                onClick={() => {
                                    setOpenAddPermissionModal(false);
                                    setShowPermissionModal(true)
                                    addPermission.reset();
                                }}
                            >
                                Cancel
                            </CancelButton>
                            <SaveButton onClick={addPermission}>Save</SaveButton>
                        </div>
                    </div>
                </Modal>


            </CardContainer>


        </SuperAdminDashboardLayout>
    );
}

export default Index;
