import React from 'react';
import { Button } from 'flowbite-react';
import { MdOutlineAddCircleOutline } from "react-icons/md";

const AddButton = ({children ,...props}) => {
    return (
       <Button color={"blue"} {...props} className='flex items-center gap-x-1'>
                <MdOutlineAddCircleOutline className='text-2xl' /> {children}
              </Button>
    );
}

export default AddButton;
