import React from 'react';
import { useSelector } from 'react-redux';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';
import Day from './Day';

import './index.scss';

const Stats: React.FC<{setIsAddFoodForDayOpen: (isOpen: boolean) => void}> = ({ setIsAddFoodForDayOpen }) => {
  const stats = useSelector((state: any) => state.user.stat);

  return (
    <div className="foodStats">
      <div className="foodStats__controlBox">
        <Button onClick={() => setIsAddFoodForDayOpen(true)} size={BtnSize.largeBtn} title="Add"/>
      </div>
      {
        stats.map((stat: any) => <Day setIsAddFoodForDayOpen={setIsAddFoodForDayOpen} stat={stat} key={stat.id} />)
      }
      
    </div>
  )
}

export default Stats;
