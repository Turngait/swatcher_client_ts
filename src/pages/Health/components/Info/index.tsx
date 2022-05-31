import React, { useState } from 'react';
import Button from 'components/controls/Button';
import { BtnSize } from 'types/components';

import Stats from './Stats';
import AllIllness from './AllIllness';

import './index.scss';
import AllMyFoodMobile from '../Modals/AllMyIllnessMobile';

const Info: React.FC<{
    setIsAddIllnessOpen: (isOpen: boolean) => void,
    setIsAddIllnessForDayOpen: (isOpen: boolean) => void,
    deleteIllness: (id: string) => void,
    deleteIllnessForDay: (id: string, date: string) => void,
    openEditIllness: (id: string) => void
  }> = ({setIsAddIllnessOpen, setIsAddIllnessForDayOpen, deleteIllness, deleteIllnessForDay, openEditIllness}) => {
    const [isAllMyIllnessOpen, setIsAllMyIllnessOpen] = useState(false);

  return(
    <div className="healthInfo">
      {
        isAllMyIllnessOpen 
          ? <AllMyFoodMobile
              setIsAddIllnessOpen={() => setIsAddIllnessOpen(true)}
              closeModal={() => setIsAllMyIllnessOpen(false)}
              onDeleteIllness={deleteIllness}
              onEditIllness={openEditIllness}
            /> 
          : null
      }
      <Stats  deleteIllnessForDay={deleteIllnessForDay} setIsAddIllnessForDayOpen={setIsAddIllnessForDayOpen}/>
      <AllIllness deleteIllness={deleteIllness} setIsAddIllnessOpen={setIsAddIllnessOpen} openEditIllness={openEditIllness} />
      <Button className='healthInfo__myIllnessMobileBtn' size={BtnSize.largeBtn} title='All my Illness' onClick={() => setIsAllMyIllnessOpen(true)}/>
    </div>
  )
}

export default Info;
