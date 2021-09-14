import React from 'react';

import Stats from './Stats';
import AllFoods from './AllFoods';

import './index.scss';

const Info: React.FC<{setIsAddFoodOpen: (isOpne: boolean) => void}> = ({ setIsAddFoodOpen }) => {
  return(
    <div className="foodInfo">
      <Stats />
      <AllFoods setIsAddFoodOpen={setIsAddFoodOpen} />
    </div>
  )
}

export default Info;
