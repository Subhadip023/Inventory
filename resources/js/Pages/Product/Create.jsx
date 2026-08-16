import DashboardLayout from '@/Layouts/DashboardLayout';
import React, { useEffect } from 'react';
import { Button, Label, TextInput, Textarea, Card } from 'flowbite-react';
import { useForm } from '@inertiajs/react';
import SaveButton from '@/Components/Buttons/SaveButton';
import AsyncCreatableSelect from 'react-select/async-creatable';
import axios from 'axios';
const Create = () => {
    const {data,setData,post,processing,errors}=useForm({
        universal_product : null,
        sku : '',
        price : '',
        quantity : 1,
        description : '',
    });
    useEffect(() => {
      if (!data.universal_product?.label || data.sku) return;

      setData(
        'sku',
        `${data.universal_product.label
          .trim()
          .replace(/\s+/g, '-')
          .toLowerCase()}`
      );
    }, [data.universal_product]);


    const submit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    }

    const loadUniversalProduct = (inputValue, callback) => {
      if (!inputValue) {
        callback([]);
        return;
      }

      axios
        .post(route('products.search'), {
          search: inputValue,
        })
        .then((res) => {
          const options = res.data.data.map((product) => ({
            value: product.id,
            label: product.name + (product.description ? ' - ' + product.description : ''),
          }));

          callback(options);
        })
        .catch(() => {
          callback([]);
        });
    };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-6">
        <Card className="shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
          <form className="flex flex-col gap-4" onSubmit={submit}>
            {/* Product Name */}
            <div>
              <Label htmlFor="name" value="Product Name" >Product Name </Label>
              <AsyncCreatableSelect
                loadOptions={loadUniversalProduct}
                isClearable
                onChange={(option) =>
                  setData('universal_product', option ?? null)
                }
                value={data.universal_product}
                placeholder="Search for a product or type to create new..."
                formatCreateLabel={(inputValue) => `Create new product: "${inputValue}"`}
              />

              <div className="text-red-600">{errors.universal_product}</div>
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
              <TextInput id="quantity" type="number" placeholder="Enter stock quantity" value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} />
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
