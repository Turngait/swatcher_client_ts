import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Food from './Food';
import { IFood } from 'types/common';

import './index.scss';

const AllFoods: React.FC<{
    onEditFood: (id: string) => void,
    onDeleteFood: (id: string) => Promise<void>
  }> = ({ onEditFood, onDeleteFood }) => {
  const { t } = useTranslation();

  const foods: [IFood] | [] = useSelector((state: any) => state.food.foods);

  return (
    <div className="allFoods">
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
            : <p>{t('foods.allMyFoodEmpty')}</p>
          }
        </div>
      </div>
    </div>
  )
}

export default AllFoods;
