import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';
import AddNewIllnessModal from './components/Modals/AddNewIllness';
import AddIllnessForDayModal from './components/Modals/AddIllnessForDay';
import EditIllnessModal from './components/Modals/EditIllnessModal';
import Loader from 'components/common/Loader';

import {
  addNewIllnessService,
  addIllnessForDayService,
  deleteIllnessService,
  deleteIllnessForDayService,
  getStatForPeriod,
  editIllnessService
} from './services';
import {setAllHealth} from 'store/Health/health.actions';
import { setStat, setPeriod } from 'store/User/user.actions';

import {IIllness} from 'types/common';

import './index.scss';

//TODO сделать уведомления в случае ошибки сервера по разным функциям. Поправить везде функционал по добавлению
const HealthPage:React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isAddIllnessOpen, setIsAddIllnessOpen] = useState(false);
  const [isAddIllnessForDayOpen, setIsAddIllnessForDayOpen] = useState(false);
  const [isEditIllnessOpen, setIsEditIllnessOpen] = useState(false);

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editableIllness, setEditableIllness] = useState<IIllness | null>(null);

  const illnesses: IIllness[] | [] = useSelector((state: any) => state.health.illnesses);
  const stats = useSelector((state: any) => state.user.stat);
  const period: string = useSelector((state: any) => state.user.period);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) setToken(token);
   }, []);

   const exit = () => {
    localStorage.removeItem('token');
    history.push('/');
  }
  const addNewIllness = async (title: string, descr: string, danger: number, setMsg: (msg: string | null) => void): Promise<void> => {
    setLoading(true);
    const { status, id, errors } = await addNewIllnessService(title, descr, danger, token);

    if (status === 200) {
      setIsAddIllnessOpen(false);

      const ill: IIllness = {
        id,
        title,
        danger,
        descr
      };

      const newIllnesses = [...illnesses, ill];
      dispatch(setAllHealth(newIllnesses));
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
      setIsAddIllnessForDayOpen(false);
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

  async function changePeriod(period: string): Promise<void> {
    setLoading(true);
    const {stat} = await getStatForPeriod(period, token || '');
    if(stat) {
      dispatch(setStat(stat));
      dispatch(setPeriod(period));
    }
    setLoading(false);
  }

  const deleteIllness = async (id: string): Promise<void> => {
    setLoading(true);
    const { status } = await deleteIllnessService(id, token || '');
    if(status === 200) {
      const newIlls = illnesses.filter((item) => item.id !== id);
      dispatch(setAllHealth(newIlls));
    }
    setLoading(false);
  }

  const openEditIllness = (id: string) => {
    const editableIllness = illnesses.filter(((item: IIllness) => item.id === id));
    if(editableIllness) {
      setEditableIllness(editableIllness[0]);
      setIsEditIllnessOpen(true);
    }
  }

  const saveChangesOnIllness = async(title: string, descr: string, danger: number, id: string) => {
    const { status } = await editIllnessService(title, descr, danger, id, token || '');
    if (status === 200) {
      for (const idx in illnesses) {
        if (illnesses[idx].id === id) {
          illnesses[idx].title = title;
          illnesses[idx].descr = descr;
          illnesses[idx].danger = danger;
        } 
      }
      dispatch(setAllHealth(illnesses));
    }
    setIsEditIllnessOpen(false);
  }

  //TODO add error processing
  const deleteIllnessForDay = async (id: string, date: string): Promise<void> => {
    setLoading(true);
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
    setLoading(false);
  }

  return (
    <div className="healthPage">
      {
        loading ? <Loader /> : null
      }
      {
        isEditIllnessOpen && editableIllness ?
          <EditIllnessModal illness={editableIllness} closeModal={setIsEditIllnessOpen} saveChangesOnIllness={saveChangesOnIllness}/>
        : null
      }
      {
        isAddIllnessOpen ? <AddNewIllnessModal onClose={setIsAddIllnessOpen} addNewIllness={addNewIllness}/> : null
      }
      {
        isAddIllnessForDayOpen ? <AddIllnessForDayModal illnesses={illnesses} addIllnesForDay={addIllnesForDay} closeModal={setIsAddIllnessForDayOpen} /> : null
      }
      <LeftMenu exit={exit}/>
      <div className="foodPage__info">
        <Header changePeriod={changePeriod} title={t('health.health')}/>
        <Info
          deleteIllnessForDay={deleteIllnessForDay}
          deleteIllness={deleteIllness}
          setIsAddIllnessForDayOpen={setIsAddIllnessForDayOpen}
          setIsAddIllnessOpen={setIsAddIllnessOpen}
          openEditIllness={openEditIllness}
        />
      </div>
    </div>
  )
}

export default HealthPage;
