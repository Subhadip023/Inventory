import React from 'react';
import {FaRegEdit} from "react-icons/fa";
import {RiDeleteBin6Line} from "react-icons/ri";
import {GrView} from "react-icons/gr";
import {Tooltip} from "flowbite-react";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";


const Icons = ({name=""}) => {

    switch (name) {
        case "edit":
            return <Tooltip content="Edit"> <FaRegEdit className='text-blue-600 text-xl hover:scale-110 duration-200 ease-in-out'/> </Tooltip>;
        case "delete":
            return <Tooltip content="Delete"> <RiDeleteBin6Line className='text-red-600 text-xl hover:scale-110 duration-200 ease-in-out'/></Tooltip>;    
        case "view":
            return <Tooltip content="View"> <GrView className='text-green-600 text-xl hover:scale-110 duration-200 ease-in-out'/> </Tooltip>;   
        case "save":
            return <MdCheckCircleOutline/>;   
        case 'verified':
            return <MdVerified/>  
        case 'cross':
            return <RxCrossCircled/>      
        default:
            return <Tooltip content="Edit"> <FaRegEdit className='text-xl hover:scale-110 duration-200 ease-in-out'/> </Tooltip>;
    }

   
}

export default Icons;
