import React from "react";
import { Label, Textarea } from "flowbite-react";

const FormTextArea = ({ 
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
      <Textarea
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        rows={4}
        onChange={onChange}
        color={error ? "failure" : "gray"}
      />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default FormTextArea;
