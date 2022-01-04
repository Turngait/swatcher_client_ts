import React, { useState } from 'react';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';
import {IFood} from 'types/common';

import './index.scss';

const AddFoodForDayModal: React.FC<{
    foods: IFood[] | [], 
    closeModal: (isOpen: boolean) => void,
    addFoodForDay: (foodId: string, amount: number, date:string,  time: string, description: string) => Promise<void>
  }> = ({ addFoodForDay, closeModal, foods }) => {
  const [selectedFood, setSelectedFood] = useState(foods[0].id || '');
  const [amount, setAmount] = useState(1);
  const [descr, setDescr] = useState('');
  const [time, setTime] = useState('09:00');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));

  return (
    <PopUp title="Добавить еду на день" closeModal={() => closeModal(false)}>
      <div className="addFoodForDay__form">
        {/* TODO перенести все инпуты и селект в отдельный компонент */}
        <label>
          <p>Введите день:</p>
          <input value={date} className="addFoodForDay__form__time" type="date" onChange={(event) => setDate(event.target.value)}/>
        </label>
        <label>
          <p>Выбирите еду:</p>
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

        <Textinput value={amount} type="number" placeholder="Колличество..." onChange={(event) => setAmount(+event.target.value)}/>
        <label>
          <p>Введите время приема пищи:</p>
          <input value={time} className="addFoodForDay__form__time" type="time" onChange={(event) => setTime(event.target.value)}/>
        </label>
        <textarea
          className="addFoodForDay__form__textarea"
          placeholder="Дополнительная информация (по желанию)..."
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <Button title="Добавить" onClick={() => addFoodForDay(selectedFood, amount, date, time, descr)} />
      </div>
    </PopUp>
  )
}

export default AddFoodForDayModal;
