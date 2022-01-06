import React, { useState } from 'react';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import './index.scss';

const AddNewFoodModal: React.FC<{
    addNewFood: (title: string, callories: number, units:string, harmfulness: number, descr: string) => void,
    closeModal: (isOpen: boolean) => void
  }> = ({ addNewFood, closeModal }) => {
  const [title, setTitle] = useState('');
  const [callories, setCallories] = useState(0);
  const [descr, setDescr] = useState('');
  const [harmfulness, setHarmfulness] = useState(1);
  const [units, setUnits] = useState('');

  return (
    <PopUp title="Добавить еду" closeModal={() => closeModal(false)}>
      <div className="addNewFood__form">
        <Textinput placeholder="Название..." onChange={(event) => setTitle(event.target.value)}/>
        <Textinput type="number" placeholder="Каллории..." onChange={(event) => setCallories(+event.target.value)}/>
        <Textinput placeholder="Единицы измерения..." onChange={(event) => setUnits(event.target.value)}/>
        <label>
          <p>Укажите вредность:</p>
          <select className="addFoodForDay__form__time" onChange={(event) => setHarmfulness(+event.target.value)}>
            <option value={1} selected>Минимальная</option>
            <option value={2}>Низкая</option>
            <option value={3}>Средняя</option>
            <option value={4}>Высокая</option>
            <option value={5}>очень вредная</option>
          </select>
        </label>
        <textarea
          className="addNewFood__form__textarea"
          placeholder="Описание (что входит)..."
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <Button title="Добавить" onClick={() => addNewFood(title, callories, units, harmfulness, descr)} />
      </div>
    </PopUp>
  )
}

export default AddNewFoodModal;
