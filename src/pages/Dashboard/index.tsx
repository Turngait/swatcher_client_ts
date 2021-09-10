import React from 'react';

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';

import './index.scss';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <LeftMenu />
      <div className="dashboard__info">
        <Header title="Dashboard"/>
        <Info />
      </div>
    </div>
  );
}

export default Dashboard;