import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';
import AddNewIllnessModal from './components/Modals/AddNewIllness';
import EditIllnessModal from './components/Modals/EditIllnessModal';
import Loader from 'components/common/Loader';
import MobileMenu from 'components/common/MobileMenu';

import {
  addNewIllnessService,
  deleteIllnessService,
  getStatForPeriod,
  editIllnessService,
  getAllSymptomsDataService
} from './services';
import { setAllHealth, setAllGroups } from 'store/Health/health.actions';
import { setStat, setPeriod } from 'store/User/user.actions';

import {IIllness, IIllnessGroups} from 'types/common';

import './index.scss';

//TODO сделать уведомления в случае ошибки сервера по разным функциям. Поправить везде функционал по добавлению
const HealthPage:React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isAddIllnessOpen, setIsAddIllnessOpen] = useState(false);
  const [isEditIllnessOpen, setIsEditIllnessOpen] = useState(false);

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editableIllness, setEditableIllness] = useState<IIllness | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const illnesses: IIllness[] | [] = useSelector((state: any) => state.health.illnesses);
  const groups: IIllnessGroups[] | [] = useSelector((state: any) => state.health.groups);

  const exit = () => {
    localStorage.removeItem('token');
    history.push('/');
  }

  const init = async (token: string): Promise<void> => {
    if (Array.isArray(illnesses) && illnesses.length === 0) {
      const data = await getAllSymptomsDataService(token);
      if(data.illnesses) dispatch(setAllHealth(data.illnesses));
      if(data.groups) dispatch(setAllGroups(data.groups));
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setToken(token);
      init(token);
    }
    else history.push('/');
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

  const addNewIllness = async (title: string, descr: string, groupId: string, placeId: string, danger: number, setMsg: (msg: string | null) => void): Promise<void> => {
    setLoading(true);
    const { status, id, errors } = await addNewIllnessService(title, descr, groupId, placeId, danger, token);

    if (status === 200) {
      setIsAddIllnessOpen(false);

      const ill: IIllness = {
        id,
        title,
        groupId,
        placeId,
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
        isAddIllnessOpen ? <AddNewIllnessModal onClose={setIsAddIllnessOpen} addNewIllness={addNewIllness} groups={groups}/> : null
      }
      {isMenuOpen ? <MobileMenu closeMenu={setIsMenuOpen} logOut={exit}/> : null}
      <LeftMenu />
      <div className="healthPage__info">
        <Header openMenu={setIsMenuOpen} exit={exit} changePeriod={changePeriod} title={t('health.health')}/>
        <Info
          deleteIllness={deleteIllness}
          setIsAddIllnessOpen={setIsAddIllnessOpen}
          openEditIllness={openEditIllness}
        />
      </div>
    </div>
  )
}

export default HealthPage;
