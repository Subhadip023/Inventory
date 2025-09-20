import React from 'react';
import { MdCheckCircleOutline } from "react-icons/md";
import { Button } from 'flowbite-react';
const SaveButton = ({children ,...props}) => {
    return (
       <Button color={"green"} {...props} className='flex items-center gap-x-1'>
        <MdCheckCircleOutline className='text-2xl' /> {children}
       </Button>
    );
}

export default SaveButton;
