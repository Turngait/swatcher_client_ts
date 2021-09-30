import React from 'react';

import Stats from './Stats';
import AllFoods from './AllFoods';

import './index.scss';

const Info: React.FC<{
    setIsAddFoodOpen: (isOpne: boolean) => void,
    setIsAddFoodForDayOpen: (isOpen: boolean) => void,
    onDeleteFood: (id: string) => Promise<void>
  }> = ({ setIsAddFoodOpen, setIsAddFoodForDayOpen, onDeleteFood }) => {
  return(
    <div className="foodInfo">
      <Stats setIsAddFoodForDayOpen={setIsAddFoodForDayOpen}/>
      <AllFoods onDeleteFood={onDeleteFood} setIsAddFoodOpen={setIsAddFoodOpen} />
    </div>
  )
}

export default Info;
