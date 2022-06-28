import React, { useState } from 'react';

import PopUp from 'components/common/PopUp';
import {IFood, IIllness} from 'types/common';

import "react-datepicker/dist/react-datepicker.css";
import './index.scss';
import AddFood from './AddFood';
import AddIllness from './AddIllness';

const AddForDayModal: React.FC<{
    foods: IFood[] | [],
    illnesses: IIllness[];
    closeModal: (isOpen: boolean) => void,
    addFoodForDay: (foodId: string, amount: number, date:string,  time: string, description: string, setMsg: (msg: string | null) => void) => Promise<void>
    addIllnesForDay: (illnesId: string, power: number, duration: string, descr: string, time: string, date: string, setMsg:(msg: string | null) => void) => void
  }> = ({ addFoodForDay, addIllnesForDay, closeModal, foods, illnesses }) => {
  const [isAddFoodOpen, setAddFoodOpen] = useState(false);
  const [isAddIllnesOpen, setAddIllnesOpen] = useState(true);
  const [title, setTitle] = useState('food');

  return (
    <PopUp title={`Add ${title} for day`} closeModal={() => closeModal(false)}>
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
