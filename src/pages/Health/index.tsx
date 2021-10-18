import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';
import AddNewIllnessModal from './components/Modals/AddNewIllness';
import AddIllnessForDayModal from './components/Modals/AddIllnessForDay';

import {addNewIllnessService, addIllnessForDayService, deleteIllnessService, deleteIllnessForDayService} from './services';
import {setAllHealth} from 'store/Health/health.actions';
import { setStat } from 'store/User/user.actions';

import {IIllness} from 'types/common';

import './index.scss';

//TODO сделать уведомления в случае ошибки сервера по разным функциям. Поправить везде функционал по добавлению
const HealthPage:React.FC<any> = () => {
  const dispatch = useDispatch();

  const [isAddIllnessOpen, setIsAddIllnessOpen] = useState(false);
  const [isAddIllnessForDayOpen, setIsAddIllnessForDayOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const illnesses: IIllness[] | [] = useSelector((state: any) => state.health.illnesses);
  const stats = useSelector((state: any) => state.user.stat);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) setToken(token);
   }, []);

  const addNewIllness = async (title: string, descr: string): Promise<void> => {
    const { status } = await addNewIllnessService(title, descr, token);
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
    setIsAddIllnessForDayOpen(false);
  }

  async function changePeriod(period: string): Promise<void> {
    console.log(period);
  }

  const deleteIllness = async (id: string): Promise<void> => {
    const { status } = await deleteIllnessService(id, token || '');
    if(status === 200) {
      const newFoods = illnesses.filter((item) => item.id !== id);
      dispatch(setAllHealth(newFoods));
    }
  }

  //TODO добавить обработку ошибок и вывод ошибок и добавить реактивности
  const deleteIllnessForDay = async (id: string, date: string): Promise<void> => {
    const {status} = await deleteIllnessForDayService(id, date, token || '');
    console.log(id)
    console.log(status)
    if (status === 200) {
      for (const stat of stats) {
        if (stat.date === date) {
          stat.health = stat.health.filter((item: any) => item.id !== id);
        }
      }
      dispatch(setStat(stats));
    }
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
        <Info
          deleteIllnessForDay={deleteIllnessForDay}
          deleteIllness={deleteIllness}
          setIsAddIllnessForDayOpen={setIsAddIllnessForDayOpen}
          setIsAddIllnessOpen={setIsAddIllnessOpen}
        />
      </div>
    </div>
  )
}

export default HealthPage;
