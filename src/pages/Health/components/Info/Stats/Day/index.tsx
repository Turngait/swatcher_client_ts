import React from 'react';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';
import DelIco from 'assets/icons/delete-ico.png';

import './index.scss';

const Day:React.FC<{
    setIsAddIllnessForDayOpen: (isOpne: boolean) => void,
    stat: any,
    deleteIllnessForDay: (id: string, date: string) => void,
  }> = ({setIsAddIllnessForDayOpen, stat, deleteIllnessForDay}) => {
  return (
    <div className="healthStatDay">
      <div className="healthStatDay__header">{stat.date}</div>
      <div className="healthStatDay__info">
        <Button size={BtnSize.largeBtn} title="Add" onClick={() => setIsAddIllnessForDayOpen(true)}/>
        <div className="healthStatDay__info__healths">
          {
            stat.health.map((item: any) => {
              return (
                <div key={item.id} className="healthStatDay__info__healths__item">
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                  <p>с {item.begin}</p>
                  <p>{item.duration} часов</p>
                  <p>{item.power}</p>
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
