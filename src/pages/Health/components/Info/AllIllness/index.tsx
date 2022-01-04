import React from 'react';
import { useSelector } from 'react-redux';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';
import {IIllness} from 'types/common';
import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';
import { illsDangerEnum } from 'types/common';

import './index.scss';

const AllIllness: React.FC<{
    setIsAddIllnessOpen: (isOpen: boolean) => void,
    deleteIllness: (id: string) => void,
    openEditIllness: (id: string) => void
  }> = ({setIsAddIllnessOpen, deleteIllness, openEditIllness}) => {
  const illnesses: IIllness[] = useSelector((state: any) => state.health.illnesses);

  const showDangerName = (danger: number) => {
    if (!danger) return 'Неопределено';
    if (danger === 1) return illsDangerEnum.none;
    if (danger === 2) return illsDangerEnum.small;
    if (danger === 3) return illsDangerEnum.medium;
    if (danger === 4) return illsDangerEnum.high;
    if (danger === 5) return illsDangerEnum.mortal;
  }

  return (
    <div className="allHealth">
      <div className="allHealth__header">Все болезни</div>
      <div className="allHealth__infoBox">
        <Button size={BtnSize.largeBtn} title="Новое недомогание" onClick={() => setIsAddIllnessOpen(true)}/>
        <div className="allHealth__infoBox__health">
          {
            illnesses.map((item: IIllness) => {
              return (
                <div key={item.id} className="allHealth__infoBox__health__item__box">
                  <div className={`allHealth__infoBox__health__item ${item.descr ? 'decriptionOpen' : ''}`}>
                    <p className="allHealth__infoBox__health__item__title">{item.title}</p>
                    <p className="allHealth__infoBox__health__item__colories">{showDangerName(+item.danger)}</p>
                    <div className="allHealth__infoBox__health__item__contolls">
                      <img onClick={() => openEditIllness(item.id || '')} className="allHealth__infoBox__health__item__contolls__ico" src={EditIco} alt="edit food"/>
                      <img onClick={() => deleteIllness(item.id || '')} className="allHealth__infoBox__health__item__contolls__ico" src={DelIco} alt="delete food"/>
                    </div>
                  </div>
                  {
                    item.descr ?
                    (
                      <div className="allHealth__infoBox__health__item__decription">
                        {item.descr}
                      </div>
                    )
                    : null
                  }

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
