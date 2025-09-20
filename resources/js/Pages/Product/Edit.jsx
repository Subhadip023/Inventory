import DashboardLayout from '@/Layouts/DashboardLayout';
import React, { useEffect } from 'react';
import { Button, Label, TextInput, Textarea, Card } from 'flowbite-react';
import { useForm } from '@inertiajs/react';
import SaveButton from '@/Components/SaveButton';

const Edit = ({product}) => {
    const {data,setData,put,processing,errors}=useForm({
        id:product.id,
        name : product.name,
        description : product.description,
        sku :   product.sku,
        price : product.price,
        quantity : product.quantity,
    });

    useEffect(() => {
        if (data.name!='') {
            setData('sku',data.name.replace(/\s/g, '-').toLowerCase() + '-' + Date.now());

        }
    }, [data.name]);

    const submit = (e) => {
        e.preventDefault();
        // console.log(data);
        put(route('products.update',product.id));
    }
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-6">
        <Card className="shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Update {product.name}</h2>
          <form className="flex flex-col gap-4" onSubmit={submit}>
            {/* Product Name */}
            <div>
              <Label htmlFor="name" value="Product Name" />
              <TextInput id="name" 
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              type="text" placeholder="Enter product name" required />
              <div className="text-red-600">{errors.name}</div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" value="Description" />
              <Textarea id="description" placeholder="Write a short description..." required rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} />
              <div className="text-red-600">{errors.description}</div>
            </div>

            {/* SKU */}
            <div>
              <Label htmlFor="sku" value="SKU" />
              <TextInput id="sku" type="text" placeholder="Unique product code" required value={data.sku} onChange={(e) => setData('sku', e.target.value)} disabled/>
              <div className="text-red-600">{errors.sku}</div>
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" value="Price" />
              <TextInput id="price" type="number" step="0.01" placeholder="0.00" required  value={data.price} onChange={(e) => setData('price', e.target.value)}/>
                <div className='text-red-600'>{errors.price}</div>
            </div>

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity" value="Quantity" />
              <TextInput id="quantity" type="number" placeholder="Enter stock quantity" required value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} />
              <div className="text-red-600">{errors.quantity}</div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              {/* <Button color={'green'} type="submit" disabled={processing}>{processing?'Updating...':'Update Product'}</Button> */}
              <SaveButton color={'green'} type="submit" disabled={processing}>{processing?'Updating...':'Update Product'}</SaveButton>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Edit;
