import React from 'react';
import { useSelector } from 'react-redux';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';
import Food from './Food';
import { IFood } from 'types/common';

import './index.scss';

const AllFoods: React.FC<{
    setIsAddFoodOpen: (isOpen: boolean) => void,
    onEditFood: (id: string) => void,
    onDeleteFood: (id: string) => Promise<void>
  }> = ({ setIsAddFoodOpen, onEditFood, onDeleteFood }) => {
  const foods: [IFood] | [] = useSelector((state: any) => state.food.foods);

  return (
    <div className="allFoods">
      <div className="allFoods__header">Вся моя еда</div>
      <div className="allFoods__infoBox">
        <div className="allFoods__infoBox__foods">
          {
            Array.isArray(foods) && foods.length > 0 
            ?
            foods.map((food: IFood) => {
              return (
                <Food onEditFood={onEditFood} onDeleteFood={onDeleteFood} key={food.id} food={food} />
              );
            })
            : <p>Вы пока не добавили себе ни одного продукта</p>
          }
        </div>
        <Button size={BtnSize.largeBtn} title="Добавить еду" onClick={() => setIsAddFoodOpen(true)}/>
      </div>
    </div>
  )
}

export default AllFoods;
