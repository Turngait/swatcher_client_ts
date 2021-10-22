import React from 'react';

import DelIco from 'assets/icons/delete-ico.png';

import './index.scss';

const Day:React.FC<{
    stat: any,
    deleteIllnessForDay: (id: string, date: string) => void,
  }> = ({ stat, deleteIllnessForDay}) => {
  return (
    <div className="healthStatDay">
      <div className="healthStatDay__header">{stat.date}</div>
      <div className="healthStatDay__info">
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
