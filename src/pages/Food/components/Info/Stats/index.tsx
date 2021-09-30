import React from 'react';

import Day from './Day';

import './index.scss';

const Stats: React.FC<{setIsAddFoodForDayOpen: (isOpen: boolean) => void}> = ({ setIsAddFoodForDayOpen }) => {
  return (
    <div className="foodStats">
      <Day setIsAddFoodForDayOpen={setIsAddFoodForDayOpen}/>
    </div>
  )
}

export default Stats;
