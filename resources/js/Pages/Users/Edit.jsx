import DashboardLayout from '@/Layouts/DashboardLayout';
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
    Tooltip
} from "flowbite-react";

import { HiMail } from "react-icons/hi";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import axios from 'axios';
import { Link, useForm, usePage, Head } from '@inertiajs/react';
import userData from '@/utils/defultUserData';
import { ToastContainer, toast } from "react-toastify";
import { GrUploadOption } from "react-icons/gr";

import SaveButton from '@/Components/SaveButton';
import CancelButton from '@/Components/CancelButton';



const Edit = ({ user, allCountry, defult_selected_country_id, allState, allCity, defult_selected_state_id }) => {
    const [preview, setPreview] = React.useState(user.profile_image ? '/storage/' + user.profile_image : 'https://cdn.pixabay.com/photo/2017/11/10/05/46/user-2935524_960_720.png');
    const [citys, setCitys] = React.useState(allCity);
    // console.log(user.profile_image);
    const stateValueChange = (e) => {
        const stateId = e.target.value;

        axios.post(route('getCity'), {
            state_id: stateId
        }).then(res => {
            setCitys(res.data)
        })

    }

    const editUserFrom = useForm({
        ...user,
        country: defult_selected_country_id,
        state: defult_selected_state_id,
        user_type: user.user_type || 3,
        profile_image: null
    });

    const addUserImageForm = useForm({
        profile_image: null,
        user_id: user.id
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        addUserImageForm.setData('profile_image', file);

        // Just preview, no upload yet
        setPreview(URL.createObjectURL(file));

        // handleupload();
    };

    // later, on submit button click:
    const handleupload = (e) => {
        e.preventDefault();
        addUserImageForm.post(route('user.profile.add'), {
            forceFormData: true
        });
    };


    const submit = (e) => {
        e.preventDefault();
        console.log(editUserFrom.data);
        editUserFrom.put(route('users.update', user.id));
    };

    return (
        <DashboardLayout>
            <Head title="Edit User" />
            <h1 className='text-2xl font-bold '>Edit Users</h1>
            <div className='mx-5 my-10 flex items-center justify-center '>

                <section className='m-5 bg-white p-5 w-full shadow-lg dark:bg-gray-800 rounded-lg'>


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
                                                <div className="relative mt-2 h-32 w-32">
                                                    {/* Image (clickable) */}
                                                    <div
                                                        className="h-32 w-32 hover:cursor-pointer duration-200 flex items-center justify-center"
                                                        onClick={() => document.getElementById('file').click()}
                                                    >
                                                        <img
                                                            src={
                                                                preview ||
                                                                "https://cdn.pixabay.com/photo/2017/11/10/05/46/user-2935524_960_720.png"
                                                            }
                                                            alt="User Preview"
                                                            className="h-32 w-32 rounded-full object-cover border"
                                                        />
                                                    </div>

                                                    {/* Upload button overlay */}
                                                    {addUserImageForm.data.profile_image && <button onClick={(e) => { e.preventDefault(); handleupload(e); }}><GrUploadOption className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-500 hover:text-green-700 hover:scale-110" /> </button>}
                                                </div>

                                                <div>
                                                    {addUserImageForm.errors.profile_image && <div className="text-red-500">{addUserImageForm.errors.profile_image}</div>}
                                                </div>
                                            </Tooltip>


                                        </div>
                                        <div className='w-full flex gap-x-2'>
                                            <div className="w-full">
                                                <div className="mb-2 block">
                                                    <Label htmlFor="countries">Select your country</Label>
                                                </div>
                                                <Select id="countries" onChange={(e) => editUserFrom.setData('country', e.target.value)} value={editUserFrom.data.country} defaultValue={defult_selected_country_id}>
                                                    {
                                                        allCountry.map((country) => (
                                                            <option key={country.id} value={country.id} > {country.name}</option>
                                                        ))
                                                    }
                                                </Select>
                                                {editUserFrom.errors.country && <div className="text-red-500">{editUserFrom.errors.country}</div>}
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
                                                {editUserFrom.errors.state && <div className="text-red-500">{editUserFrom.errors.state}</div>}
                                            </div>
                                            <div className="w-full">
                                                <div className="mb-2 block">
                                                    <Label htmlFor="city">Select City</Label>
                                                </div>
                                                <Select id="city" value={editUserFrom.data.city} onChange={(e) => editUserFrom.setData('city', e.target.value)}>
                                                    <option value="null" selected disabled>Select City</option>
                                                    {
                                                        citys.map((city) => (
                                                            <option key={city.id} value={city.id} > {city.name}</option>
                                                        ))
                                                    }
                                                </Select>
                                                {editUserFrom.errors.city && <div className="text-red-500">{editUserFrom.errors.city}</div>}
                                            </div>
                                        </div>

                                        <div className='w-full flex gap-x-2'>
                                            <div className='my-2 w-full'>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="pin_code">Pin Code</Label>
                                                </div>
                                                <TextInput id="pin_code" value={editUserFrom.data.pincode} onChange={(e) => editUserFrom.setData('pincode', e.target.value)} type="text" placeholder='Enter pin code' />
                                                {editUserFrom.errors.pincode && <div className="text-red-500">{editUserFrom.errors.pincode}</div>}
                                            </div>

                                            <div className='w-full flex gap-x-2'>
                                                <div className='my-2 w-full'>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="street_name">Land Mark {'(Optional)'}</Label>
                                                    </div>
                                                    <TextInput id="street_name" value={editUserFrom.data.landmark} onChange={(e) => editUserFrom.setData('landmark', e.target.value)} type="text" placeholder='Enter land mark' />
                                                    {editUserFrom.errors.landmark && <div className="text-red-500">{editUserFrom.errors.landmark}</div>}
                                                </div>
                                            </div>


                                        </div>

                                        <div className='w-full  flex gap-x-5'>
                                            <div className='my-2 w-64'>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="street_number">House No.</Label>
                                                </div>
                                                <TextInput id="street_number" value={editUserFrom.data.street_number} onChange={(e) => editUserFrom.setData('street_number', e.target.value)} type="number" placeholder='Enter street number' />
                                                {editUserFrom.errors.street_number && <div className="text-red-500">{editUserFrom.errors.street_number}</div>}
                                            </div>
                                            <div className='my-2 w-full'>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="street_name">Street Name</Label>
                                                </div>
                                                <TextInput id="street_name" value={editUserFrom.data.street_name} onChange={(e) => editUserFrom.setData('street_name', e.target.value)} type="text" placeholder='Enter street name' />
                                                {editUserFrom.errors.street_name && <div className="text-red-500">{editUserFrom.errors.street_name}</div>}
                                            </div>
                                        </div>



                                    </div>

                                    <div className='w-1/2 mr-2 px-5 '>
                                        <div className='w-full  flex'></div>
                                        <div className='my-2 '>
                                            <div className="mb-2 block">
                                                <Label htmlFor="name">Name</Label>
                                            </div>
                                            <TextInput icon={FaCircleUser} id="name" type="text" placeholder='Enter your name' value={editUserFrom.data.name} onChange={(e) => editUserFrom.setData('name', e.target.value)} />
                                            {editUserFrom.errors.name && <div className="text-red-500">{editUserFrom.errors.name}</div>}
                                        </div>
                                        <div className='flex items-center justify-between gap-x-2'>
                                            <div className="w-36 my-2 ">
                                                <div className="mb-2 block">
                                                    <Label htmlFor="user_type">User Type</Label>
                                                </div>
                                                <Select id="user_type" defaultValue={3} value={editUserFrom.data.user_type} onChange={(e) => editUserFrom.setData('user_type', e.target.value)}>
                                                    {/* <option value="0" > Admin</option> */}
                                                    <option value="1" > User</option>
                                                    <option value="2" > Manager</option>
                                                    <option value="3" > Customer </option>
                                                </Select>
                                                {editUserFrom.errors.user_type && <div className="text-red-500">{editUserFrom.errors.user_type}</div>}
                                            </div>

                                            <div className='w-full '>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="email4">Email</Label>
                                                </div>
                                                <TextInput id="email4" type="email" icon={HiMail} placeholder="Enter your email" value={editUserFrom.data.email} onChange={(e) => editUserFrom.setData('email', e.target.value)} />
                                                {editUserFrom.errors.email && <div className="text-red-500">{editUserFrom.errors.email}</div>}

                                            </div>
                                        </div>
                                        <div className='my-2 '>
                                            <div className="mb-2 block">
                                                <Label htmlFor="phone">Your Phone Number</Label>
                                            </div>
                                            <TextInput id="phone" type="number" icon={FaPhoneSquareAlt} placeholder="Enter your Phone Number" value={editUserFrom.data.phone_number} onChange={(e) => editUserFrom.setData('phone_number', e.target.value)} />
                                        </div>
                                        {editUserFrom.errors.phone_number && <div className="text-red-500">{editUserFrom.errors.phone_number}</div>}
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="password">Password</Label>
                                            </div>
                                            <TextInput id="password" type="password" icon={TbLockPassword} placeholder="Enter password" value={editUserFrom.data.password} onChange={(e) => editUserFrom.setData('password', e.target.value)} autofill={false} />
                                            {editUserFrom.errors.password && <div className="text-red-500">{editUserFrom.errors.password}</div>}
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                            </div>
                                            <TextInput id="confirm-password" type="password" icon={TbLockPassword} placeholder="Enter confirm password" value={editUserFrom.data.password_confirmation} onChange={(e) => editUserFrom.setData('password_confirmation', e.target.value)} />
                                            {editUserFrom.errors.password_confirmation && <div className="text-red-500">{editUserFrom.errors.password_confirmation}</div>}
                                        </div>


                                    </div>


                                </div>

                            </form>
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-x-4 mx-5'>
                        {/* <Button color="green" onClick={submit}>Save</Button> */}
                        <SaveButton onClick={submit}>Save</SaveButton>
                        {/* <Button color="red" as={Link} href={route('users.index')}>Cancel</Button> */}
                        <CancelButton as={Link} href={route('users.index')}>Cancel</CancelButton>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}

export default Edit;
