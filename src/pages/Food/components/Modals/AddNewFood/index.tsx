import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import './index.scss';

const AddNewFoodModal: React.FC<{
    addNewFood: (title: string, callories: number, units:string, harmfulness: number, descr: string, setMsg: (msg: string | null) => void) => void,
    closeModal: (isOpen: boolean) => void
  }> = ({ addNewFood, closeModal }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [callories, setCallories] = useState(0);
  const [descr, setDescr] = useState('');
  const [harmfulness, setHarmfulness] = useState(1);
  const [units, setUnits] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <PopUp title={t('foods.mAddFood')} closeModal={() => closeModal(false)}>
      {
        msg ? <p className="addNewIllness__msg">{msg}</p> : null
      }
      <div className="addNewFood__form">
        <Textinput placeholder={`${t('common.title')}...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput type="number" placeholder={`${t('foods.mCalories')}...`} onChange={(event) => setCallories(+event.target.value)}/>
        <Textinput placeholder={`${t('foods.mUnits')}...`} onChange={(event) => setUnits(event.target.value)}/>
        <label>
          <p>{t('foods.mHarmulness')}</p>
          <select className="addFoodForDay__form__time" onChange={(event) => setHarmfulness(+event.target.value)}>
            <option value={1} selected>{t('common.minimum')}</option>
            <option value={2}>{t('common.low')}</option>
            <option value={3}>{t('common.medium')}</option>
            <option value={4}>{t('common.high')}</option>
            <option value={5}>{t('common.highest')}</option>
          </select>
        </label>
        <textarea
          className="addNewFood__form__textarea"
          placeholder={`${t('foods.mAdditionalInfo')}...`}
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <Button title={t('common.add')} onClick={() => addNewFood(title, callories, units, harmfulness, descr, setMsg)} />
      </div>
    </PopUp>
  )
}

export default AddNewFoodModal;
