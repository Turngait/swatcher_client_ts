import React from 'react';
import { useTranslation } from 'react-i18next';

// import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';

import { showPower } from 'utils';

import './index.scss';

const Day: React.FC<{
    stat: any;
    deleteIllnessForDay: (id: string, date: string) => Promise<void>;
    deleteFoodForDayHandler: (id: string, date: string) => Promise<void>;
  }> = ({stat, deleteIllnessForDay, deleteFoodForDayHandler}) => {
  const { t } = useTranslation();

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
                <div className="day__info__food__item__mainBox">
                  <p className="day__info__food__item__title">{food.title}</p>
                  <p>Amount: {food.amount} {food.units}</p>
                  <div className="day__info__food__item__contolls">
                    {/* <img onClick={() => console.log(food.id)} className="day__info__food__item__contolls__ico" src={EditIco} alt="edit food"/> */}
                    <img onClick={() => deleteFoodForDayHandler(food.id, stat.date)} className="item__contolls__ico" src={DelIco} alt="delete food"/>
                  </div>
                </div>
                <p>{food.description}</p>
              </div>
            )
          })
          :
          <div className="day__info__food__item">
            <p>{t('stats.emptyHere')}</p>
          </div>
        }

        </div>
        <div className="day__info__health">
          {
            stat.health.length > 0 ?
            stat.health.map((item: any) => {
              return (
                <div className="day__info__health__item" key={item.id}>
                  <div className="day__info__health__item__mainBox">
                    <p className="day__info__health__item__title">{item.title}</p>
                    <p>From: {item.begin}</p>
                    <p className="day__info__health__item__duration">{item.duration} h.</p>
                    <div className="day__info__food__item__contolls">
                      {/* <img onClick={() => console.log(item.id)} className="day__info__food__item__contolls__ico" src={EditIco} alt="edit food"/> */}
                      <img onClick={() => deleteIllnessForDay(item.id, stat.date)} className="item__contolls__ico" src={DelIco} alt="delete illness"/>
                    </div>
                  </div>
                  <p>Power: {showPower(item.power)}</p>
                </div>
              )
            })
            :
            (
              <div className="day__info__health__item">
                <p>{t('stats.emptyHere')}</p>
            </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Day;
