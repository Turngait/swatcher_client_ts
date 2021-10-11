import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';
import AddNewIllnessModal from './components/Modals/AddNewIllness';
import AddIllnessForDayModal from './components/Modals/AddIllnessForDay';

import {addNewIllnessService, addIllnessForDayService} from './services';

import {IIllness} from 'types/common';

import './index.scss';

const HealthPage:React.FC<any> = () => {
  const [isAddIllnessOpen, setIsAddIllnessOpen] = useState(false);
  const [isAddIllnessForDayOpen, setIsAddIllnessForDayOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const illnesses: IIllness[] | [] = useSelector((state: any) => state.health.illnesses);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) setToken(token);
   }, []);

  const addNewIllness = async (title: string, descr: string): Promise<void> => {
    const { status } = await addNewIllnessService(title, descr, token);
    console.log(status);
    if (status === 200) setIsAddIllnessOpen(false);
  }
  const addIllnesForDay = async (illnesId: string, power: number, duration: string, descr: string, time: string, date: string): Promise<void> => {
    console.log(date);
    const illness = {
      health_id: illnesId,
      power,
      duration,
      description: descr,
      begin: time
    };
    const {status} = await addIllnessForDayService(illness, date, token);
    console.log(status);
  }

  async function changePeriod(period: string): Promise<void> {
    console.log(period);
  }

  return (
    <div className="healthPage">
      {
        isAddIllnessOpen ? <AddNewIllnessModal addNewIllness={addNewIllness}/> : null
      }
      {
        isAddIllnessForDayOpen ? <AddIllnessForDayModal illnesses={illnesses} addIllnesForDay={addIllnesForDay} closeModal={setIsAddIllnessForDayOpen} /> : null
      }
      <LeftMenu />
      <div className="foodPage__info">
        <Header changePeriod={changePeriod} title="Health"/>
        <Info setIsAddIllnessForDayOpen={setIsAddIllnessForDayOpen} setIsAddIllnessOpen={setIsAddIllnessOpen}/>
      </div>
    </div>
  )
}

export default HealthPage;
