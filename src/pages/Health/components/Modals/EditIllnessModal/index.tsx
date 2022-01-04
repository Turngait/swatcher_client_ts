import React, {useState} from 'react';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import { illsDangerEnum } from 'types/common';

import { IIllness } from 'types/common';

import './index.scss';

const EditIllnessModal: React.FC<{
  illness: IIllness,
  closeModal: (isOpen: boolean) => void,
  saveChangesOnIllness: (title: string, descr: string, danger: number, id: string) => void
}> = ({ illness, closeModal, saveChangesOnIllness }) => {
  const [title, setTitle] = useState(illness.title);
  const [descr, setDescr] = useState(illness.descr);
  const [danger, setDanger] = useState(+illness.danger);

  const showDangerName = (danger: number) => {
    if (!danger) return 'Неопределено';
    if (danger === 1) return illsDangerEnum.none;
    if (danger === 2) return illsDangerEnum.small;
    if (danger === 3) return illsDangerEnum.medium;
    if (danger === 4) return illsDangerEnum.high;
    if (danger === 5) return illsDangerEnum.mortal;
  }

  return (
    <PopUp title={`Редактировать ${illness.title}`} closeModal={() => closeModal(false)}>
      <div className="addNewFood__form">
        <Textinput value={title} maxlength={20} placeholder="Название..." onChange={(event) => setTitle(event.target.value)}/>
        <label>
          <p>Выбирите опасность:</p>
          <select className="addFoodForDay__form__time" onChange={(event: any) => setDanger(event.target.value)}>
            <option value={danger}>Установлена: {showDangerName(danger)}</option>
            <option value={1}>{illsDangerEnum.none}</option>
            <option value={2}>{illsDangerEnum.small}</option>
            <option value={3}>{illsDangerEnum.medium}</option>
            <option value={4}>{illsDangerEnum.high}</option>
            <option value={5}>{illsDangerEnum.mortal}</option>
          </select>
        </label>
        <textarea
          className="addNewIllness__form__textarea"
          placeholder="Описание..."
          onChange={(event) => setDescr(event.target.value)}
          value={descr}
        >
        </textarea>
         <Button title="Добавить" onClick={() => saveChangesOnIllness(title, descr, danger, illness.id || '')} />

      </div>
    </PopUp>
  )
}

export default EditIllnessModal;
