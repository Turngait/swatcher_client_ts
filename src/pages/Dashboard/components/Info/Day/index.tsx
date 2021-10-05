import React from 'react';

import './index.scss';

const Day: React.FC<{stat: any}> = ({stat}) => {
  function showDate (initDate: string): string {
    const d = new Date(initDate);
    let ye = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('ru', { month: 'long' }).format(d);
    let da = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(d);
    return `${da} ${mo} ${ye}`;
  }

    return (
    <div className="day">
      <div className="day__header">
        <p>{showDate(stat.date)}</p>
        <p>+20C Sunny</p>
      </div>
      <div className="day__info">
        <div className="day__info__food">
        {
          stat.foods.map((food: any) => {
            return (
              <div className="day__info__food__item" key={food.id}>
                <p>{food.title}</p>
                <p>{food.description}</p>
                <p>{food.amount}</p>
              </div>
            )
          })
        }

        </div>
        <div className="day__info__health">
          <div className="day__info__health__item">
            <p>Migraine</p>
            <p>medium</p>
            <p>from 14 00</p>
            <p>2 hours</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Day;
