import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {IIllness} from 'types/common';
import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';
import { illsDangerEnum } from 'types/common';

import './index.scss';

const AllIllness: React.FC<{
    deleteIllness: (id: string) => void,
    openEditIllness: (id: string) => void
  }> = ({deleteIllness, openEditIllness}) => {
  const { t } = useTranslation();
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
    <div className="allHealth">
      <div className="allHealth__infoBox">
          {
            illnesses.length ? illnesses.map((item: IIllness) => {
              return (
                <div key={item.id} className="allHealth__infoBox__item__box">
                  <div className={`allHealth__infoBox__item`}>
                    <div className={`allHealth__infoBox__item__headerBox`}>
                      <p className="allHealth__infoBox__item__title">{item.title}</p>
                      <div className="allHealth__infoBox__item__contolls">
                        <img onClick={() => openEditIllness(item.id || '')} className="allHealth__infoBox__item__contolls__ico" src={EditIco} alt="edit food"/>
                        <img onClick={() => deleteIllness(item.id || '')} className="allHealth__infoBox__item__contolls__ico" src={DelIco} alt="delete food"/>
                      </div>
                    </div>
                      <p className="allHealth__infoBox__item__colories">Power: {showDangerName(+item.danger)}</p>
                  {
                    item.descr ?
                    (
                      <>
                        <hr className="allHealth__infoBox__item__decription__line" />
                        <div className="allHealth__infoBox__item__decription">
                          {item.descr}
                        </div>
                      </>
                    )
                    : null
                  }
                  </div>

                </div>
              );
            })
            : <p>{t('health.emptyIllnessByDay')}</p>
          }
      </div>
    </div>
  )
}

export default AllIllness;
