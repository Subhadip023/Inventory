import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import CardContainer from '@/Components/UI/CardContainer';
const DashBoard = ({ curent_shop }) => {
    console.log(curent_shop);
    return (
        <DashboardLayout>
            <CardContainer>
             <h1 className="text-3xl md:text-4xl font-mono text-mainColor font-bold text-center my-6 md:my-10">
                    Welcome to {curent_shop.name}!
                </h1>
            </CardContainer>
        </DashboardLayout>
    );
}

export default DashBoard;
