"use client";
import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Select from "react-select";
import { TextInput, Button } from "flowbite-react";
import { useForm } from "@inertiajs/react";
const Create = ({ products, customers }) => {
  // order items
  // const [items, setItems] = useState([{ product: null, quantity: 1 }]);
  const [tax, setTax] = useState(12);
  const orderForm = useForm({
    customer_id: null,
    tax: tax,
    items: [{ product: null, quantity: 1 }],
    discount: 0,
  });

  const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); //pr event accidental form submit if inside <form>
    handleAddItem();        // call your button logic
  }
};



  // original product options (don't mutate)  
  const coustomerOptions = [
    { label: "Guest", value: null },

    ...customers.map((customer) => ({
      label: customer.name,
      value: customer.id,
    })),
  ];


  const productOptions = products.map((product) => ({
    label: product.name,
    value: product.id,
    price: product.price,
    stock: product.quantity,
  }));

  // handle product change
  const handleProductChange = (index, selectedProduct) => {
    const newItems = [...orderForm.data.items];
    newItems[index].product = selectedProduct;
    orderForm.setData('items',newItems);
  };

  // handle quantity change
  const handleQuantityChange = (index, value) => {
    const newItems = [...orderForm.data.items];
    newItems[index].quantity = Number(value);
    orderForm.setData('items',newItems);
  };

  // add a new row
  const handleAddItem = () => {
    orderForm.setData("items", ([...orderForm.data.items, { product: null, quantity: 1 }]));
  };

  // remove a row
  const handleRemoveItem = (index) => {
    orderForm.setData("items", (orderForm.data.items.filter((_, i) => i !== index)));
  };

  // compute grand total
  const grandTotal = orderForm.data.items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  // filter out already selected products
  const getAvailableOptions = (index) => {
    const selectedValues = orderForm.data.items
      .map((item) => item.product?.value)
      .filter(Boolean);
    return productOptions.filter(
      (p) => !selectedValues.includes(p.value) || p.value === orderForm.data.items[index].product?.value
    );
  };


  const saveOrder = () => {
    // console.log(orderForm.data);
    orderForm.post(route("orders.store"));
  };

  return (
    <DashboardLayout head={"Dashboard | Create Order"}>
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-semibold my-4 mx-10">Create Order</h2>

      </div>
      <div className="flex items-center justify-between ">
        <div className="mx-10 my-6 w-72">Customer <Select 
            value={coustomerOptions.find(opt => opt.value === orderForm.data.customer_id) || null}
            placeholder="Search & select customer..." 
        options={coustomerOptions} onChange={(c) => orderForm.setData("customer_id", c.value)} /> </div>
        <div className=" font-semibold text-lg">
          Total Amount: {((grandTotal + (grandTotal * tax) / 100) - (grandTotal * orderForm.data.discount)/100).toFixed(2)} Rs
        </div>
      </div>

      <div className="mx-10 my-6 space-y-6">
        {orderForm.data.items.map((item, index) => {
          const rate = item.product?.price || 0;
          const total = rate * item.quantity;

          return (
            <div
              key={index}
              className="flex flex-wrap items-end gap-6 border-b pb-4"
            >
              {/* Product Select */}
              <div className="w-80">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Select Product
                </label>
                <Select
                  options={getAvailableOptions(index)}
                  value={item.product}
                  onChange={(p) => handleProductChange(index, p)}
                  placeholder="Search & select product..."
                  className="text-sm"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Quantity */}
              <div className="w-32">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Quantity (max {item.product?.stock || 0})
                </label>
                <TextInput
                  type="number"
                  value={item.quantity}
                  min="1"
                  onKeyDown={handleKeyDown}
                  max={item.product?.stock || 0}
                  onChange={(e) =>
                    handleQuantityChange(index, e.target.value)
                  }
                />
              </div>

              {/* Rate */}
              <div className="w-32">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Rate
                </label>
                <p className="py-2">{rate}</p>
              </div>

              {/* Total */}
              <div className="w-32">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Total
                </label>
                <p className="py-2">{total}</p>
              </div>

              {/* Remove */}
              {orderForm.data.items.length > 1 && (
                <Button
                  color="failure"
                  size="xs"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </Button>
              )}

            </div>
          );
        })}

        <div className="flex items-center justify-start gap-x-5"> {/* Add Product */}
          {getAvailableOptions(0).length > 1 && <Button color="blue" onClick={handleAddItem}>
            + Add Product
          </Button>}
          {grandTotal > 0 && <Button onClick={saveOrder} color="green">Save
          </Button>}</div>



        <div className="flex items-center justify-start gap-x-3">
          <div className="w-16">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Tax (%)
          </label>
          <TextInput
            type="number"
            value={tax}

            onChange={(e) =>
              setTax(e.target.value)
            }
          />
          </div>

          <div className="w-32">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            discount (%)
          </label>
          <TextInput
            type="number"
            value={orderForm.data.discount}
            min={0}
            max={90}
            onChange={(e) =>
              orderForm.setData("discount", e.target.value)
            }
          />
          </div>



        </div>



      </div>
    </DashboardLayout>
  );
};

export default Create;
