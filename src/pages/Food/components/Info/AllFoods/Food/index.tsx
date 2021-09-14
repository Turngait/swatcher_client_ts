import React from 'react';

import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';

import { IFood } from 'types/common';
import './index.scss';

const Food: React.FC<{food: IFood}> = ({ food }) => {
  return (
    <div className="item">
      <p className="item__title">{food.title}</p>
      <p className="item__colories">{food.callories}kkl</p>
      <div className="item__contolls">
        <img className="item__contolls__ico" src={EditIco} alt="edit food"/>
        <img className="item__contolls__ico" src={DelIco} alt="delete food"/>
      </div>
    </div>
  )
}

export default Food;