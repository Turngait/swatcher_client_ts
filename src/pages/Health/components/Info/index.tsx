import React from 'react';

import AllIllness from './AllIllness';
import Diseases from './Diseases';
import PlsButton from '../../../../components/controls/PlsButton';

import './index.scss';

const Info: React.FC<{
    setIsAddIllnessOpen: (isOpen: boolean) => void,
    deleteIllness: (id: string) => void,
    deleteDisease: (id: string) => void,
    openEditIllness: (id: string) => void,
    openEditDisease: (id: string) => void,
    toggleDiseaseActiveStatus: (id: string, is_active: boolean) => void
  }> = ({setIsAddIllnessOpen, deleteIllness, openEditIllness, deleteDisease, openEditDisease, toggleDiseaseActiveStatus}) => {
  return(
    <div className="healthInfo">
      <div className="healthInfo__box">
        <AllIllness deleteIllness={deleteIllness} openEditIllness={openEditIllness} />
        <Diseases deleteDisease={deleteDisease} openEditDisease={openEditDisease} toggleDiseaseActiveStatus={toggleDiseaseActiveStatus} />
      </div>
      <PlsButton onClick={() => setIsAddIllnessOpen(true)} />
    </div>
  )
}

export default Info;
