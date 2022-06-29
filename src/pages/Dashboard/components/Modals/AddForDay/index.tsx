import React, { useState } from 'react';

import PopUp from 'components/common/PopUp';
import {IFood, IIllness} from 'types/common';
import AddFood from './AddFood';
import AddIllness from './AddIllness';

import "react-datepicker/dist/react-datepicker.css";
import './index.scss';


const AddForDayModal: React.FC<{
    foods: IFood[] | [],
    illnesses: IIllness[];
    closeModal: (isOpen: boolean) => void,
    addFoodForDay: (foodId: string, amount: number, date:string,  time: string, description: string, setMsg: (msg: string | null) => void) => Promise<void>
    addIllnesForDay: (illnesId: string, power: number, duration: string, descr: string, time: string, date: string, setMsg:(msg: string | null) => void) => void
  }> = ({ addFoodForDay, addIllnesForDay, closeModal, foods, illnesses }) => {
  const [isAddFoodOpen, setAddFoodOpen] = useState(true);
  const [isAddIllnesOpen, setAddIllnesOpen] = useState(false);
  const [title, setTitle] = useState('food');

  const toggleTabHandler = (tab: string) => {
    if (tab === "food") {
      setAddIllnesOpen(false);
      setAddFoodOpen(true);
    }
    if (tab === "symptom") {
      setAddIllnesOpen(true);
      setAddFoodOpen(false);
    }
    setTitle(tab);
  }

  return (
    <PopUp title={`Add ${title} for day`} closeModal={() => closeModal(false)}>
      <form className='addForDay__radioBox'>
        <label className={`addForDay__radioBox__item ${isAddFoodOpen ? 'addForDay__radioBox__item__active' : ''}`} onClick={() => toggleTabHandler("food")}>
          <div className='addForDay__radioBox__item__title'>Food</div>
          <input type="radio" name="tab" className='addForDay__radioBox__item__inp' />
        </label>
        <label className={`addForDay__radioBox__item ${isAddIllnesOpen ? 'addForDay__radioBox__item__active' : ''}`} onClick={() => toggleTabHandler("symptom")}>
          <div className='addForDay__radioBox__item__title'>Health</div>
          <input type="radio" name="tab" className='addForDay__radioBox__item__inp' />
        </label>
      </form>
      {
        isAddFoodOpen ? <AddFood addFoodForDay={addFoodForDay} foods={foods}/> : null
      }
      {
        isAddIllnesOpen ? <AddIllness addIllnesForDay={addIllnesForDay} illnesses={illnesses} /> : null
      }
    </PopUp>
  )
}

export default AddForDayModal;
