/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';
import {IFood} from 'types/common';

import Select, { ISelectOption } from 'components/controls/Select';

import './index.scss';


const AddForDayModal: React.FC<{
    foods: IFood[] | [], 
    addFoodForDay: (foodId: string, amount: number, date:string,  time: string, description: string, setMsg: (msg: string | null) => void) => Promise<void>
  }> = ({ addFoodForDay, foods }) => {
  const { t } = useTranslation();

  const [selectedFood, setSelectedFood] = useState(foods[0] ? foods[0].id : '');
  const [amount, setAmount] = useState(1);
  const [descr, setDescr] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString().slice(0, 5));
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [msg, setMsg] = useState<string | null>(null);
  const [foodOptions, setFoodOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    const temporaryFoodOptions = foods.map((item: IFood) => { return {value: item.id || '', title: item.title || '' }});
    setFoodOptions(temporaryFoodOptions);
  }, [])

  return (
    <>
      {
        msg ? <p className="addNewIllness__msg">{msg}</p> : null
      }
      <div className="addFoodForDay__form">
        {/* TODO move all selects to component */}
        {
            foods.length ? <>
              <label>
                <p>{t('foods.mChooseDay')}</p>
                <input value={date} className="addFoodForDay__form__time" type="date" onChange={(event) => setDate(event.target.value)}/>
              </label>
              <label>
              <p>{t('foods.mChooseFood')}</p>
              <Select 
                items={foodOptions}
                defaultValue={selectedFood || 0}
                onChange={(event) => setSelectedFood(event.target.value)}
              />
            </label>
          <label>
            <p>{t('foods.mAmount')}</p>
            <Textinput value={amount} type="number" placeholder={`${t('foods.mAmount')}...`} onChange={(event) => setAmount(+event.target.value)}/>
          </label>
          <label>
            <p>{t('foods.mChooseTime')}</p>
            <DatePicker
              value={time}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="addFoodForDay__form__time"
              onChange={(date: Date) => setTime(date.toLocaleTimeString().slice(0, 5))}
            />
          </label>
          <textarea
            className="addFoodForDay__form__textarea"
            placeholder={`${t('foods.mAdditionalInfo')}...`}
            onChange={(event) => setDescr(event.target.value)}
          >
          </textarea>
          <Button title={t('common.add')} onClick={() => addFoodForDay(selectedFood, amount, date, time, descr, setMsg)} />
        </> : null
        }
      </div>
    </>
  )
}

export default AddForDayModal;
