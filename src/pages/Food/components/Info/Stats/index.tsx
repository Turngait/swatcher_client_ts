import React from 'react';
import { useSelector } from 'react-redux';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';
import Day from './Day';
import {IFood, IStat} from 'types/common';

import './index.scss';

const Stats: React.FC<{
    setIsAddFoodForDayOpen: (isOpen: boolean) => void,
    onDeleteFoodForDay: (id: string, date: string) => void,
  }> = ({ setIsAddFoodForDayOpen, onDeleteFoodForDay }) => {
  const stats: IStat[] = useSelector((state: any) => state.user.stat);
  const foods: [IFood] | [] = useSelector((state: any) => state.food.foods);

  return (
    <div className="foodStats">
      <div className="foodStats__controlBox">
        {
          foods.length 
          ?
          <Button onClick={() => setIsAddFoodForDayOpen(true)} size={BtnSize.largeBtn} title="Добавить"/>
          :
          <p>У вас не добавлено еще ни одной еды</p> 
        }
        
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
