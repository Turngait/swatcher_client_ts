import React, { useState } from 'react';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';
import DelIco from 'assets/icons/delete-ico.png';

import './index.scss';

const AddNewIllnessModal: React.FC<{addNewIllness: (title: string, descr: string) => void}> = ({ addNewIllness }) => {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');

  return (
    <PopUp>
      <img onClick={() => console.log(false)} className="addNewFood__closeBtn" src={DelIco} alt="close modal"/>

      <h2 className="addNewIllness__header">Добавить недомогание</h2>
      <div className="addNewIllness__form">
        <Textinput placeholder="Название..." onChange={(event) => setTitle(event.target.value)}/>
        <textarea
          className="addNewIllness__form__textarea"
          placeholder="Описание..."
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <Button title="Добавить" onClick={() => addNewIllness(title, descr)} />
      </div>
    </PopUp>
  )
}

export default AddNewIllnessModal;
