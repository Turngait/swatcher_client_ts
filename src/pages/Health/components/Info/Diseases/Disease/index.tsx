import React, { useState } from "react";

import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';

import './index.scss';
import { IDisease } from "../../../../../../types/common";
import { showPower } from "../../../../../../utils";

const Disease: React.FC<{
  disease: IDisease,
  deleteDisease: (id: string) => void,
  openEditDisease: (id: string) => void,
  toggleDiseaseActiveStatus: (id: string, is_active: boolean) => void
}> = ({ disease, deleteDisease, openEditDisease, toggleDiseaseActiveStatus }) => {
  const [isActive, setIsActive] = useState(disease.is_active);

  const changeIsActive = async () => {
    await toggleDiseaseActiveStatus(disease.id, disease.is_active);
    setIsActive(!isActive);
  }
  return (
    <div className='disease'>
    <div className='disease__header'>
      <p className='disease__header__title'>{disease.title}</p>
      <div className="disease__header__controls">
        <img onClick={() => {openEditDisease(disease.id)}} className="disease__header__controls__ico" src={EditIco} alt="edit food"/>
        <img onClick={() => {deleteDisease(disease.id)}} className="disease__header__controls__ico" src={DelIco} alt="delete food"/>
      </div>
    </div>
    <div className='disease__info'>
      <div className='disease__info__item'>Danger: { showPower(disease.danger) }</div>
    </div>
    <div className='disease__controls'>
      {/* Move checkbox to component */}
      <label className='disease__controls__item'>
        <p>Now active</p>
        <input checked={isActive} onChange={() => {changeIsActive()}} className='disease__controls__checkbox' type='checkbox' />
      </label>
    </div>
  </div>
  )
}

export default Disease;
