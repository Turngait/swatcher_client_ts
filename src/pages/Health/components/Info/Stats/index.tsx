import React from 'react';
import { useSelector } from 'react-redux';

import { BtnSize } from 'types/components';
import Day from './Day';
import Button from 'components/controls/Button';

import './index.scss';

const Stats: React.FC<{
    setIsAddIllnessForDayOpen: (isOpne: boolean) => void,
    deleteIllnessForDay: (id: string, date: string) => void
  }> = ({setIsAddIllnessForDayOpen, deleteIllnessForDay}) => {
  const stats = useSelector((state: any) => state.user.stat);
  const illnesses = useSelector((state: any) => state.health.illnesses);
  return (
    <div className="healthStats">
      <div className="healthStats__btnBox">
        {
          illnesses.length 
            ? 
            <Button size={BtnSize.largeBtn} title="Добавить" onClick={() => setIsAddIllnessForDayOpen(true)}/> 
            : 
            <p>У вас не добавлено ни одного недомагания</p>
        }
        
      </div>

      {
        stats.map((stat: any) => {
          if (stat.health.length > 0) {
            return (
              <Day deleteIllnessForDay={deleteIllnessForDay} stat={stat} key={stat.id} />
            )
          } else {
            return null;
          }
        })
      }
    </div>
  )
}

export default Stats;
