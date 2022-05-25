import PopUp from 'components/common/PopUp';
import Button from 'components/controls/Button';
import { t } from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { IFood } from 'types/common';
import { BtnSize } from 'types/components';
import Food from '../../Info/AllFoods/Food';

import './index.scss';

interface Props {
  closeModal: () => void,
  setIsAddFoodOpen: () => void,
  onEditFood: (id: string) => void,
  onDeleteFood: (id: string) => Promise<void>
}

const AllMyFoodMobile: React.FC<Props> = ({ closeModal, setIsAddFoodOpen, onEditFood, onDeleteFood }) => {
  const foods: [IFood] | [] = useSelector((state: any) => state.food.foods);
  return (
    <PopUp title="All my food" closeModal={closeModal}>
      <div className="allFoods__foods">
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
      <Button
        size={BtnSize.largeBtn}
        title="Add food"
        onClick={() => { closeModal(); setIsAddFoodOpen(); }}/>
    </PopUp>
  )
}

export default AllMyFoodMobile;
