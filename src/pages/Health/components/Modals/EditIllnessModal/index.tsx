import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import { illsDangerEnum } from 'types/common';

import { IIllness } from 'types/common';

import './index.scss';

const EditIllnessModal: React.FC<{
  illness: IIllness,
  closeModal: (isOpen: boolean) => void,
  saveChangesOnIllness: (title: string, descr: string, danger: number, id: string, groupId: string, bodyPlaceId: string) => void
}> = ({ illness, closeModal, saveChangesOnIllness }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState(illness.title);
  const [descr, setDescr] = useState(illness.descr);
  const [danger, setDanger] = useState(+illness.danger);

  const showDangerName = (danger: number) => {
    if (!danger) return t('common.empty');
    if (danger === 1) return illsDangerEnum.none;
    if (danger === 2) return illsDangerEnum.small;
    if (danger === 3) return illsDangerEnum.medium;
    if (danger === 4) return illsDangerEnum.high;
    if (danger === 5) return illsDangerEnum.mortal;
  }

  return (
    <PopUp title={`${t('common.edit')} ${illness.title}`} closeModal={() => closeModal(false)}>
      <div className="addNewFood__form">
        <Textinput value={title} maxlength={20} placeholder={`${t('common.title')}...`} onChange={(event) => setTitle(event.target.value)}/>
        <label>
          <p>{t('health.mChooseDanger')}</p>
          <select className="addFoodForDay__form__time" onChange={(event: any) => setDanger(event.target.value)}>
            <option value={danger}>Set: {showDangerName(danger)}</option>
            <option value={1}>{illsDangerEnum.none}</option>
            <option value={2}>{illsDangerEnum.small}</option>
            <option value={3}>{illsDangerEnum.medium}</option>
            <option value={4}>{illsDangerEnum.high}</option>
            <option value={5}>{illsDangerEnum.mortal}</option>
          </select>
        </label>
        <textarea
          className="addNewIllness__form__textarea"
          placeholder={`${t('common.description')}...`}
          onChange={(event) => setDescr(event.target.value)}
          value={descr}
        >
        </textarea>
         <Button title={t('common.add')} onClick={() => saveChangesOnIllness(title, descr, danger, illness.id || '', illness.groupId, illness.placeId)} />

      </div>
    </PopUp>
  )
}

export default EditIllnessModal;
