import React from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { Button } from 'flowbite-react';
const CancelButton = ({children ,...props}) => {
    return (
       <Button color={"red"} {...props} className='flex items-center gap-x-1'>
        <RxCrossCircled  className='text-2xl' /> {children}
       </Button>
    );
}

export default CancelButton;
