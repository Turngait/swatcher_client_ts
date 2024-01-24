import React from 'react';

import AllFoods from './AllFoods';
import PlsButton from 'components/controls/PlsButton';

import './index.scss';


const Info: React.FC<{
    msg: string | null,
    setIsAddFoodOpen: (isOpne: boolean) => void,
    onEditFood: (id: string) => void,
    onDeleteFood: (id: string) => Promise<void>,
  }> = ({msg, setIsAddFoodOpen, onEditFood, onDeleteFood }) => {

  return(
    <div className="foodInfo">
      {
        msg ? <div className="foodInfo__msg">{ msg }</div> : null
      }
      <AllFoods onDeleteFood={onDeleteFood} onEditFood={onEditFood}/>
      <PlsButton onClick={() => setIsAddFoodOpen(true)} />
    </div>
  )
}

export default Info;
