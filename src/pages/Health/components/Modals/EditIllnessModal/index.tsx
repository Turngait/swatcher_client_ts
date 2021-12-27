import React, {useState} from 'react';

import PopUp from 'components/common/PopUp';
import DelIco from 'assets/icons/delete-ico.png';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import { IIllness } from 'types/common';

import './index.scss';

const EditIllnessModal: React.FC<{
  illness: IIllness,
  closeModal: (isOpen: boolean) => void,
  saveChangesOnIllness: (title: string, descr: string, id: string) => void
}> = ({ illness, closeModal, saveChangesOnIllness }) => {
  const [title, setTitle] = useState(illness.title);
  const [descr, setDescr] = useState(illness.descr);
  return (
    <PopUp>

      <img onClick={() => closeModal(false)} className="addNewFood__closeBtn" src={DelIco} alt="close modal"/>

      <h2 className="addNewFood__header">Редактировать {illness.title}</h2>
      <div className="addNewFood__form">
        <Textinput value={title} maxlength={20} placeholder="Название..." onChange={(event) => setTitle(event.target.value)}/>
          <textarea
            className="addNewIllness__form__textarea"
            placeholder="Описание..."
            onChange={(event) => setDescr(event.target.value)}
            value={descr}
          >
          </textarea>
         <Button title="Добавить" onClick={() => saveChangesOnIllness(title, descr, illness.id || '')} />

      </div>
    </PopUp>
  )
}

export default EditIllnessModal;
