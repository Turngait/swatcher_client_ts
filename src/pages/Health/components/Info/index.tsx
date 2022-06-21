import React from 'react';

import AllIllness from './AllIllness';
import PlsButton from 'components/controls/PlsButton';

import './index.scss';

const Info: React.FC<{
    setIsAddIllnessOpen: (isOpen: boolean) => void,
    deleteIllness: (id: string) => void,
    openEditIllness: (id: string) => void
  }> = ({setIsAddIllnessOpen, deleteIllness, openEditIllness}) => {
  return(
    <div className="healthInfo">
      <AllIllness deleteIllness={deleteIllness} openEditIllness={openEditIllness} />
      <PlsButton onClick={() => setIsAddIllnessOpen(true)} />
    </div>
  )
}

export default Info;
