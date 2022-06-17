import React, { useState } from 'react';

import AllFoods from './AllFoods';
import AllMyFoodMobile from '../Modals/AllMyFoodMobile';
import PlsButton from 'components/controls/PlsButton';

import './index.scss';


const Info: React.FC<{
    setIsAddFoodOpen: (isOpne: boolean) => void,
    onEditFood: (id: string) => void,
    onDeleteFood: (id: string) => Promise<void>,
  }> = ({ setIsAddFoodOpen, onEditFood, onDeleteFood }) => {
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
      <AllFoods onDeleteFood={onDeleteFood} onEditFood={onEditFood}/>
      <PlsButton onClick={() => setIsAddFoodOpen(true)} />
    </div>
  )
}

export default Info;
