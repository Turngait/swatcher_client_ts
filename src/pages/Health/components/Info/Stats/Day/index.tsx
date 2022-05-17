import React from 'react';

import DelIco from 'assets/icons/close_ico.png';
import { showPower } from 'utils';

import './index.scss';

const Day:React.FC<{
    stat: any,
    deleteIllnessForDay: (id: string, date: string) => void,
  }> = ({ stat, deleteIllnessForDay}) => {
    function showDate (initDate: string): string {
      const d = new Date(initDate);
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      return `${da} ${mo} ${ye}`;
    }

  return (
    <div className="healthStatDay">
      <div className="healthStatDay__header">{showDate(stat.date)}</div>
      <div className="healthStatDay__info">
        <div className="healthStatDay__info__healths">
          {
            stat.health.map((item: any) => {
              return (
                <div key={item.id} className="healthStatDay__info__healths__item">
                  <p className="healthStatDay__info__healths__item__title">{item.title}</p>
                  <p>{item.description}</p>
                  <p>from {item.begin}</p>
                  <p className="healthStatDay__info__healths__item__duration">{item.duration} h.</p>
                  <p>Power: {showPower(item.power)}</p>
                  <img onClick={() => deleteIllnessForDay(item.id, stat.date)} className="healthStatDay__info__healths__item__delIco" src={DelIco} alt="delete health"/>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Day;
