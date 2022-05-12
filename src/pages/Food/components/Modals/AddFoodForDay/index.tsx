import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';
import {IFood} from 'types/common';

import './index.scss';

const AddFoodForDayModal: React.FC<{
    foods: IFood[] | [], 
    closeModal: (isOpen: boolean) => void,
    addFoodForDay: (foodId: string, amount: number, date:string,  time: string, description: string, setMsg: (msg: string | null) => void) => Promise<void>
  }> = ({ addFoodForDay, closeModal, foods }) => {
  const { t } = useTranslation();

  const [selectedFood, setSelectedFood] = useState(foods[0].id || '');
  const [amount, setAmount] = useState(1);
  const [descr, setDescr] = useState('');
  const [time, setTime] = useState('09:00');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <PopUp title={t('foods.mAddFoodForDay')} closeModal={() => closeModal(false)}>
      {
        msg ? <p className="addNewIllness__msg">{msg}</p> : null
      }
      <div className="addFoodForDay__form">
        {/* TODO move all selects to component */}
        <label>
          <p>{t('foods.mChooseDay')}</p>
          <input value={date} className="addFoodForDay__form__time" type="date" onChange={(event) => setDate(event.target.value)}/>
        </label>
        <label>
          <p>{t('foods.mChooseFood')}</p>
          <select className="addFoodForDay__form__time" onChange={(event) => setSelectedFood(event.target.value)}>
            {
              foods.map((food) => {
                return (
                  <option value={food.id} key={food.id}>{food.title}</option>
                )
              })
            }
          </select>
        </label>

        <Textinput value={amount} type="number" placeholder={`${t('foods.mAmount')}...`} onChange={(event) => setAmount(+event.target.value)}/>
        <label>
          <p>{t('foods.mChooseTime')}</p>
          <input value={time} className="addFoodForDay__form__time" type="time" onChange={(event) => setTime(event.target.value)}/>
        </label>
        <textarea
          className="addFoodForDay__form__textarea"
          placeholder={`${t('foods.mAdditionalInfo')}...`}
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <Button title={t('common.add')} onClick={() => addFoodForDay(selectedFood, amount, date, time, descr, setMsg)} />
      </div>
    </PopUp>
  )
}

export default AddFoodForDayModal;
