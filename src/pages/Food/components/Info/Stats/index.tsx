import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';
import Day from './Day';
import {IFood, IStat} from 'types/common';

import './index.scss';

const Stats: React.FC<{
    setIsAddFoodForDayOpen: (isOpen: boolean) => void,
    onDeleteFoodForDay: (id: string, date: string) => void,
  }> = ({ setIsAddFoodForDayOpen, onDeleteFoodForDay }) => {
  const { t } = useTranslation();

  const stats: IStat[] = useSelector((state: any) => state.user.stat);
  const foods: [IFood] | [] = useSelector((state: any) => state.food.foods);

  const [showStat, setShowStat] = useState(false);

  useEffect(() => {
    if (stats.length) {
      for(let stat of stats) {
        if (stat.foods.length) {
          setShowStat(true);
          return;
        }
      }
      setShowStat(false);
      return;
    } else {
      setShowStat(false);
      return;
    }
  }, [stats]);


  return (
    <div className="foodStats">
      <div>
      <h2 className="foodStats__heading">{t('stats.statByDays')}</h2>
      {
        foods.length === 0
        ? <p>{t('foods.allMyFoodEmpty')}</p>
        : showStat ?
            stats.map((stat: IStat) => {
              if(stat.foods.length > 0) {
                return <Day onDeleteFoodForDay={onDeleteFoodForDay} stat={stat} key={stat.id} />
              }
              else {
                return null
                }
              }
            )
          : <p>{t('foods.statByDaysNoFood')}</p>
      }
      </div>
      <div className="foodStats__controlBox">
        {
          foods.length 
          ?
          <Button onClick={() => setIsAddFoodForDayOpen(true)} size={BtnSize.largeBtn} title={t('common.add')}/>
          :
          null
        }
        
      </div>
      
    </div>
  )
}

export default Stats;
