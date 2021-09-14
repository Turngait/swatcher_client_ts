import React from 'react';

import Stats from './Stats';
import AllIllness from './AllIllness';

import './index.scss';

const Info: React.FC<{setIsAddIllnessOpen: (isOpen: boolean) => void}> = ({setIsAddIllnessOpen}) => {
  return(
    <div className="healthInfo">
      <Stats />
      <AllIllness setIsAddIllnessOpen={setIsAddIllnessOpen}/>
    </div>
  )
}

export default Info;
