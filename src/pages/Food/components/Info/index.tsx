import React from 'react';

import Stats from './Stats';
import AllFoods from './AllFoods';

import './index.scss';

const Info: React.FC<{
    setIsAddFoodOpen: (isOpne: boolean) => void,
    setIsAddFoodForDayOpen: (isOpen: boolean) => void,
    onEditFood: (id: string) => void,
    onDeleteFood: (id: string) => Promise<void>,
    onDeleteFoodForDay: (id: string, date: string) => void,
  }> = ({ setIsAddFoodOpen, setIsAddFoodForDayOpen, onEditFood, onDeleteFood, onDeleteFoodForDay }) => {
  return(
    <div className="foodInfo">
      <Stats onDeleteFoodForDay={onDeleteFoodForDay} setIsAddFoodForDayOpen={setIsAddFoodForDayOpen}/>
      <AllFoods onDeleteFood={onDeleteFood} setIsAddFoodOpen={setIsAddFoodOpen} onEditFood={onEditFood}/>
    </div>
  )
}

export default Info;
