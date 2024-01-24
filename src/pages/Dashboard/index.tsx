/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Info from './components/Info';
import AddForDayModal from './components/Modals/AddForDay';
import FirstSetUp from './components/FirstSetUp';
import Loader from '../../components/common/Loader';
import PlsButton from '../../components/controls/PlsButton';
import Overlay from 'components/common/Overlay';

import { IFood, IFoodStat, IIllness, IStat, IUserData } from '../../types/common';

import { saveFirstSetupData, addFoodForDay, getStatForPeriod, deleteIllnessForDayService, deleteFoodForDayService, addIllnessForDayService } from './services';
import { setStat } from '../../store/User/user.actions';


const Dashboard:React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const foods: IFood[] | [] = useSelector((state: any) => state.food.foods);
  const illnesses: IIllness[] | [] = useSelector((state: any) => state.health.illnesses);
  const userData: IUserData = useSelector((state: any) => state.user.userData);
  const period: string = useSelector((state: any) => state.user.period);
  const stats: IStat[] = useSelector((state: any) => state.user.stat);

  const token = localStorage.getItem('token');
  const [isFirstSetUpOpen, setIsFirstSetUpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddForDayOpen, setIsAddForDayOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if(userData && userData.data.sex === '') setIsFirstSetUpOpen(true);
  }, [userData]);

  const saveFirstSetUp = async (sex: string, age: number, weight: number, height: number): Promise<void> => {
    const { status } = await saveFirstSetupData(sex, age, weight, height, token || "");
    console.log(status);
    if (status === 200) setIsFirstSetUpOpen(false);
    else { 
      setMsg('Something goes wrong. Please, try again latter');
      setTimeout(() => setMsg(null), 3000);
    }
  }

  const addFoodForDayHandler = async (  
      foodId: string,
      amount: number,
      date: string,
      time: string,
      description: string,
      setMsg: (msg: string | null) => void
    ): Promise<void> => {
    setLoading(true);
    const food:IFoodStat = {
      food_id: foodId,
      amount,
      time,
      description
    };
    const { status, errors } = await addFoodForDay(food, date, token || '');
    if (status === 200) {
      setIsAddForDayOpen(false);
      const {stat} = await getStatForPeriod(period, token || '');
      if(stat) {
        dispatch(setStat(stat));
      }
    } else if(errors && errors.length) {
      setMsg(errors[0].msg || t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    } else {
      setMsg(t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    }
    setLoading(false);
  }
  const addIllnessForDay = async (illnesId: string, power: number, duration: string, descr: string, time: string, date: string, setMsg:(msg: string | null) => void): Promise<void> => {
    setLoading(true);
    const illness = {
      health_id: illnesId,
      power,
      duration,
      description: descr,
      begin: time
    };
    const {status, errors} = await addIllnessForDayService(illness, date, token);
    if (status === 200) {
      setIsAddForDayOpen(false);
      const {stat} = await getStatForPeriod(period, token || '');
      if(stat) {
        dispatch(setStat(stat));
      }
    } else if(errors && errors.length) {
      setMsg(errors[0].msg || t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    } else {
      setMsg(t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    }
    setLoading(false);
  }

  const deleteIllnessForDay = async (id: string, date: string): Promise<void> => {
    setLoading(true);
    const {status} = await deleteIllnessForDayService(id, date, token || '');
    if (status === 200) {
      for (const stat of stats) {
        if (stat.date === date) {
          stat.health = stat.health.filter((item: any) => item.id !== id);
        }
      }
      dispatch(setStat(stats));
    }
    else { 
      setMsg('Something goes wrong. Please, try again latter');
      setTimeout(() => setMsg(null), 3000);
    }
    setLoading(false);
  }
  
  const deleteFoodForDayHandler = async (id: string, date: string): Promise<void> => {
    setLoading(true);
    const { status } = await deleteFoodForDayService(id, date, token || '');
    if (status === 200) {
      for (const stat of stats) {
        if (stat.date === date) {
          stat.foods = stat.foods.filter((food: any) => food.id !== id);
        }
      }
      dispatch(setStat(stats));
    }
    setLoading(false);
  }

  return (
    <Overlay title={t('menu.stats')} setLoading={setLoading} history={history}>
      {
        loading ? <Loader /> : null
      }
      {
        isAddForDayOpen
        ?
        <AddForDayModal
          closeModal={() => setIsAddForDayOpen(false)}
          addFoodForDay={addFoodForDayHandler}
          addIllnesForDay={addIllnessForDay}
          foods={foods}
          illnesses={illnesses}
        />
        : null
      }
        {
          isFirstSetUpOpen ? <FirstSetUp saveData={saveFirstSetUp}/> : null
        }
        <Info msg={msg} deleteIllnessForDay={deleteIllnessForDay} deleteFoodForDayHandler={deleteFoodForDayHandler} />
        <PlsButton onClick={() => setIsAddForDayOpen(true)} />
    </Overlay>
  );
}

export default Dashboard;
