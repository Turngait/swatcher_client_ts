import React, {useState, useEffect}  from 'react';
import {useSelector} from 'react-redux';
import { RouteComponentProps } from "react-router-dom";

import LeftMenu from 'components/common/LeftMenu';
import Header from '../../components/common/Header';
import Settings from './components/Settings';

import { changeUserNameService, changeUserPassService } from './services';
import { setUserInfoData } from 'store/User/user.actions';
import { IUserData } from 'types/common';

import './index.scss';

const Profile:React.FC<RouteComponentProps> = ({ history }) => {
  const [token, setToken] = useState<string | null>(null);
  const userData: IUserData | null = useSelector((state: any) => state.user.userData);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setToken(token);
    }
  }, []);

  const exit = () => {
    localStorage.removeItem('token');
    history.push('/');
  }

  const changeUserName = async (name: string, setMsg: (msg: string | null) => void): Promise<void> => {
    const { status, errors } = await changeUserNameService(name, token || '');
    if (errors) {
      setMsg(errors[0].msg);
    } else {
      if(status === 200 && userData) {
        userData.name = name;
        setUserInfoData(userData);
        setMsg('Имя успешно изменено');
      } else {
        setMsg('Что то пошло не так, попробуйте позже');
      }
    }
    setTimeout(() => setMsg(null), 4000);
  }
  const changeUserPass = async (oldPass: string, pass: string): Promise<void> => {
    const { status } = await changeUserPassService(oldPass, pass, token || '');
    console.log(status);
  }

  return (
    <div className="profilePage">
      <LeftMenu exit={exit}/>
      <div className="profilePage__info">
        <Header title="Profile"/>
        <Settings userName={userData ? userData.name : ''} changeUserName={changeUserName} changeUserPass={changeUserPass}/>
      </div>
    </div>
  )
}

export default Profile;
