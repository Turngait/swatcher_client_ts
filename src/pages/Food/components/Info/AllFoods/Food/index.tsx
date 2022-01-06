import React from 'react';

import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';

import { IFood } from 'types/common';
import './index.scss';

const Food: React.FC<{
  food: IFood,
  onDeleteFood: (id: string) => Promise<void>,
  onEditFood: (id: string) => void
}> = ({ food, onDeleteFood, onEditFood }) => {
  return (
    <div className="item__box">
      <div className={`item ${food.descr ? 'decriptionOpen' : ''}`}>
        <p className="item__title">{food.title}</p>
        <p className="item__colories">{food.callories} ккл</p>
        <div className="item__contolls">
          <img onClick={() => onEditFood(food.id)} className="item__contolls__ico" src={EditIco} alt="edit food"/>
          <img onClick={() => onDeleteFood(food.id)} className="item__contolls__ico" src={DelIco} alt="delete food"/>
        </div>
      </div>
      {
        food.descr ?
        (
          <div className="allHealth__infoBox__health__item__decription">
            {food.descr}
          </div>
        )
        : null
      }
    </div>
  )
}

export default Food;