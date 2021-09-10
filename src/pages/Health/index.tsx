import React from 'react';

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';

import './index.scss';

const HealthPage = () => {
  return (
    <div className="healthPage">
      <LeftMenu />
      <div className="foodPage__info">
        <Header title="Health"/>
        <Info />
      </div>
    </div>
  )
}

export default HealthPage;
