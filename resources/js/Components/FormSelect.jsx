import React from "react";
import { Label, Select } from "flowbite-react";

const FormSelect = ({ 
  id, 
  label, 
  options = [], 
  value, 
  onChange, 
  error, 
  defaultValue,
  width='w-full' 
}) => {
  
  return (
    <div className={`my-2 ${width}`}>
      <div className="mb-2 block">
        <Label htmlFor={id}>{label}</Label>
      </div>
      <Select id={id} value={value} defaultValue={defaultValue} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </Select>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default FormSelect;
