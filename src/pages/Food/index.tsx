import React from 'react';

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';

import './index.scss';

const FoodPage = () => {
  return (
    <div className="foodPage">
      <LeftMenu />
      <div className="foodPage__info">
        <Header title="Food"/>
        <Info />
      </div>
    </div>
  )
}

export default FoodPage;
