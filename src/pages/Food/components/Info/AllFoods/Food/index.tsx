import React from 'react';

import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';

import { IFood } from 'types/common';
import { showHarmfulness } from 'utils';
import './index.scss';

const Food: React.FC<{
  food: IFood,
  onDeleteFood: (id: string) => Promise<void>,
  onEditFood: (id: string) => void
}> = ({ food, onDeleteFood, onEditFood }) => {
  return (
      <div className={"item__box"}>
        <div className={"item"}>
          <div className={"item__headingBox"}>
            <p className="item__title">{food.title}</p>
            <div className="item__contolls">
              <img onClick={() => onEditFood(food.id)} className="item__contolls__ico" src={EditIco} alt="edit food"/>
              <img onClick={() => onDeleteFood(food.id)} className="item__contolls__ico" src={DelIco} alt="delete food"/>
            </div>
          </div>

          <div>{food.calories} kkl</div>
          <div>Harmfulness: {showHarmfulness(food.harmfulness || 0)}</div>
          {
            food.ingredients?.length ? (
              <>
                <p className='item__ingredients'>Ingredients:</p>
                <ul className='item__ingredients__list'>
                  {
                    food.ingredients.map((item, idx) => (
                      <li key={idx}>{idx+1} {item.title}</li>
                    ))
                  }
                </ul>
              </>
            ) : null
          }
          {
          food.descr ?
          (
            <>
              <hr className="item__decription__line"/>
              <div className="item__decription">
                {food.descr}
              </div>
            </>
          )
          : null
        }
        </div>
      </div>

  )
}

export default Food;