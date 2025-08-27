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
import create_store from '@/Images/create_store.jpg'
const Create = ({store, allCountry, allState, allCity, defult_selected_country_id, defult_selected_state_id }) => {
    const createForm = useForm({
        id: store.id,
        name: store.name || '',
        shop_email: store.shop_email || '',
        shop_phone_number: store.shop_phone_number || '',
        gst_number: store.gst_number || '',
        pan_number:store.pan_number || '',
        registration_number:  store.registration_number || '',
        reg_upi_id:store.reg_upi_id || '',
        status: store.status || '',
        pincode: store.pincode || '',
        city: store.city || '',
        state:store.state ||  defult_selected_state_id,
        country: store.country || defult_selected_country_id,
        landmark:store.landmark || '',
        street_number: store.street_number || '',
        street_name:store.street_name || '',
    });

    const editShoreImageForm=useForm({
        logo:store.logo || '',
        shop_id: store.id,
    })


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
        createForm.put(route('stores.update', store.id));
    }


    const editLogochange = (e) => {
        const file = e.target.files[0];
        setFile(URL.createObjectURL(file));
        editShoreImageForm.setData('logo', file);
    }

    const saveChangeLogo = (e) => {
        e.preventDefault();
        editShoreImageForm.post(route("editShopeImage"));
    }

    return (
        <section className='flex items-center justify-center h-screen w-screen '>
            <Head title={'Create Shop'} />
                        <img src={create_store} className='absolute top-0 left-0 w-full h-full object-cover -z-10' />

            <CardContainer className='w-2/3 bg-white/95 dark:bg-gray-800/95'>
                <h1 className='text-2xl font-bold dark:text-white '>Edit Shop - {store.name}</h1>
                    <div className='border-b border-gray-300 mt-5'></div>
                <form onSubmit={submit}>
                    <div className='w-full p-5 flex items-center justify-center'>
                        <div className='w-1/2 p-5 '>
                            <div className='w-fit flex items-center justify-center dark:bg-slate-500  border-2 border-gray-300 hover:border-gray-400 hover:cursor-pointer ' onClick={() => document.getElementById('logo').click()}>
                                <img 
                                className='h-32' 
                                src={
                                    file 
                                    ? URL.createObjectURL(file) 
                                    : (store?.logo 
                                        ? '/storage/' + store.logo 
                                        : defultImgCDNs.defaultLogoCDN)
                                } 
                                alt="Shop Logo" 
                                />
                                {editShoreImageForm.errors.logo && <span className='text-xs text-red-600'>{editShoreImageForm.errors.logo}</span>}
                                <input type="file" name="logo" id="logo" hidden onChange={editLogochange} accept='image/*' />
                            </div>
                                                            <button type='button' className='mt-2 text-green-600' onClick={saveChangeLogo}>Change</button>

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
                        <SaveButton onClick={submit} >Update Shop </SaveButton>
                        <CancelButton as={Link} href={route('store.dashboard', createForm.data.id)}>Cancel</CancelButton>
                    </div>
                </form>
            </CardContainer>
        </section>
    );
}

export default Create;
