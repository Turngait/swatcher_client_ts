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
      <div>
      <h2 className="foodStats__heading">Статистика по дням</h2>
      {
        foods.length === 0
        ? <p>У вас не добавлено еще ни одной еды</p> 
        : stats.length && stats[0].foods.length ?
            stats.map((stat: IStat) => {
              if(stat.foods.length > 0) {
                return <Day onDeleteFoodForDay={onDeleteFoodForDay} stat={stat} key={stat.id} />
              }
              else {
                return null
                }
              }
            )
          : <p>У вас не добавлено еще ни одной еды в статистику. Что бы начать вести статистику нажмите кнопки ниже "Добавить".</p>
      }
      </div>
      <div className="foodStats__controlBox">
        {
          foods.length 
          ?
          <Button onClick={() => setIsAddFoodForDayOpen(true)} size={BtnSize.largeBtn} title="Добавить"/>
          :
          null
        }
        
      </div>
      
    </div>
  )
}

export default Stats;
