import React from 'react';

import AllIllness from './AllIllness';
import Diseases from './Diseases';
import PlsButton from '../../../../components/controls/PlsButton';

import './index.scss';

const Info: React.FC<{
    msg: string | null,
    setIsAddIllnessOpen: (isOpen: boolean) => void,
    deleteIllness: (id: string) => void,
    deleteDisease: (id: string) => void,
    openEditIllness: (id: string) => void,
    openEditDisease: (id: string) => void,
    toggleDiseaseActiveStatus: (id: string, is_active: boolean) => void
  }> = ({msg, setIsAddIllnessOpen, deleteIllness, openEditIllness, deleteDisease, openEditDisease, toggleDiseaseActiveStatus}) => {
  return(
    <div className="healthInfo">
      {
        msg ? <div className="healthInfo__msg">{ msg }</div> : null
      }
      <div className="healthInfo__box">
        <AllIllness deleteIllness={deleteIllness} openEditIllness={openEditIllness} />
        <Diseases deleteDisease={deleteDisease} openEditDisease={openEditDisease} toggleDiseaseActiveStatus={toggleDiseaseActiveStatus} />
      </div>
      <PlsButton onClick={() => setIsAddIllnessOpen(true)} />
    </div>
  )
}

export default Info;
