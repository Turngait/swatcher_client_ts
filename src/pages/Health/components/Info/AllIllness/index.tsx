import React from 'react';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';
import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';
import './index.scss';

const AllIllness: React.FC<{setIsAddIllnessOpen: (isOpen: boolean) => void}> = ({setIsAddIllnessOpen}) => {
  return (
    <div className="allHealth">
      <div className="allHealth__header">All my illness</div>
      <div className="allHealth__infoBox">
        <Button size={BtnSize.largeBtn} title="Новое недомогание" onClick={() => setIsAddIllnessOpen(true)}/>
        <div className="allHealth__infoBox__health">
          <div className="allHealth__infoBox__health__item">
            <p className="allHealth__infoBox__health__item__title">Cofee</p>
            <p className="allHealth__infoBox__health__item__colories">150kkl</p>
            <div className="allHealth__infoBox__health__item__contolls">
              <img className="allHealth__infoBox__health__item__contolls__ico" src={EditIco} alt="edit food"/>
              <img className="allHealth__infoBox__health__item__contolls__ico" src={DelIco} alt="delete food"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllIllness;
