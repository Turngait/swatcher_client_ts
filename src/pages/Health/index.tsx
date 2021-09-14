import React, { useState, useEffect } from 'react';

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';
import AddNewIllnessModal from './components/Modals/AddNewIllness';

import {addNewIllnessService} from './services';

import './index.scss';

const HealthPage:React.FC<any> = () => {
  const [isAddIllnessOpen, setIsAddIllnessOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) setToken(token);
   }, [token]);

  const addNewIllness = async (title: string, descr: string): Promise<void> => {
    const { status } = await addNewIllnessService(title, descr, token);
    console.log(status);
    if (status === 200) setIsAddIllnessOpen(false);
  }
  return (
    <div className="healthPage">
      {
        isAddIllnessOpen ? <AddNewIllnessModal addNewIllness={addNewIllness}/> : null
      }
      <LeftMenu />
      <div className="foodPage__info">
        <Header title="Health"/>
        <Info setIsAddIllnessOpen={setIsAddIllnessOpen}/>
      </div>
    </div>
  )
}

export default HealthPage;
