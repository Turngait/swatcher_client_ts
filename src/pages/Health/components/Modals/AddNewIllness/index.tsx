import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import { illsDangerEnum } from 'types/common';

import './index.scss';

const AddNewIllnessModal: React.FC<{
  addNewIllness: (title: string,descr: string, danger: number, setMsg: (msg: string | null) => void) => void,
  onClose: (isOpen: boolean) => void
}> = ({ addNewIllness, onClose }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [danger, setDanger] = useState(1);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <PopUp title={t('health.mAddIllness')} closeModal={() => onClose(false)}>
      {
        msg ? <p className="addNewIllness__msg">{msg}</p> : null
      }
      <div className="addNewIllness__form">
        <Textinput maxlength={20} placeholder={`${t('common.title')}...`} onChange={(event) => setTitle(event.target.value)}/>
        <textarea
          className="addNewIllness__form__textarea"
          placeholder={`${t('common.description')}...`}
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <label>
          <p>{t('health.mChooseDanger')}</p>
          <select className="addFoodForDay__form__time" onChange={(event: any) => setDanger(+event.target.value)}>
            <option value={1}>{illsDangerEnum.none}</option>
            <option value={2}>{illsDangerEnum.small}</option>
            <option value={3}>{illsDangerEnum.medium}</option>
            <option value={4}>{illsDangerEnum.high}</option>
            <option value={5}>{illsDangerEnum.mortal}</option>
          </select>
        </label>
        <Button title={t('common.add')} onClick={() => addNewIllness(title, descr, danger, setMsg)} />
      </div>
    </PopUp>
  )
}

export default AddNewIllnessModal;
