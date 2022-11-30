import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';
import Select from 'components/controls/Select';

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
          <Select 
            items={[
              {value: 1, title: t('common.minimum')},
              {value: 2, title: t('common.low')},
              {value: 3, title: t('common.medium')},
              {value: 4, title: t('common.high')},
              {value: 5, title: t('common.highest')}
            ]}
            defaultValue={1}
            onChange={(event) => setHarmfulness(+event.target.value)}
          /> 
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
