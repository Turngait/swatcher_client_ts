import React, {useState, useEffect}  from 'react';
import {useSelector} from 'react-redux';

import LeftMenu from 'components/common/LeftMenu';
import Header from '../../components/common/Header';
import Settings from './components/Settings';

import { changeUserNameService, changeUserPassService } from './services';
import { setUserInfoData } from 'store/User/user.actions';
import { IUserData } from 'types/common';

import './index.scss';

//TODO Добавить вывод сообщений, проверку на валидацию и отображение старого имени
const Profile:React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const userData: IUserData | null = useSelector((state: any) => state.user.userData);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setToken(token);
    }
  }, []);

  async function changePeriod(period: string): Promise<void> {
    console.log(period);
  }

  const changeUserName = async (name: string): Promise<void> => {
    const { status } = await changeUserNameService(name, token || '');
    if(status === 200 && userData) {
      userData.name = name;
      setUserInfoData(userData);
    }
  }
  const changeUserPass = async (oldPass: string, pass: string): Promise<void> => {
    const { status } = await changeUserPassService(oldPass, pass, token || '');
    console.log(status);
  }

  return (
    <div className="profilePage">
      <LeftMenu />
      <div className="profilePage__info">
        <Header changePeriod={changePeriod} title="Profile"/>
        <Settings changeUserName={changeUserName} changeUserPass={changeUserPass}/>
      </div>
    </div>
  )
}

export default Profile;
