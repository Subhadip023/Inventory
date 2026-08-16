import FormInput from '@/Components/Form/FormInput';
import FormSelect from '@/Components/Form/FormSelect';
import React, { useEffect, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineCloudUpload, HiOutlineArrowLeft } from 'react-icons/hi';

const Create = ({ allCountry, allState, allCity, defult_selected_country_id, defult_selected_state_id }) => {
    const createForm = useForm({
        name: '',
        type: 1,
        shop_email: '',
        shop_phone_number: '',
        gst_number: '',
        pan_number: '',
        registration_number: '',
        registration_certificate: '',
        reg_upi_id: '',
        category_id: null,
        logo: null,
        status: '',
        pincode: '',
        country: defult_selected_country_id || '',
        state: defult_selected_state_id || '',
        city: '',
        landmark: '',
        street_number: '',
        street_name: '',
    });

    const { flash } = usePage().props;
    const [citys, setCitys] = useState(allCity || []);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
        if (flash?.warning) toast.warning(flash.warning);
        if (flash?.info) toast.info(flash.info);
    }, [flash]);

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            createForm.setData('logo', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const stateValueChange = (e) => {
        const stateId = e.target.value;
        createForm.setData('state', stateId);
        axios.post(route('getCity'), { state_id: stateId })
            .then(res => {
                setCitys(res.data);
            })
            .catch(err => console.error(err));
    };

    const submit = (e) => {
        e.preventDefault();
        createForm.post(route('shops.store'));
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <Head title="Create Shop" />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create New Shop</h1>
                        <p className="text-sm text-gray-500 mt-1">Set up your store details, tax info, and business address.</p>
                    </div>
                    <Link
                        href={route('home')}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-mainColor transition-colors self-start sm:self-auto"
                    >
                        <HiOutlineArrowLeft className="w-4 h-4" />
                        Cancel & Return
                    </Link>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8">
                    <form onSubmit={submit} className="space-y-8">
                        
                        {/* 1. General Info & Logo */}
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-4 pb-2 border-b border-gray-100">
                                1. Shop Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Logo Upload Dropzone */}
                                <div className="md:col-span-1 flex flex-col items-center">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 w-full text-left">
                                        Shop Logo
                                    </label>
                                    <div
                                        className="w-full h-44 border-2 border-dashed border-gray-300 hover:border-mainColor rounded-xl flex flex-col items-center justify-center p-4 bg-gray-50/50 hover:bg-gray-50 transition cursor-pointer relative overflow-hidden group"
                                        onClick={() => document.getElementById('logo-upload').click()}
                                    >
                                        {previewUrl ? (
                                            <>
                                                <img
                                                    src={previewUrl}
                                                    alt="Shop Logo Preview"
                                                    className="w-full h-full object-contain"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-xs text-white font-medium bg-black/50 px-2 py-1 rounded">Change Logo</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-10 h-10 rounded-full bg-mainColor/10 text-mainColor flex items-center justify-center mb-2">
                                                    <HiOutlineCloudUpload className="w-6 h-6" />
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 group-hover:text-mainColor">Upload Logo</span>
                                                <span className="text-[11px] text-gray-400 mt-0.5">PNG, JPG up to 2MB</span>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            id="logo-upload"
                                            hidden
                                            onChange={handleLogoChange}
                                            accept="image/*"
                                        />
                                    </div>
                                    {createForm.errors.logo && (
                                        <span className="text-xs text-red-500 mt-1.5 text-left w-full">{createForm.errors.logo}</span>
                                    )}
                                </div>

                                {/* Basic Fields */}
                                <div className="md:col-span-2 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormInput
                                            id="name"
                                            label="Shop Name *"
                                            type="text"
                                            placeholder="e.g. Apollo Pharmacy / City Meds"
                                            value={createForm.data.name}
                                            onChange={(e) => createForm.setData('name', e.target.value)}
                                            error={createForm.errors.name}
                                        />
                                        <FormSelect
                                            id="type"
                                            name="type"
                                            label="Shop Type *"
                                            options={[
                                                { id: 1, name: 'Retail' },
                                                { id: 2, name: 'Wholesale' },
                                            ]}
                                            value={createForm.data.type}
                                            onChange={(e) => createForm.setData('type', e.target.value)}
                                            error={createForm.errors.type}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormInput
                                            id="shop_email"
                                            label="Shop Email"
                                            type="email"
                                            placeholder="contact@shop.com"
                                            value={createForm.data.shop_email}
                                            onChange={(e) => createForm.setData('shop_email', e.target.value)}
                                            error={createForm.errors.shop_email}
                                        />
                                        <FormInput
                                            id="shop_phone_number"
                                            label="Phone Number *"
                                            type="text"
                                            placeholder="+91 9876543210"
                                            value={createForm.data.shop_phone_number}
                                            onChange={(e) => createForm.setData('shop_phone_number', e.target.value)}
                                            error={createForm.errors.shop_phone_number}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Business & Tax Details */}
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-4 pb-2 border-b border-gray-100">
                                2. Business & Tax Details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormInput
                                    id="gst_number"
                                    label="GST Number"
                                    type="text"
                                    placeholder="22AAAAA0000A1Z5"
                                    value={createForm.data.gst_number}
                                    onChange={(e) => createForm.setData('gst_number', e.target.value)}
                                    error={createForm.errors.gst_number}
                                />
                                <FormInput
                                    id="pan_number"
                                    label="PAN Number"
                                    type="text"
                                    placeholder="ABCDE1234F"
                                    value={createForm.data.pan_number}
                                    onChange={(e) => createForm.setData('pan_number', e.target.value)}
                                    error={createForm.errors.pan_number}
                                />
                            </div>
                        </div>

                        {/* 3. Address Details */}
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-4 pb-2 border-b border-gray-100">
                                3. Store Location
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <FormSelect
                                    id="country"
                                    name="country"
                                    label="Country"
                                    options={allCountry}
                                    value={createForm.data.country}
                                    onChange={(e) => createForm.setData('country', e.target.value)}
                                    error={createForm.errors.country}
                                />
                                <FormSelect
                                    id="state"
                                    name="state"
                                    label="State"
                                    options={allState}
                                    value={createForm.data.state}
                                    onChange={stateValueChange}
                                    error={createForm.errors.state}
                                />
                                <FormSelect
                                    id="city"
                                    name="city"
                                    label="City"
                                    options={citys}
                                    value={createForm.data.city}
                                    onChange={(e) => createForm.setData('city', e.target.value)}
                                    error={createForm.errors.city}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <FormInput
                                    id="pincode"
                                    label="Pincode"
                                    type="text"
                                    placeholder="700001"
                                    value={createForm.data.pincode}
                                    onChange={(e) => createForm.setData('pincode', e.target.value)}
                                    error={createForm.errors.pincode}
                                />
                                <FormInput
                                    id="street_number"
                                    label="Building / Unit No."
                                    type="text"
                                    placeholder="Shop #12, Ground Floor"
                                    value={createForm.data.street_number}
                                    onChange={(e) => createForm.setData('street_number', e.target.value)}
                                    error={createForm.errors.street_number}
                                />
                                <FormInput
                                    id="landmark"
                                    label="Landmark"
                                    type="text"
                                    placeholder="Near City Hospital"
                                    value={createForm.data.landmark}
                                    onChange={(e) => createForm.setData('landmark', e.target.value)}
                                    error={createForm.errors.landmark}
                                />
                            </div>

                            <div className="mt-4">
                                <FormInput
                                    id="street_name"
                                    label="Street / Area Name"
                                    type="text"
                                    placeholder="Main Road, Park Avenue"
                                    value={createForm.data.street_name}
                                    onChange={(e) => createForm.setData('street_name', e.target.value)}
                                    error={createForm.errors.street_name}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                            <Link
                                href={route('home')}
                                className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={createForm.processing}
                                className="px-6 py-2.5 rounded-lg bg-mainColor hover:opacity-95 active:scale-[0.99] text-white text-sm font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {createForm.processing ? 'Creating Shop...' : 'Create Shop'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;