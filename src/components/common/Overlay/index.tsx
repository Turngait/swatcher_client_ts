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
import { API_URL } from 'config/api';
import { IBodyPlaces, IFood, IIllness, IUserData } from 'types/common';
import { API_KEY } from 'config/keys';

interface IOverlayProps {
  title?: string,
  setLoading: (isLoading: boolean) => void,
  history: H.History
}


//In development
const Overlay:React.FC<IOverlayProps> = ({title, setLoading, history, children}) => {
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

  async function getInitData( token: string, period: string): Promise<{    
    user: IUserData | null,
    status: number, 
    stat: [any] | [] | null, 
    foods: {foods: {publicFoods: IFood[] | []}, ingredients: any[]}, 
    health: {illnesses: IIllness[] | null, bodyPlaces: IBodyPlaces[] | null}, diseases: any }> {
      return await fetch(API_URL + '/stats/getdata', {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "API-KEY": API_KEY,
          "TOKEN": token
        },
        mode: "cors",
        body: JSON.stringify({
          period
        }),
      })
      .then(res => res.json());
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
