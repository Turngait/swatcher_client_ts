import React from 'react';

import './index.scss';

const Day: React.FC<{setIsAddFoodForDayOpen: (isOpen: boolean) => void, stat: any}> = ({ stat, setIsAddFoodForDayOpen }) => {
  function showDate (initDate: string): string {
    const d = new Date(initDate);
    let ye = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('ru', { month: 'long' }).format(d);
    let da = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(d);
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
                  <p>{food.title}</p>
                  <p>{food.description}</p>
                  <p>{food.amount} шт.</p>
                  <p>{food.time}</p>
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
