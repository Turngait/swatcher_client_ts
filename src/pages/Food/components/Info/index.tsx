import React from 'react';

import Stats from './Stats';
import AllFoods from './AllFoods';

import './index.scss';

const Info: React.FC<{
    setIsAddFoodOpen: (isOpne: boolean) => void,
    setIsAddFoodForDayOpen: (isOpen: boolean) => void,
    onDeleteFood: (id: string) => Promise<void>,
    onDeleteFoodForDay: (id: string, date: string) => void
  }> = ({ setIsAddFoodOpen, setIsAddFoodForDayOpen, onDeleteFood, onDeleteFoodForDay }) => {
  return(
    <div className="foodInfo">
      <Stats onDeleteFoodForDay={onDeleteFoodForDay} setIsAddFoodForDayOpen={setIsAddFoodForDayOpen}/>
      <AllFoods onDeleteFood={onDeleteFood} setIsAddFoodOpen={setIsAddFoodOpen} />
    </div>
  )
}

export default Info;
