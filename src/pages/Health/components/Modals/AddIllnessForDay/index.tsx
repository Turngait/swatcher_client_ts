import React, { useState } from 'react';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';
import DelIco from 'assets/icons/delete-ico.png';

import {IIllness} from 'types/common';

import './index.scss';

const AddIllnessForDayModal: React.FC<{
    illnesses: IIllness[],
    closeModal: (isOpen: boolean) => void,
    addIllnesForDay: (illnesId: string, power: number, duration: string, descr: string, time: string, date: string, setMsg:(msg: string | null) => void) => void
  }> = ({illnesses, closeModal, addIllnesForDay}) => {
    const [selectedIll, setSelectedIll] = useState(illnesses[0].id || '');
    const [power, setPower] = useState(1);
    const [duration, setDuration] = useState('1');
    const [descr, setDescr] = useState('');
    const [time, setTime] = useState('09:00');
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));
    const [msg, setMsg] = useState<string | null>(null);
    
  return (
    <PopUp>
      <img onClick={() => closeModal(false)} className="addNewFood__closeBtn" src={DelIco} alt="close modal"/>

      <h2 className="addNewIllnessForDay__header">Добавить недомогание на день</h2>
      {
        msg ? <p className="addNewIllnessForDay__msg">{msg}</p> : null
      }
      <div className="addFoodForDay__form">
        <label>
          <p>Введите день:</p>
          <input value={date} className="addFoodForDay__form__time" type="date" onChange={(event) => setDate(event.target.value)}/>
        </label>
        <label>
          <p>Выбирите недомагание:</p>
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
          <p>Выбирите силу:</p>
          <select className="addFoodForDay__form__time" onChange={(event) => setPower(+event.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <Textinput maxValue={24} value={duration} type="number" placeholder="Продолжительность в мин (примерно)..." onChange={(event) => setDuration(event.target.value)}/>
        <label>
          <p>Введите время начала (примерное):</p>
          <input value={time} className="addFoodForDay__form__time" type="time" onChange={(event) => setTime(event.target.value)}/>
        </label>
        <textarea
          className="addFoodForDay__form__textarea"
          placeholder="Дополнительная информация (по желанию)..."
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <Button title="Добавить" onClick={() => addIllnesForDay(selectedIll, power, duration, descr, time, date, setMsg)} />
      </div>
    </PopUp>
  )
}

export default AddIllnessForDayModal;
