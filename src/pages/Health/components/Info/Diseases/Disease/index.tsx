import React from "react";

import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';

import './index.scss';

const Disease: React.FC = () => {
  return (
    <div className='disease'>
    <div className='disease__header'>
      <p className='disease__header__title'>Title</p>
      <div className="disease__header__controls">
        <img onClick={() => {}} className="disease__header__controls__ico" src={EditIco} alt="edit food"/>
        <img onClick={() => {}} className="disease__header__controls__ico" src={DelIco} alt="delete food"/>
      </div>
    </div>
    <div className='disease__info'>
      <div className='disease__info__item'>Danger: medium</div>
    </div>
    <div className='disease__controls'>
      {/* Move checkbox to component */}
      <label className='disease__controls__item'>
        <p>Now active</p>
        <input className='disease__controls__checkbox' type='checkbox' />
      </label>
    </div>
  </div>
  )
}

export default Disease;
