import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import {IIllness} from 'types/common';

import './index.scss';

const AddIllnessForDayModal: React.FC<{
    illnesses: IIllness[],
    closeModal: (isOpen: boolean) => void,
    addIllnesForDay: (illnesId: string, power: number, duration: string, descr: string, time: string, date: string, setMsg:(msg: string | null) => void) => void
  }> = ({illnesses, closeModal, addIllnesForDay}) => {
    const { t } = useTranslation();

    const [selectedIll, setSelectedIll] = useState(illnesses[0].id || '');
    const [power, setPower] = useState(1);
    const [duration, setDuration] = useState('1');
    const [descr, setDescr] = useState('');
    const [time, setTime] = useState('09:00');
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));
    const [msg, setMsg] = useState<string | null>(null);
    
  return (
    <PopUp title={t('health.mNewIllnessForDay')} closeModal={() => closeModal(false)}>
      {
        msg ? <p className="addNewIllnessForDay__msg">{msg}</p> : null
      }
      <div className="addFoodForDay__form">
        <label>
          <p>{t('health.mChooseDay')}</p>
          <input value={date} className="addFoodForDay__form__time" type="date" onChange={(event) => setDate(event.target.value)}/>
        </label>
        <label>
          <p>{t('health.mChooseIllness')}</p>
          <select className="addFoodForDay__form__time" onChange={(event) => setSelectedIll(event.target.value)}>
            {
              illnesses.map((item: IIllness) => {
                return (
                  <option value={item.id} key={item.id}>{item.title}</option>
                )
              })
            }
          </select>
        </label>
        <label>
          <p>{t('health.mChoosePower')}</p>
          <select className="addFoodForDay__form__time" onChange={(event) => setPower(+event.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <Textinput maxValue={24} value={duration} type="number" placeholder={`${t('health.mDurationInHours')}...`} onChange={(event) => setDuration(event.target.value)}/>
        <label>
          <p>{t('health.mChooseTime')}</p>
          <input value={time} className="addFoodForDay__form__time" type="time" onChange={(event) => setTime(event.target.value)}/>
        </label>
        <textarea
          className="addFoodForDay__form__textarea"
          placeholder={`${t('health.mAdditionalInfo')}...`}
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <Button title={t('common.add')} onClick={() => addIllnesForDay(selectedIll, power, duration, descr, time, date, setMsg)} />
      </div>
    </PopUp>
  )
}

export default AddIllnessForDayModal;
