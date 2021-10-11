import React from 'react';

import Stats from './Stats';
import AllIllness from './AllIllness';

import './index.scss';

const Info: React.FC<{
    setIsAddIllnessOpen: (isOpen: boolean) => void,
    setIsAddIllnessForDayOpen: (isOpen: boolean) => void
  }> = ({setIsAddIllnessOpen, setIsAddIllnessForDayOpen}) => {
  return(
    <div className="healthInfo">
      <Stats setIsAddIllnessForDayOpen={setIsAddIllnessForDayOpen}/>
      <AllIllness setIsAddIllnessOpen={setIsAddIllnessOpen}/>
    </div>
  )
}

export default Info;
