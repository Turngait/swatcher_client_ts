import React from 'react';
import { useSelector } from 'react-redux';

import Day from './Day';

import './index.scss';

const Stats: React.FC<{
    setIsAddIllnessForDayOpen: (isOpne: boolean) => void,
    deleteIllnessForDay: (id: string, date: string) => void
  }> = ({setIsAddIllnessForDayOpen, deleteIllnessForDay}) => {
  const stats = useSelector((state: any) => state.user.stat);
  return (
    <div className="healthStats">
      {
        stats.map((stat: any) => {
          if (stat.health.length > 0) {
            return (
              <Day deleteIllnessForDay={deleteIllnessForDay} stat={stat} key={stat.id} setIsAddIllnessForDayOpen={setIsAddIllnessForDayOpen}/>
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
