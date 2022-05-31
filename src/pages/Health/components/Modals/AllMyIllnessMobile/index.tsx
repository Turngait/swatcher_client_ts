import PopUp from 'components/common/PopUp';
import Button from 'components/controls/Button';
import { t } from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { IIllness } from 'types/common';
import { BtnSize } from 'types/components';
import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';
import { illsDangerEnum } from 'types/common';

import './index.scss';

interface Props {
  closeModal: () => void,
  setIsAddIllnessOpen: () => void,
  onEditIllness: (id: string) => void,
  onDeleteIllness: (id: string) => void
}

const AllMyIllnessMobile: React.FC<Props> = ({ closeModal, setIsAddIllnessOpen, onEditIllness, onDeleteIllness }) => {
  const illnesses: IIllness[] = useSelector((state: any) => state.health.illnesses);

  const showDangerName = (danger: number) => {
    if (!danger) return t('common.empty');
    if (danger === 1) return illsDangerEnum.none;
    if (danger === 2) return illsDangerEnum.small;
    if (danger === 3) return illsDangerEnum.medium;
    if (danger === 4) return illsDangerEnum.high;
    if (danger === 5) return illsDangerEnum.mortal;
  }

  return (
    <PopUp title="All my illness" closeModal={closeModal}>
      <div className="allFoods__foods">
          {
            Array.isArray(illnesses) && illnesses.length > 0 
            ?
            illnesses.map((item: IIllness) => {
              return (
                <div key={item.id} className="allHealth__infoBox__health__item__box">
                <div className={`allHealth__infoBox__health__item ${item.descr ? 'decriptionOpen' : ''}`}>
                  <p className="allHealth__infoBox__health__item__title">{item.title}</p>
                  <p className="allHealth__infoBox__health__item__colories">{showDangerName(+item.danger)}</p>
                  <div className="allHealth__infoBox__health__item__contolls">
                    <img onClick={() => onEditIllness(item.id || '')} className="allHealth__infoBox__health__item__contolls__ico" src={EditIco} alt="edit food"/>
                    <img onClick={() => onDeleteIllness(item.id || '')} className="allHealth__infoBox__health__item__contolls__ico" src={DelIco} alt="delete food"/>
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
            : <p>{t('health.emptyIllnessByDay')}</p>
          }
        </div>
      <Button
        size={BtnSize.largeBtn}
        title="Add illness"
        onClick={() => { closeModal(); setIsAddIllnessOpen(); }}/>
    </PopUp>
  )
}

export default AllMyIllnessMobile;
