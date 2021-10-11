import React from 'react';
import { useSelector } from 'react-redux';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';
import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';
import './index.scss';

const AllIllness: React.FC<{setIsAddIllnessOpen: (isOpen: boolean) => void}> = ({setIsAddIllnessOpen}) => {
  const illnesses = useSelector((state: any) => state.health.illnesses);

  return (
    <div className="allHealth">
      <div className="allHealth__header">All my illness</div>
      <div className="allHealth__infoBox">
        <Button size={BtnSize.largeBtn} title="Новое недомогание" onClick={() => setIsAddIllnessOpen(true)}/>
        <div className="allHealth__infoBox__health">
          {
            illnesses.map((item: any) => {
              return (
                <div className="allHealth__infoBox__health__item" key={item.id}>
                  <p className="allHealth__infoBox__health__item__title">{item.title}</p>
                  <p className="allHealth__infoBox__health__item__colories">{item.danger}</p>
                  <div className="allHealth__infoBox__health__item__contolls">
                    <img className="allHealth__infoBox__health__item__contolls__ico" src={EditIco} alt="edit food"/>
                    <img className="allHealth__infoBox__health__item__contolls__ico" src={DelIco} alt="delete food"/>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AllIllness;
