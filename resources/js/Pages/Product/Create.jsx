import DashboardLayout from '@/Layouts/DashboardLayout';
import React, { useEffect } from 'react';
import { Button, Label, TextInput, Textarea, Card } from 'flowbite-react';
import { useForm } from '@inertiajs/react';
import SaveButton from '@/Components/SaveButton';

const Create = () => {
    const {data,setData,post,processing,errors}=useForm({
        name : '',
        description : '',
        sku : '',
        price : '',
        quantity : '',
    });

    useEffect(() => {
        if (data.name!='') {
            setData('sku',data.name.trim().replace(/\s/g, '-').toLowerCase() + '-' + Date.now());

        }
    }, [data.name]);

    const submit = (e) => {
        e.preventDefault();
        // console.log(data);
    
        post(route('products.store'));
    }
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-6">
        <Card className="shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
          <form className="flex flex-col gap-4" onSubmit={submit}>
            {/* Product Name */}
            <div>
              <Label htmlFor="name" value="Product Name" >Product Name </Label>
              <TextInput id="name" 
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              type="text" placeholder="Enter product name"   />
              <div className="text-red-600">{errors.name}</div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" value="Description" >Description</Label>
              <Textarea id="description" placeholder="Write a short description..."   rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} />
              <div className="text-red-600">{errors.description}</div>
            </div>

            {/* SKU */}
            <div>
              <Label htmlFor="sku" value="SKU" >SKU</Label>
              <TextInput id="sku" type="text" placeholder="Unique product code"   value={data.sku} onChange={(e) => setData('sku', e.target.value)} disabled/>
              <div className="text-red-600">{errors.sku}</div>
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" value="Price" >Price per unit</Label>
              <TextInput id="price" type="number" step="0.01" placeholder="0.00"    value={data.price} onChange={(e) => setData('price', e.target.value)}/>
                <div className='text-red-600'>{errors.price}</div>
            </div>

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity" value="Quantity" >Quantity</Label>
              <TextInput id="quantity" type="number" placeholder="Enter stock quantity"   value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} />
              <div className="text-red-600">{errors.quantity}</div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              {/* <Button color={'green'} type="submit" disabled={processing}>{processing?'Adding...':'Add Product'}</Button> */}
              <SaveButton color={'green'} type="submit" disabled={processing}>{processing?'Adding...':'Add Product'}</SaveButton>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Create;
