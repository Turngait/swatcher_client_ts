import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactSelect from 'react-select'

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';
import Select from 'components/controls/Select';
import CloseIco from 'assets/icons/close_ico2.png';

import './index.scss';
import AddNewFoodGroupModal from './AddFoodGroup';

const AddNewFoodModal: React.FC<{
    addNewFood: (title: string, units: string, harmfulness: number, groupId: string, descr: string, isIngredient: boolean, ingredients: any, setMsg: (msg: string | null) => void) => void,
    closeModal: (isOpen: boolean) => void,
    addFoodGroup: (title: string) => Promise<{ id: string, status: number }>
    ingredients: any,
    foodsGroups: any[],
  }> = ({ addNewFood, closeModal, ingredients, foodsGroups, addFoodGroup }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [harmfulness, setHarmfulness] = useState(1);
  const [units, setUnits] = useState('');
  const [isIngredient, setIsIngredient] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [choosingIngredients, setChoosingIngredients] = useState<any>([]);
  const [isAddGroupOpen, setIsAddPlaceOpen] = useState<boolean>(false);
  const [groupId, setGroupId] = useState(foodsGroups[0]._id || '');
  const [groups, setGroups] = useState(foodsGroups);
  
  const checkIsGroupExist = (title: string, groups: any[]): boolean => {
    for (const group of groups) {
      if (title === group.title) return true;
    }
    return false;
  }
  const addFoodGroupHandle = async (groupTitle: string): Promise<any> => {
    if(checkIsGroupExist(groupTitle, groups)) {
      setMsg("Group already exist.");
      setTimeout(() => setMsg(null), 2000);
      return;
    }
    const data = await addFoodGroup(groupTitle);
    if (data.status === 500) {
      setMsg("Something goes wrong. Try later.");
    } else {
      setGroups([...foodsGroups, { _id: data.id, title: groupTitle }]);
    }
    setIsAddPlaceOpen(false);
  }

  return (
    <PopUp title={t('foods.mAddFood')} closeModal={() => closeModal(false)}>
      {
        msg ? <p className="addNewIllness__msg">{msg}</p> : null
      }
      <div className="addNewFood__form">
        <Textinput placeholder={`${t('common.title')}...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput placeholder={`${t('foods.mUnits')}...`} onChange={(event) => setUnits(event.target.value)}/>
        <label>
          <p>{t('foods.mHarmulness')}</p>
          <Select 
            items={[
              {value: 1, title: t('common.minimum')},
              {value: 2, title: t('common.low')},
              {value: 3, title: t('common.medium')},
              {value: 4, title: t('common.high')},
              {value: 5, title: t('common.highest')}
            ]}
            defaultValue={1}
            onChange={(event) => setHarmfulness(+event.target.value)}
          />
        </label>
        <label>
          <p>Choose food group</p>
          <div className="addNewIllness__form__selectBox">
            <select className="addFoodForDay__form__time" onChange={(event: any) => setGroupId(event.target.value)}>
              {
                groups.map(group => {
                  return <option key={group._id || ''} value={group._id}>{group.title}</option>
                })
              }
            </select>
            <button className="addNewIllness__form__selectBox__plsBtn" onClick={() => setIsAddPlaceOpen(!isAddGroupOpen)}>
              {
                isAddGroupOpen ? <img className="addNewIllness__form__selectBox__plsBtn__clsIcon" src={CloseIco} alt="close"/> : <span>+</span>
              }
            </button>
          </div>
          {
            isAddGroupOpen ? <AddNewFoodGroupModal addNewGroup={addFoodGroupHandle} /> : null
          }
        </label>
        <label>
          <input className='addNewFood__form__checkbox' type="checkbox" onChange={(event) => setIsIngredient(event.target.checked) } />
          {t('foods.isIngredient')}
        </label>
        {
          isIngredient && !ingredients.length ? null : (
            <label>
              Select ingredients (optional)
              <ReactSelect
                defaultValue={[]}
                isMulti
                options={ingredients.map((item: any) => {return { value: item.id, label: item.title }})}
                className="basic-multi-select"
                classNamePrefix="select"
                isSearchable={true}
                isClearable={true}
                onChange={(event) => setChoosingIngredients(event)}
              />
            </label>
          )
        }
        <textarea
          className="addNewFood__form__textarea"
          placeholder={`${t('foods.mAdditionalInfo')}...`}
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <Button
          title={t('common.add')}
          onClick={() => addNewFood(title, units, harmfulness, groupId, descr, isIngredient, choosingIngredients.map((item: any) => {return item.value}), setMsg)} 
        />
      </div>
    </PopUp>
  )
}

export default AddNewFoodModal;
