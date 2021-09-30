import React from 'react';
import { useSelector } from 'react-redux';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';
import Food from './Food';
import { IFood } from 'types/common';

import './index.scss';

const AllFoods: React.FC<{
    setIsAddFoodOpen: (isOpen: boolean) => void,
    onDeleteFood: (id: string) => Promise<void>
  }> = ({ setIsAddFoodOpen, onDeleteFood }) => {
  const foods: [IFood] | [] = useSelector((state: any) => state.food.foods);

  return (
    <div className="allFoods">
      <div className="allFoods__header">All my food</div>
      <div className="allFoods__infoBox">
        <Button size={BtnSize.largeBtn} title="Add food" onClick={() => setIsAddFoodOpen(true)}/>
        <div className="allFoods__infoBox__foods">
          {
            Array.isArray(foods) && foods.length > 0 
            ?
            foods.map((food: IFood) => {
              return (
                <Food onDeleteFood={onDeleteFood} key={food.id} food={food}/>
              );
            })
            : <p>Вы пока не добавили себе ни одного продукта</p>
          }
        </div>
      </div>
    </div>
  )
}

export default AllFoods;
