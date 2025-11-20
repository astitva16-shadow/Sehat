import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import EmergencyButton from './EmergencyButton';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pb-20">
        <Outlet />
      </main>
      <EmergencyButton />
    </div>
  );
};

export default Layout;
