import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { BtnSize } from 'types/components';
import Day from './Day';
import Button from 'components/controls/Button';

import './index.scss';

const Stats: React.FC<{
    setIsAddIllnessForDayOpen: (isOpen: boolean) => void,
    deleteIllnessForDay: (id: string, date: string) => void
  }> = ({setIsAddIllnessForDayOpen, deleteIllnessForDay}) => {
  const { t } = useTranslation();
  const stats = useSelector((state: any) => state.user.stat);
  const illnesses = useSelector((state: any) => state.health.illnesses);

  const [showStat, setShowStat] = useState(false);

  useEffect(() => {
    if (stats.length) {
      for(let stat of stats) {
        if (stat.health.length) {
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
    <div className="healthStats">
      <div>
        <h2 className="foodStats__heading">{t('stats.statByDays')}</h2>
        {
          illnesses.length === 0 ? <p>{t('health.allMyIllnessEmpty')}</p> : null
        }
        {
          showStat ?
          stats.map((stat: any) => {
            if (stat.health.length > 0) {
              return (
                <Day deleteIllnessForDay={deleteIllnessForDay} stat={stat} key={stat.id} />
              )
            } else {
              return null;
            }
          })
          : <p>{t('health.allMyIllnessEmpty')}</p>
        }
      </div>
      <div className="healthStats__btnBox">
        {
          illnesses.length 
            ? 
            <Button size={BtnSize.largeBtn} title={t('common.add')} onClick={() => setIsAddIllnessForDayOpen(true)}/> 
            : 
            null
        }
        
      </div>
    </div>
  )
}

export default Stats;
