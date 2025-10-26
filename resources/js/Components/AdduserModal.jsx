import DashboardLayout from '@/Layouts/DashboardLayout.jsx';
import React, { use } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Modal from '@/Components/Modal';
import { RxCross2 } from "react-icons/rx";
import {
    Button,
    Checkbox,
    FileInput,
    Label,
    Radio,
    RangeSlider,
    Select,
    Textarea,
    TextInput,
    ToggleSwitch,
    HelperText,
    Tooltip,
    Avatar
} from "flowbite-react";

import { HiMail } from "react-icons/hi";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import axios, { all } from 'axios';
import { Link, useForm } from '@inertiajs/react';
import userData from '@/utils/defultUserData';
import { Modal as ReactModal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import userType from '@/utils/userType';
import SaveButton from '@/Components/SaveButton';
import CancelButton from '@/Components/CancelButton';
import CardContainer from '@/Components/CardContainer';
import Icons from '@/Components/Icons';
const AdduserModal = ( {open, setOpen, allCountry, defult_selected_country_id, allState, allCity, defult_selected_state_id, allRoles}) => {
    const [preview, setPreview] = React.useState(null);
    const [citys, setCitys] = React.useState(allCity);
    const createUserForm = useForm({
        ...userData, country: defult_selected_country_id, state: defult_selected_state_id, user_type: 3
    });
    const deleteUserForm = useForm({ user_id: null });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        createUserForm.setData('profile_image', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };


    const stateValueChange = (e) => {
        const stateId = e.target.value;

        const citys = axios.post(route('getCity'), {
            state_id: stateId
        }).then(res => {
            setCitys(res.data)
        })

    }


    const submit = (e) => {
        e.preventDefault();
        // console.log(createUserForm.data);
        createUserForm.post(route('users.store'), {
            // forceFormData: true,
            onSuccess: () => {
                createUserForm.reset();
                setOpen(false);
            },
            onError: () => {
                setOpen(true);
            }
        });
    }
    const closeAddUserModal = () => {
        createUserForm.reset();
        setOpen(false);
    }

    // console.log( userType);



    return (
        <Modal show={open} onClose={closeAddUserModal} maxWidth='md:w-2/3'>
            <section className='m-5 '>
                <div className=' flex items-center justify-between'>
                    <h2 className='text-2xl font-bold '>Add User</h2>
                    <RxCross2 className='text-2xl hover:scale-110 duration-200' onClick={closeAddUserModal} />
                </div>
                <div className='w-full border-b border-gray-400 my-2'></div>

                <div className='my-5 min-h-32 h-4/5 '>
                    <div className=' flex-1 overflow-y-auto h-full'>
                        <form onSubmit={submit} id='addUserForm'>
                            <div className='w-full flex'>
                                <div className='w-1/2 mr-2 '>
                                    <div className="flex  gap-2 my-2 mb-5">
                                        <div id="fileUpload" className="max-w-md">

                                            <input type='file' hidden id="file" accept="image/*" onChange={handleImageChange} />
                                            {/* <HelperText className="mt-1">A profile picture is useful to confirm your are logged into your account</HelperText> */}
                                        </div>
                                        <Tooltip content={`${preview ? 'Change Profile Picture' : 'Upload Profile Picture'}`}>
                                            <div className="mt-2 hover:cursor-pointer duration-200" onClick={() => document.getElementById('file').click()}>
                                                <img
                                                    src={preview || 'https://cdn.pixabay.com/photo/2017/11/10/05/46/user-2935524_960_720.png'}
                                                    alt="User Preview"
                                                    className="h-32 w-32 rounded-full object-cover border"
                                                />
                                            </div>
                                            <div>
                                                {createUserForm.errors.profile_image && <div className="text-red-500">{createUserForm.errors.profile_image}</div>}
                                            </div>
                                        </Tooltip>


                                    </div>
                                    <div className='w-full flex gap-x-2'>
                                        <div className="w-full">
                                            <div className="mb-2 block">
                                                <Label htmlFor="countries">Select your country</Label>
                                            </div>
                                            <Select id="countries" onChange={(e) => createUserForm.setData('country', e.target.value)} value={createUserForm.data.country} defaultValue={defult_selected_country_id}>
                                                {
                                                    allCountry.map((country) => (
                                                        <option key={country.id} value={country.id} > {country.name}</option>
                                                    ))
                                                }
                                            </Select>
                                            {createUserForm.errors.country && <div className="text-red-500">{createUserForm.errors.country}</div>}
                                        </div>
                                        <div className="w-full">
                                            <div className="mb-2 block">
                                                <Label htmlFor="street">Select State</Label>
                                            </div>
                                            <Select id="street" defaultValue={defult_selected_state_id} onChange={stateValueChange}>
                                                {
                                                    allState.map((state) => (
                                                        <option key={state.id} value={state.id} > {state.name}</option>
                                                    ))
                                                }
                                            </Select>
                                            {createUserForm.errors.state && <div className="text-red-500">{createUserForm.errors.state}</div>}
                                        </div>
                                        <div className="w-full">
                                            <div className="mb-2 block">
                                                <Label htmlFor="city">Select City</Label>
                                            </div>
                                            <Select id="city" value={createUserForm.data.city} onChange={(e) => createUserForm.setData('city', e.target.value)}>
                                                <option value="null" selected disabled>Select City</option>
                                                {
                                                    citys.map((city) => (
                                                        <option key={city.id} value={city.id} > {city.name}</option>
                                                    ))
                                                }
                                            </Select>
                                            {createUserForm.errors.city && <div className="text-red-500">{createUserForm.errors.city}</div>}
                                        </div>
                                    </div>

                                    <div className='w-full flex gap-x-2'>
                                        <div className='my-2 w-full'>
                                            <div className="mb-2 block">
                                                <Label htmlFor="pin_code">Pin Code</Label>
                                            </div>
                                            <TextInput id="pin_code" value={createUserForm.data.pincode} onChange={(e) => createUserForm.setData('pincode', e.target.value)} type="text" placeholder='Enter pin code' />
                                            {createUserForm.errors.pincode && <div className="text-red-500">{createUserForm.errors.pincode}</div>}
                                        </div>

                                        <div className='w-full flex gap-x-2'>
                                            <div className='my-2 w-full'>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="street_name">Land Mark {'(Optional)'}</Label>
                                                </div>
                                                <TextInput id="street_name" value={createUserForm.data.landmark} onChange={(e) => createUserForm.setData('landmark', e.target.value)} type="text" placeholder='Enter land mark' />
                                                {createUserForm.errors.landmark && <div className="text-red-500">{createUserForm.errors.landmark}</div>}
                                            </div>
                                        </div>


                                    </div>

                                    <div className='w-full  flex gap-x-5'>
                                        <div className='my-2 w-64'>
                                            <div className="mb-2 block">
                                                <Label htmlFor="street_number">House No.</Label>
                                            </div>
                                            <TextInput id="street_number" value={createUserForm.data.street_number} onChange={(e) => createUserForm.setData('street_number', e.target.value)} type="number" placeholder='Enter street number' />
                                            {createUserForm.errors.street_number && <div className="text-red-500">{createUserForm.errors.street_number}</div>}
                                        </div>
                                        <div className='my-2 w-full'>
                                            <div className="mb-2 block">
                                                <Label htmlFor="street_name">Street Name</Label>
                                            </div>
                                            <TextInput id="street_name" value={createUserForm.data.street_name} onChange={(e) => createUserForm.setData('street_name', e.target.value)} type="text" placeholder='Enter street name' />
                                            {createUserForm.errors.street_name && <div className="text-red-500">{createUserForm.errors.street_name}</div>}
                                        </div>
                                    </div>



                                </div>

                                <div className='w-1/2 mr-2 px-5 '>
                                    <div className='w-full  flex'></div>
                                    <div className='my-2 '>
                                        <div className="mb-2 block">
                                            <Label htmlFor="name">Name</Label>
                                        </div>
                                        <TextInput icon={FaCircleUser} id="name" type="text" placeholder='Enter your name' value={createUserForm.data.name} onChange={(e) => createUserForm.setData('name', e.target.value)} />
                                        {createUserForm.errors.name && <div className="text-red-500">{createUserForm.errors.name}</div>}
                                    </div>
                                    <div className='flex items-center justify-between gap-x-2'>
                                        <div className="w-36 my-2 ">
                                            <div className="mb-2 block">
                                                <Label htmlFor="user_type">Role</Label>
                                            </div>
                                            <Select id="user_type"  onChange={(e) => createUserForm.setData('user_type', e.target.value)}>
                                               {
                                                allRoles.map((role)=>(
                                                    <option key={role.id} value={role.name} > {role.name}</option>
                                                ))
                                               }
                                            </Select>
                                            {createUserForm.errors.user_type && <div className="text-red-500">{createUserForm.errors.user_type}</div>}
                                        </div>

                                        <div className='w-full '>
                                            <div className="mb-2 block">
                                                <Label htmlFor="email4">Email</Label>
                                            </div>
                                            <TextInput id="email4" type="email" icon={HiMail} placeholder="Enter your email" value={createUserForm.data.email} onChange={(e) => createUserForm.setData('email', e.target.value)} />
                                            {createUserForm.errors.email && <div className="text-red-500">{createUserForm.errors.email}</div>}

                                        </div>
                                    </div>
                                    <div className='my-2 '>
                                        <div className="mb-2 block">
                                            <Label htmlFor="phone">Your Phone Number</Label>
                                        </div>
                                        <TextInput id="phone" type="number" icon={FaPhoneSquareAlt} placeholder="Enter your Phone Number" value={createUserForm.data.phone_number} onChange={(e) => createUserForm.setData('phone_number', e.target.value)} />
                                    </div>
                                    {createUserForm.errors.phone_number && <div className="text-red-500">{createUserForm.errors.phone_number}</div>}
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <TextInput id="password" type="password" icon={TbLockPassword} placeholder="Enter password" value={createUserForm.data.password} onChange={(e) => createUserForm.setData('password', e.target.value)} />
                                        {createUserForm.errors.password && <div className="text-red-500">{createUserForm.errors.password}</div>}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="confirm-password">Confirm Password</Label>
                                        </div>
                                        <TextInput id="confirm-password" type="password" icon={TbLockPassword} placeholder="Enter confirm password" value={createUserForm.data.password_confirmation} onChange={(e) => createUserForm.setData('password_confirmation', e.target.value)} />
                                        {createUserForm.errors.password_confirmation && <div className="text-red-500">{createUserForm.errors.password_confirmation}</div>}
                                    </div>


                                </div>


                            </div>

                        </form>
                    </div>
                </div>
                <div className='w-full border-b border-gray-400 my-2 '></div>
                <div className='flex items-center justify-end gap-x-4 mx-5'>
                    {/* <Button color="green" onClick={submit}>Save</Button> */}
                    <SaveButton onClick={submit}>Save</SaveButton>
                    {/* <Button color="red" onClick={closeAddUserModal}>Cancel</Button> */}
                    <CancelButton onClick={closeAddUserModal}>Cancel</CancelButton>
                </div>
            </section>
        </Modal>
    );
}

export default AdduserModal;
