import React, { useState } from 'react';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';
import DelIco from 'assets/icons/delete-ico.png';

import './index.scss';

const AddNewFoodModal: React.FC<{
    addNewFood: (title: string, callories: number, descr: string) => void,
    closeModal: (isOpen: boolean) => void
  }> = ({ addNewFood, closeModal }) => {
  const [title, setTitle] = useState('');
  const [callories, setCallories] = useState(0);
  const [descr, setDescr] = useState('');

  return (
    <PopUp>
      <img onClick={() => closeModal(false)} className="addNewFood__closeBtn" src={DelIco} alt="close modal"/>

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
