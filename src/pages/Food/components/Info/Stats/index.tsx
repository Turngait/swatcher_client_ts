import React from 'react';
import { useSelector } from 'react-redux';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';
import Day from './Day';
import {IStat} from 'types/common';

import './index.scss';

const Stats: React.FC<{
    setIsAddFoodForDayOpen: (isOpen: boolean) => void,
    onDeleteFoodForDay: (id: string, date: string) => void,
  }> = ({ setIsAddFoodForDayOpen, onDeleteFoodForDay }) => {
  const stats: IStat[] = useSelector((state: any) => state.user.stat);

  return (
    <div className="foodStats">
      <div className="foodStats__controlBox">
        <Button onClick={() => setIsAddFoodForDayOpen(true)} size={BtnSize.largeBtn} title="Добавить"/>
      </div>
      {
        stats.map((stat: IStat) => {
          if(stat.foods.length > 0) {
            return <Day onDeleteFoodForDay={onDeleteFoodForDay} stat={stat} key={stat.id} />
          }
          else {
            return null
            }
          }
        )
      }
      
    </div>
  )
}

export default Stats;
