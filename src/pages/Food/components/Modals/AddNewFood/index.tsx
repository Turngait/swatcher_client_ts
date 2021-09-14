import React, { useState } from 'react';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import './index.scss';

const AddNewFoodModal: React.FC<{addNewFood: (title: string, callories: number, descr: string) => void}> = ({ addNewFood }) => {
  const [title, setTitle] = useState('');
  const [callories, setCallories] = useState(0);
  const [descr, setDescr] = useState('');

  return (
    <PopUp>
      <h2 className="addNewFood__header">Добавить еду</h2>
      <div className="addNewFood__form">
        <Textinput placeholder="Название..." onChange={(event) => setTitle(event.target.value)}/>
        <Textinput type="number" placeholder="Каллории..." onChange={(event) => setCallories(+event.target.value)}/>
        <textarea
          className="addNewFood__form__textarea"
          placeholder="Описание (что входит)..."
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <Button title="Добавить" onClick={() => addNewFood(title, callories, descr)} />
      </div>
    </PopUp>
  )
}

export default AddNewFoodModal;
