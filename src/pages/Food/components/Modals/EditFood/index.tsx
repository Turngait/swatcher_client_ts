import React, {useState} from 'react';

import PopUp from 'components/common/PopUp';
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
  const [harmfulness, setHarmfulness] = useState(food.harmfulness);

  const editFood = () => {
    editFoodHandler({
      id: food.id,
      title,
      callories,
      harmfulness,
      descr,
      groupId: food.groupId,
      createdAt: food.createdAt
    });
  }

  // TODO переделать на Enum
  const getHarmfullness = () => {
    if (harmfulness === 1) return 'Минимальная';
    if (harmfulness === 2) return 'Низкая';
    if (harmfulness === 3) return 'Средняя';
    if (harmfulness === 4) return 'Высокая';
    if (harmfulness === 5) return 'Очень вредная';
  }

  return (
    <PopUp title={"Редактировать"+food.title} closeModal={() => closeModal(false)}>
      <div className="addNewFood__form">
        <Textinput value={title} placeholder="Название..." onChange={(event) => setTitle(event.target.value)}/>
        <Textinput value={callories} type="number" placeholder="Каллории..." onChange={(event) => setCallories(+event.target.value)}/>
        <label>
          <p>Укажите вредность:</p>
          <select className="addFoodForDay__form__time" onChange={(event) => setHarmfulness(+event.target.value)}>
            <option value={harmfulness}>Установлено: {getHarmfullness()}</option>
            <option value={1}>Минимальная</option>
            <option value={2}>Низкая</option>
            <option value={3}>Средняя</option>
            <option value={4}>Высокая</option>
            <option value={5}>Очень вредная</option>
          </select>
        </label>
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
