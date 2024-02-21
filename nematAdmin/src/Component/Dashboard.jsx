import React from 'react';
import { useLocation } from 'react-router-dom';
import SlideBar from './sidebar/SlideBar';
import { Outlet } from 'react-router-dom';
import DashboardComponantData from './DashboardComponantData';

const Dashboard = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/dashboard'; // Assuming '/dashboard' is the path of your Dashboard page

  return (
    <div className='h-[100%]'>
      <SlideBar/>
      <div className="p-4 sm:ml-64">
        <Outlet/>
        {isDashboardPage && <DashboardComponantData/>}
      </div>
    </div>
  );
};

export default Dashboard;