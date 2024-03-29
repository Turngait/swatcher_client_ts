import React, {useState, useEffect}  from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import LeftMenu from 'components/common/LeftMenu';
import Header from '../../components/common/Header';
import Settings from './components/Settings';
import MobileMenu from 'components/common/MobileMenu';

import { changeUserNameService, changeUserPassService, changeUserPersonalData } from './services';
import { setUserInfoData } from 'store/User/user.actions';
import { IUserData, IUserPersonalData } from 'types/common';

import './index.scss';

const Profile:React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();

  const [token, setToken] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      if(status === 202 && userData) {
        userData.name = name;
        setUserInfoData(userData);
        setMsg(t('profile.nameIsChanged'));
      } else {
        setMsg(t('msgs.err1'));
      }
    }
    setTimeout(() => setMsg(null), 4000);
  }
  const changeUserPass = async (oldPass: string, pass: string, setMsg: (msg: string | null) =>void): Promise<void> => {
    const { status } = await changeUserPassService(oldPass, pass, token || '');
    if(status === 202) {
      setMsg(t('profile.passIsChanged'));
    } else {
      setMsg(t('msgs.err1'));
    }
    setTimeout(() => setMsg(null), 4000);
  }

  const changeUserData = async(data: IUserPersonalData, setMsg: (msg: string | null) =>void) => {
    const {status, errors } = await changeUserPersonalData(data, token || '');
    if (errors) {
      setMsg(errors[0].msg);
    } else {
      if(status === 202) {
        setMsg(t('profile.dataIsChanged'));
      } else {
        setMsg(t('msgs.err1'));
      }
    }
    setTimeout(() => setMsg(null), 4000);
  }

  return (
    <div className="profilePage">
      {isMenuOpen ? <MobileMenu closeMenu={setIsMenuOpen} logOut={exit}/> : null}
      <LeftMenu />
      <div className="profilePage__info">
        <Header openMenu={setIsMenuOpen} exit={exit} title={t('profile.profile')}/>
        <Settings
          userData={userData ? userData.data : null}
          userName={userData ? userData.name : ''}
          changeUserName={changeUserName}
          changeUserPass={changeUserPass}
          changeUserData={changeUserData}
        />
      </div>
    </div>
  )
}

export default Profile;
