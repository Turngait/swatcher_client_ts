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
  return (
    <div className="healthStats">
      <div className="healthStats__btnBox">
        <Button size={BtnSize.largeBtn} title="Add" onClick={() => setIsAddIllnessForDayOpen(true)}/>
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
