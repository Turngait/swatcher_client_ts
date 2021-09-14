/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from "react-router-dom";

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';
import FirstSetUp from './components/FirstSetUp';
import Loader from 'components/common/Loader';
import {IUserData} from 'types/common';

import {saveFirstSetupData, getInitData} from './services';
import { setUserData } from 'store/User/user.actions';
import './index.scss';

const Dashboard:React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const userData: IUserData = useSelector((state: any) => state.user.userData);

  const [token, setToken] = useState('');
  const [isFirstSetUpOpen, setIsFirstSetUpOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function init(token: string) {
    setLoading(true);
    const { user } = await getInitData(token);
    if (user) dispatch(setUserData(user));
    setToken(token);
    setLoading(false);
  }

  useEffect(() => {
    console.log(userData);
    if(userData && userData.data.sex === '') setIsFirstSetUpOpen(true);
  }, [userData]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      init(token);
    } else {
      history.push('/');
    }
  }, []);

  const saveFirstSetUp = async (sex: string, age: number, weight: number, height: number) => {
    const { status } = await saveFirstSetupData(sex, age, weight, height, token);
    // TODO добавить обработку ошибок и вывод сообщений
    if (status === 200) setIsFirstSetUpOpen(false);
  }
  return (
    <div className="dashboard">
      {
        loading ? <Loader /> : null
      }
      <LeftMenu />
      <div className="dashboard__info">
        {
          isFirstSetUpOpen ? <FirstSetUp saveData={saveFirstSetUp}/> : null
        }
        <Header title="Dashboard"/>
        <Info />
      </div>
    </div>
  );
}

export default Dashboard;
