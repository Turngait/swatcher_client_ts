import React from 'react';

import './index.scss';

const Day: React.FC = () => {
  return (
    <div className="day">
      <div className="day__header">
        <p>July 29 2021</p>
        <p>+20C Sunny</p>
      </div>
      <div className="day__info">
        <div className="day__info__food">
          <div className="day__info__food__item">
            <p>Coffee</p>
            <p>with milk</p>
            <p>150ml</p>
          </div>
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
