import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const [title, setTitle] = useState<string>(food.title || ' ');
  const [calories, setCallories] = useState<number>(food.calories || 0);
  const [descr, setDescr] = useState<string>(food.descr || '');
  const [harmfulness, setHarmfulness] = useState(food.harmfulness);

  const editFood = () => {
    editFoodHandler({
      id: food.id,
      title,
      calories: calories,
      harmfulness,
      descr,
      groupId: food.groupId,
      createdAt: food.createdAt
    });
  }

  // TODO переделать на Enum
  const getHarmfullness = () => {
    if (harmfulness === 1) return t('common.minimum');
    if (harmfulness === 2) return t('common.low');
    if (harmfulness === 3) return t('common.medium');
    if (harmfulness === 4) return t('common.high');
    if (harmfulness === 5) return t('common.highest');
  }

  return (
    <PopUp title={t('common.edit')+food.title} closeModal={() => closeModal(false)}>
      <div className="addNewFood__form">
        <Textinput value={title} placeholder={`${t('common.title')}...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput value={calories} type="number" placeholder={`${t('foods.mCalories')}...`} onChange={(event) => setCallories(+event.target.value)}/>
        <label>
          <p>{t('foods.mHarmulness')}</p>
          <select className="addFoodForDay__form__time" onChange={(event) => setHarmfulness(+event.target.value)}>
            <option value={harmfulness}>Set: {getHarmfullness()}</option>
            <option value={1}>{t('common.minimum')}</option>
            <option value={2}>{t('common.low')}</option>
            <option value={3}>{t('common.medium')}</option>
            <option value={4}>{t('common.high')}</option>
            <option value={5}>{t('common.highest')}</option>
          </select>
        </label>
        <textarea
          className="addNewFood__form__textarea"
          placeholder={`${t('foods.mAdditionalInfo')}...`}
          onChange={(event) => setDescr(event.target.value)}
          value={descr}
        >
        </textarea>
        <Button title={t('common.save')} onClick={() => editFood()} />
      </div>
    </PopUp>
  )
}

export default EditFoodModal;
