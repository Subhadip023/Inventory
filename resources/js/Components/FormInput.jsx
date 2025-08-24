import React from "react";
import { Label, TextInput } from "flowbite-react";

const FormInput = ({ 
  id, 
  label, 
  type = "text", 
  placeholder = "", 
  value, 
  onChange, 
  error,
  widht='w-full'
}) => {
  return (
    <div className={`my-2 ${widht}`}>
      <div className="mb-2 block">
        <Label htmlFor={id}>{label}</Label>
      </div>
      <TextInput
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default FormInput;
