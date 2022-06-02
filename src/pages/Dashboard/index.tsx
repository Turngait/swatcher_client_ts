/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import LeftMenu from '../../components/common/LeftMenu';
import MobileMenu from '../../components/common/MobileMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';
import FirstSetUp from './components/FirstSetUp';
import Loader from 'components/common/Loader';
import { IUserData } from 'types/common';

import { saveFirstSetupData, getInitData } from './services';
import { setUserData, setPeriod } from 'store/User/user.actions';
import './index.scss';

const Dashboard:React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userData: IUserData = useSelector((state: any) => state.user.userData);
  const period: string = useSelector((state: any) => state.user.period);

  const [token, setToken] = useState('');
  const [isFirstSetUpOpen, setIsFirstSetUpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function init(token: string, period: string) {
    setLoading(true);
    const { user, status, stat, foods, health } = await getInitData(token, period);

    if(status === 403) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      if (user && Array.isArray(stat) && foods && health) dispatch(setUserData(user, stat, foods, health));
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
    // TODO add show errors function
    if (status === 200) setIsFirstSetUpOpen(false);
  }
  return (
    <div className="dashboard">
      {
        loading ? <Loader /> : null
      }
      {
        isMenuOpen ? <MobileMenu closeMenu={setIsMenuOpen} logOut={exit}/> : null
      }
      <LeftMenu />
      <div className="dashboard__info">
        {
          isFirstSetUpOpen ? <FirstSetUp saveData={saveFirstSetUp}/> : null
        }
        <Header openMenu={setIsMenuOpen} exit={exit} changePeriod={changePeriod} title={t('menu.stats')}/>
        <Info />
      </div>
    </div>
  );
}

export default Dashboard;
