import React from 'react';

import AllIllness from './AllIllness';
import Diseases from './Diseases';
import PlsButton from 'components/controls/PlsButton';

import './index.scss';

const Info: React.FC<{
    setIsAddIllnessOpen: (isOpen: boolean) => void,
    deleteIllness: (id: string) => void,
    openEditIllness: (id: string) => void
  }> = ({setIsAddIllnessOpen, deleteIllness, openEditIllness}) => {
  return(
    <div className="healthInfo">
      <div className="healthInfo__box">
        <AllIllness deleteIllness={deleteIllness} openEditIllness={openEditIllness} />
        <Diseases />
      </div>
      <PlsButton onClick={() => setIsAddIllnessOpen(true)} />
    </div>
  )
}

export default Info;
