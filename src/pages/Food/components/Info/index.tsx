import React from 'react';

import Stats from './Stats';
import AllFoods from './AllFoods';

import './index.scss';

const Info: React.FC = () => {
  return(
    <div className="foodInfo">
      <Stats />
      <AllFoods />
    </div>
  )
}

export default Info;
