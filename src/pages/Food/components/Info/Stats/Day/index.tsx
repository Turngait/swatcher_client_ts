import React from 'react';

import DelIco from 'assets/icons/close_ico.png';

import './index.scss';

const Day: React.FC<{
    stat: any,
    onDeleteFoodForDay: (id: string, date: string) => void
  }> = ({ stat, onDeleteFoodForDay }) => {
  function showDate (initDate: string): string {
    const d = new Date(initDate);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da} ${mo} ${ye}`;
  }

  return (
    <div className="foodStatDay">
      <div className="foodStatDay__header">{showDate(stat.date)}</div>
      <div className="foodStatDay__info">
        <div className="foodStatDay__info__foods">
          {
            stat.foods.map((food: any) => {
              return (
                <div className="foodStatDay__info__foods__item" key={food.id}>
                  <p className="foodStatDay__info__foods__item__title">{food.title}</p>
                  <p>{food.description}</p>
                  <p>{food.amount}</p>
                  <p>{food.time}</p>
                  <img onClick={() => onDeleteFoodForDay(food.id, stat.date)} className="healthStatDay__info__healths__item__delIco" src={DelIco} alt="delete health"/>
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
