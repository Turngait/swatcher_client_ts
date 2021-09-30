import React from 'react';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';

import './index.scss';

const Day: React.FC<{setIsAddFoodForDayOpen: (isOpen: boolean) => void}> = ({ setIsAddFoodForDayOpen }) => {
  return (
    <div className="foodStatDay">
      <div className="foodStatDay__header">Today</div>
      <div className="foodStatDay__info">
        <Button onClick={() => setIsAddFoodForDayOpen(true)} size={BtnSize.largeBtn} title="Add"/>
        <div className="foodStatDay__info__foods">
          <div className="foodStatDay__info__foods__item">
            <p>Coffee</p>
            <p>with Milk</p>
            <p>150ml</p>
            <p>14 00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Day;
