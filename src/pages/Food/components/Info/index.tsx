import React from 'react';

import AllFoods from './AllFoods';
import PlsButton from 'components/controls/PlsButton';

import './index.scss';


const Info: React.FC<{
    setIsAddFoodOpen: (isOpne: boolean) => void,
    onEditFood: (id: string) => void,
    onDeleteFood: (id: string) => Promise<void>,
  }> = ({ setIsAddFoodOpen, onEditFood, onDeleteFood }) => {

  return(
    <div className="foodInfo">
      <AllFoods onDeleteFood={onDeleteFood} onEditFood={onEditFood}/>
      <PlsButton onClick={() => setIsAddFoodOpen(true)} />
    </div>
  )
}

export default Info;
