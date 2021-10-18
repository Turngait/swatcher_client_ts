import React from 'react';

import Stats from './Stats';
import AllIllness from './AllIllness';

import './index.scss';

const Info: React.FC<{
    setIsAddIllnessOpen: (isOpen: boolean) => void,
    setIsAddIllnessForDayOpen: (isOpen: boolean) => void,
    deleteIllness: (id: string) => void,
    deleteIllnessForDay: (id: string, date: string) => void
  }> = ({setIsAddIllnessOpen, setIsAddIllnessForDayOpen, deleteIllness, deleteIllnessForDay}) => {
  return(
    <div className="healthInfo">
      <Stats  deleteIllnessForDay={deleteIllnessForDay} setIsAddIllnessForDayOpen={setIsAddIllnessForDayOpen}/>
      <AllIllness deleteIllness={deleteIllness} setIsAddIllnessOpen={setIsAddIllnessOpen}/>
    </div>
  )
}

export default Info;
