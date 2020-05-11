import React from 'react';
import Dashboard from '../../main/components/DashboardComponent/Dashboard';
import CustomPageHeader from '../../main/components/Generics/CustomPageHeader/CustomPageHeader';

const HomePage = () => (
    <>
     <CustomPageHeader title="Dashboard"/>
        <Dashboard/>
    </>
);
export default HomePage
