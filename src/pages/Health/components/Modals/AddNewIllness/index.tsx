import React, { useState } from 'react';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';
import DelIco from 'assets/icons/delete-ico.png';

import { illsDangerEnum } from 'types/common';

import './index.scss';

const AddNewIllnessModal: React.FC<{
  addNewIllness: (title: string,descr: string, danger: string, setMsg: (msg: string | null) => void) => void,
  onClose: (isOpen: boolean) => void
}> = ({ addNewIllness, onClose }) => {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [danger, setDanger] = useState(illsDangerEnum.none);
  const [msg, setMsg] = useState<string | null>(null);


  return (
    <PopUp>
      <img onClick={() => onClose(false)} className="addNewFood__closeBtn" src={DelIco} alt="close modal"/>

      <h2 className="addNewIllness__header">Добавить недомогание</h2>
      {
        msg ? <p className="addNewIllness__msg">{msg}</p> : null
      }
      <div className="addNewIllness__form">
        <Textinput maxlength={20} placeholder="Название..." onChange={(event) => setTitle(event.target.value)}/>
        <textarea
          className="addNewIllness__form__textarea"
          placeholder="Описание..."
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <label>
          <p>Выбирите опасность:</p>
          <select className="addFoodForDay__form__time" onChange={(event: any) => setDanger(event.target.value)}>
            <option value={illsDangerEnum.none}>{illsDangerEnum.none}</option>
            <option value={illsDangerEnum.small}>{illsDangerEnum.small}</option>
            <option value={illsDangerEnum.medium}>{illsDangerEnum.medium}</option>
            <option value={illsDangerEnum.high}>{illsDangerEnum.high}</option>
            <option value={illsDangerEnum.mortal}>{illsDangerEnum.mortal}</option>
          </select>
        </label>
        <Button title="Добавить" onClick={() => addNewIllness(title, descr, danger, setMsg)} />
      </div>
    </PopUp>
  )
}

export default AddNewIllnessModal;
