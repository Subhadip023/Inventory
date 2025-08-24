import CardContainer from '@/Components/CardContainer';
import FormInput from '@/Components/FormInput';
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import storeImage from '@/Images/store.png'
import defultImgCDNs from '@/utils/defultImgCDNs';
import FormSelect from '@/Components/FormSelect';
import { all } from 'axios';
import axios from 'axios';
import SaveButton from '@/Components/SaveButton';
import CancelButton from '@/Components/CancelButton';
import {Link} from '@inertiajs/react';

const Create = ({ allCountry, allState, allCity, defult_selected_country_id, defult_selected_state_id }) => {
    const createForm = useForm({
        name: '',
        shop_email: '',
        shop_phone_number: '',
        gst_number: '',
        pan_number: '',
        registration_number: '',
        registration_certificate: '',
        reg_upi_id: '',
        logo: '',
        status: '',
        pincode: '',
        city: defult_selected_country_id,
        state: defult_selected_state_id,
        country: '',
        landmark: '',
        street_number: '',
        street_name: '',
    });


    const [file, setFile] = React.useState(null);
    const [citys, setCitys] = React.useState(allCity);

    const stateValueChange = (e) => {
        const stateId = e.target.value;
        createForm.setData('state', stateId);
        axios.post(route('getCity'), {
            state_id: stateId
        }).then(res => {
            setCitys(res.data)
        })

    }

    const submit = (e) => {
        e.preventDefault();
        createForm.post(route('stores.store'));
    }

    return (
        <section className='flex items-center justify-center h-screen w-screen bg-mainColor'>
            <Head title={'Create Shop'} />
            <CardContainer className='w-2/3'>
                <h1 className='text-2xl font-bold '>Create Shop</h1>
                    <div className='border-b border-gray-300 mt-5'></div>
                <form onSubmit={submit}>
                    <div className='w-full p-5 flex items-center justify-center'>
                        <div className='w-1/2 p-5 '>
                            <div className='w-fit flex items-center justify-center  border-2 border-gray-300 hover:border-gray-400 hover:cursor-pointer ' onClick={() => document.getElementById('logo').click()}>
                                <img className='h-32' src={createForm.data.logo ? URL.createObjectURL(createForm.data.logo) : defultImgCDNs.defaultLogoCDN} alt="" />
                                <input type="file" name="logo" id="logo" hidden onChange={(e) => createForm.setData('logo', e.target.files[0])} accept='image/*' />
                            </div>
                            <div className='my-2 flex items-center gap-x-2 '>

                                <FormSelect id='country' name='country' label='Country' options={allCountry} value={createForm.data.country} onChange={(e) => createForm.setData('country', e.target.value)} error={createForm.errors.country} defaultValue={defult_selected_country_id} />
                                <FormSelect id='state' name='state' label='State' options={allState} value={createForm.data.state} onChange={stateValueChange} error={createForm.errors.state} defaultValue={defult_selected_state_id} />
                                <FormSelect id='city' name='city' label='City' options={citys} value={createForm.data.city} onChange={(e) => createForm.setData('city', e.target.value)} error={createForm.errors.city} />

                            </div>

                            <div className='my-2 flex items-center gap-x-2 '>
                                <FormInput id={'pincode'} label='Pincode' type='number' placeholder='Enter Pincode' value={createForm.data.pincode} onChange={(e) => createForm.setData('pincode', e.target.value)} error={createForm.errors.pincode} widht='w-1/3' />
                                <FormInput id={'landmark'} label='Landmark' type='text' placeholder='Enter Landmark' value={createForm.data.landmark} onChange={(e) => createForm.setData('landmark', e.target.value)} error={createForm.errors.landmark} widht='w-2/3' />
                            </div>
                            <div className='my-2 flex items-center gap-x-2 '>
                                <FormInput id={'street_number'} label={'House Number'} type='number' placeholder='Enter House Number' value={createForm.data.street_number} onChange={(e) => createForm.setData('street_number', e.target.value)} error={createForm.errors.street_number} widht='w-1/3' />
                                <FormInput id={'street_name'} label={'Enter Street Name'} type='text' placeholder='Enter Street Name' value={createForm.data.street_name} onChange={(e) => createForm.setData('street_name', e.target.value)} error={createForm.errors.street_name} widht='w-2/3' />
                            </div>


                        </div>
                        <div className='w-1/2 p-5 '>
                            <FormInput id='name' label='Name' type='text' placeholder='Enter Shop Name' value={createForm.data.name} onChange={(e) => createForm.setData('name', e.target.value)} error={createForm.errors.name} />
                            <FormInput id='email' label='Email' type='email' placeholder='Enter Shop Email' error={createForm.errors.shop_email} value={createForm.data.shop_email} onChange={(e) => createForm.setData('shop_email', e.target.value)} />
                            <FormInput id='phone_number' label='Phone Number' type='number' placeholder='Enter Shop Phone Number' error={createForm.errors.shop_phone_number} value={createForm.data.shop_phone_number} onChange={(e) => createForm.setData('shop_phone_number', e.target.value)} />
                            <FormInput id='gst_number' label='GST Number' type='text' placeholder='Enter GST Number' error={createForm.errors.gst_number} value={createForm.data.gst_number} onChange={(e) => createForm.setData('gst_number', e.target.value)} />
                            <FormInput id='pan_number' label='PAN Number' type='text' placeholder='Enter PAN Number' error={createForm.errors.pan_number} value={createForm.data.pan_number} onChange={(e) => createForm.setData('pan_number', e.target.value)} />
                        </div>
                    </div>

                    <div className='border-b border-gray-300 mb-5'></div>
                    <div className='flex justify-end w-full px-10 gap-x-2'>
                        <SaveButton onClick={submit} >Create Shop </SaveButton>
                        <CancelButton as={Link} href={route('home')}>Cancel</CancelButton>
                    </div>
                </form>
            </CardContainer>
        </section>
    );
}

export default Create;
