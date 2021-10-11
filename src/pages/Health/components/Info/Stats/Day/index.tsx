import React from 'react';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';

import './index.scss';

const Day:React.FC<{setIsAddIllnessForDayOpen: (isOpne: boolean) => void}> = ({setIsAddIllnessForDayOpen}) => {
  return (
    <div className="healthStatDay">
      <div className="healthStatDay__header">Today</div>
      <div className="healthStatDay__info">
        <Button size={BtnSize.largeBtn} title="Add" onClick={() => setIsAddIllnessForDayOpen(true)}/>
        <div className="healthStatDay__info__healths">
          <div className="healthStatDay__info__healths__item">
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
