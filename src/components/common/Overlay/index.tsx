/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as H from 'history';

import Header from '../Header';
import MobileMenu from '../MobileMenu';
import LeftMenu from '../LeftMenu';

import { setUserData, setPeriod } from '../../../store/User/user.actions';
import { setActiveDiseases, setAllBodyPlaces, setDiseases } from '../../../store/Health/health.actions';

import './index.scss';

interface IOverlayProps {
  title?: string,
  getInitData: any,
  setLoading: (isLoading: boolean) => void,
  history: H.History
}


//In development
const Overlay:React.FC<IOverlayProps> = ({title, setLoading, getInitData, history, children}) => {
  const dispatch = useDispatch();
  const period: string = useSelector((state: any) => state.user.period);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState('');

  async function init(token: string, period: string): Promise<void> {
    setLoading(true);
    const { user, status, stat, foods, health, diseases } = await getInitData(token, period);

    if(status === 403) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      if (user && Array.isArray(stat) && foods && health.illnesses && health.bodyPlaces) {
        dispatch(setUserData(user, stat, foods.foods.publicFoods, health.illnesses));
        dispatch(setAllBodyPlaces(health.bodyPlaces));
      }
      if(diseases.diseases) dispatch(setDiseases(diseases.diseases));
      if(diseases.active_diseases) dispatch(setActiveDiseases(diseases.active_diseases));
      dispatch(setPeriod(period));
      setToken(token);
    }
    setLoading(false);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      init(token, period);
    } else {
      history.push('/');
    }
  }, []);

  async function changePeriod(period: string): Promise<void> {
    init(token, period);
  }

  const exit = () => {
    localStorage.removeItem('token');
    history.push('/');
  }
  return (
    <div className="overlayBox">
      <LeftMenu />
      {
        isMenuOpen ? <MobileMenu closeMenu={setIsMenuOpen} logOut={exit}/> : null
      }
      <div className="overlayBox__info">
        <Header openMenu={setIsMenuOpen} exit={exit} changePeriod={changePeriod} title={title || ""}/>
        {children}
      </div>
    </div>
  );
}

export default Overlay;
