import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {IIllness} from 'types/common';
import { illsDangerEnum } from 'types/common';

import SymptomItem from './Symptom';

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
                <SymptomItem key={item.id} symptom={item} deleteIllness={deleteIllness} openEditIllness={openEditIllness} showDangerName={showDangerName} />
              );
            })
            : <p>{t('health.emptyIllnessByDay')}</p>
          }
      </div>
    </div>
  )
}

export default AllIllness;
