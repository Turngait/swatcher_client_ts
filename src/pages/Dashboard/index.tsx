/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import LeftMenu from '../../components/common/LeftMenu';
import MobileMenu from '../../components/common/MobileMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';
import AddForDayModal from './components/Modals/AddForDay';
import FirstSetUp from './components/FirstSetUp';
import Loader from 'components/common/Loader';
import PlsButton from 'components/controls/PlsButton';

import { IFood, IFoodStat, IIllness, IStat, IUserData } from 'types/common';

import { saveFirstSetupData, getInitData, addFoodForDay, getStatForPeriod, deleteIllnessForDayService, deleteFoodForDayService, addIllnessForDayService } from './services';
import { setUserData, setPeriod, setStat } from 'store/User/user.actions';
import './index.scss';

const Dashboard:React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const foods: [IFood] | [] = useSelector((state: any) => state.food.foods);
  const illnesses: IIllness[] | [] = useSelector((state: any) => state.health.illnesses);
  const userData: IUserData = useSelector((state: any) => state.user.userData);
  const period: string = useSelector((state: any) => state.user.period);
  const stats: IStat[] = useSelector((state: any) => state.user.stat);

  const [token, setToken] = useState('');
  const [isFirstSetUpOpen, setIsFirstSetUpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddForDayOpen, setIsAddForDayOpen] = useState(false);

  async function init(token: string, period: string) {
    setLoading(true);
    const { user, status, stat, foods, health } = await getInitData(token, period);

    if(status === 403) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      if (user && Array.isArray(stat) && foods && health) dispatch(setUserData(user, stat, foods.publicFoods, health));
      dispatch(setPeriod(period));
      setToken(token);
    }
    setLoading(false);
  }

  const exit = () => {
    localStorage.removeItem('token');
    history.push('/');
  }

  async function changePeriod(period: string): Promise<void> {
    init(token, period);
  }

  useEffect(() => {
    if(userData && userData.data.sex === '') setIsFirstSetUpOpen(true);
  }, [userData]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      init(token, period);
    } else {
      history.push('/');
    }
  }, []);

  const saveFirstSetUp = async (sex: string, age: number, weight: number, height: number) => {
    const { status } = await saveFirstSetupData(sex, age, weight, height, token);
    console.log(status);
    // TODO add show errors function
    if (status === 200) setIsFirstSetUpOpen(false);
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
  const addIllnesForDay = async (illnesId: string, power: number, duration: string, descr: string, time: string, date: string, setMsg:(msg: string | null) => void): Promise<void> => {
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

  // TODO add error processing
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
    <div className="dashboard">
      {
        loading ? <Loader /> : null
      }
      {
        isMenuOpen ? <MobileMenu closeMenu={setIsMenuOpen} logOut={exit}/> : null
      }
      {
        isAddForDayOpen
        ?
        <AddForDayModal
          closeModal={() => setIsAddForDayOpen(false)}
          addFoodForDay={addFoodForDayHandler}
          addIllnesForDay={addIllnesForDay}
          foods={foods}
          illnesses={illnesses}
        />
        : null
      }
      <LeftMenu />
      <div className="dashboard__info">
        {
          isFirstSetUpOpen ? <FirstSetUp saveData={saveFirstSetUp}/> : null
        }
        <Header openMenu={setIsMenuOpen} exit={exit} changePeriod={changePeriod} title={t('menu.stats')}/>
        <Info deleteIllnessForDay={deleteIllnessForDay} deleteFoodForDayHandler={deleteFoodForDayHandler} />
        <PlsButton onClick={() => setIsAddForDayOpen(true)} />
      </div>
    </div>
  );
}

export default Dashboard;
