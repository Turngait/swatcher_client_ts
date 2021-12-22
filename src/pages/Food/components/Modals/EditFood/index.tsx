import React, {useState} from 'react';

import PopUp from 'components/common/PopUp';
import DelIco from 'assets/icons/delete-ico.png';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import { IFood } from 'types/common';

import './index.scss';

const EditFoodModal: React.FC<{
  closeModal: (isOpen: boolean) => void,
  editFoodHandler: (food: IFood) => void,
  food: IFood
}> = ({closeModal, editFoodHandler, food}) => {
  const [title, setTitle] = useState<string>(food.title || ' ');
  const [callories, setCallories] = useState<number>(food.callories || 0);
  const [descr, setDescr] = useState<string>(food.descr || '');
  // const [harmfulness, setHarmfulness] = useState(1);

  const editFood = () => {
    editFoodHandler({
      id: food.id,
      title,
      callories,
      descr,
      groupId: food.groupId,
      createdAt: food.createdAt
    });
  }

  return (
    <PopUp>
      <img onClick={() => closeModal(false)} className="addNewFood__closeBtn" src={DelIco} alt="close modal"/>

      <h2 className="addNewFood__header">Редактировать {food.title}</h2>
      <div className="addNewFood__form">
        <Textinput value={title} placeholder="Название..." onChange={(event) => setTitle(event.target.value)}/>
        <Textinput value={callories} type="number" placeholder="Каллории..." onChange={(event) => setCallories(+event.target.value)}/>
        {/* <label>
          <p>Укажите вредность:</p>
          <select className="addFoodForDay__form__time" onChange={(event) => setHarmfulness(+event.target.value)}>
            <option value={1} selected>Отсутствует</option>
            <option value={2}>Минимальная</option>
            <option value={3}>Средняя</option>
            <option value={4}>Высокая</option>
            <option value={5}>очень вредная</option>
          </select>
        </label> */}
        <textarea
          className="addNewFood__form__textarea"
          placeholder="Описание (что входит)..."
          onChange={(event) => setDescr(event.target.value)}
          value={descr}
        >
        </textarea>
        <Button title="Сохранить" onClick={() => editFood()} />
      </div>
    </PopUp>
  )
}

export default EditFoodModal;
