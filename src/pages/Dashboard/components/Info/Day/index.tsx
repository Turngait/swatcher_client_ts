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
        {/* <p>+20C Sunny</p> */}
      </div>
      <div className="day__info">
        <div className="day__info__food">
        {
          stat.foods.length > 0 ?
          stat.foods.map((food: any) => {
            return (
              <div className="day__info__food__item" key={food.id}>
                <p>{food.title}</p>
                <p>{food.description}</p>
                <p>{food.amount} {food.units}</p>
              </div>
            )
          })
          :
          <div className="day__info__food__item">
            <p>Тут пока пусто</p>
          </div>
        }

        </div>
        <div className="day__info__health">
          {
            stat.health.length > 0 ?
            stat.health.map((item: any) => {
              return (
                <div className="day__info__health__item" key={item.id}>
                  <p className="day__info__health__item__title">{item.title}</p>
                  <p>{item.power}</p>
                  <p>с {item.begin}</p>
                  <p className="day__info__health__item__duration">{item.duration} часов</p>
                </div>
              )
            })
            :
            (
              <div className="day__info__health__item">
                <p>Тут пока пусто</p>
            </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Day;
