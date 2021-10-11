import React from 'react';

import Day from './Day';

import './index.scss';

const Stats: React.FC<{setIsAddIllnessForDayOpen: (isOpne: boolean) => void}> = ({setIsAddIllnessForDayOpen}) => {
  return (
    <div className="healthStats">
      <Day setIsAddIllnessForDayOpen={setIsAddIllnessForDayOpen}/>
    </div>
  )
}

export default Stats;
