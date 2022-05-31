import React, { useState } from 'react';

import Stats from './Stats';
import AllFoods from './AllFoods';
import Button from 'components/controls/Button';
import { BtnSize } from 'types/components';
import AllMyFoodMobile from '../Modals/AllMyFoodMobile';

import './index.scss';


const Info: React.FC<{
    setIsAddFoodOpen: (isOpne: boolean) => void,
    setIsAddFoodForDayOpen: (isOpen: boolean) => void,
    onEditFood: (id: string) => void,
    onDeleteFood: (id: string) => Promise<void>,
    onDeleteFoodForDay: (id: string, date: string) => void,
  }> = ({ setIsAddFoodOpen, setIsAddFoodForDayOpen, onEditFood, onDeleteFood, onDeleteFoodForDay }) => {
    const [isAllMyFoodOpen, setIsAllMyFoodOpen] = useState(false);

  return(
    <div className="foodInfo">
      {
        isAllMyFoodOpen 
          ? <AllMyFoodMobile
              setIsAddFoodOpen={() => setIsAddFoodOpen(true)}
              closeModal={() => setIsAllMyFoodOpen(false)}
              onDeleteFood={onDeleteFood}
              onEditFood={onEditFood}
            /> 
          : null
      }
      <Stats onDeleteFoodForDay={onDeleteFoodForDay} setIsAddFoodForDayOpen={setIsAddFoodForDayOpen}/>
      <AllFoods onDeleteFood={onDeleteFood} setIsAddFoodOpen={setIsAddFoodOpen} onEditFood={onEditFood}/>
      <Button className="foodInfo__myFoodMobileBtn" size={BtnSize.largeBtn} title='All my food' onClick={() => setIsAllMyFoodOpen(true)}/>
    </div>
  )
}

export default Info;
