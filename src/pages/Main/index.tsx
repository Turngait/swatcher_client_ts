import React, { useState, useEffect } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SignIn from './components/SignIn';
import SignUp from './components/SingUp';
import Loader from 'components/common/Loader';
import RestorePass from './components/Restore';
import Contacts from './components/Contacts';

import {signInService, signUpService} from './services';

import './index.scss';

const MainPage: React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) history.push('/dashboard');
  });

  const login = async (email: string, pass: string): Promise<void> => {
    setLoading(true);
    const data = await signInService(email, pass);
    if(data.errors) {
      setMsg(data.errors[0].msg);
      setTimeout(() => setMsg(null), 4000);
    } else {
      if (data.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
        history.push('/dashboard');
      } else if(data.status === 403) {
        setLoading(false);
        setMsg('Неверный e-mail или пароль');
        setTimeout(() => setMsg(null), 4000);
      }
    }
  }

  const registration = async (name: string, email: string, pass: string): Promise<void | undefined> => {
    setLoading(true);
    const data = await signUpService(name, email, pass);
    if(data.error) {
      setLoading(false);
      setMsg(data.error);
      setTimeout(() => setMsg(null), 3000);
      return;
    } else {
      if (data.status === 200 && data.userData.token) {
        localStorage.setItem("token", data.userData.token);
        history.push('/dashboard');
      }
    }
  }

  return (
    <div className="mainBox">
      {
        loading ? <Loader /> : null
      }
      {
        restoreOpen ? <RestorePass closeRestore={setRestoreOpen}/> : null
      }
      {
        isContactsOpen ? <Contacts onClose={() => setIsContactsOpen(false)}/> : null
      }
      <div className="mainBox__leftBox">
        <p className="mainBox__leftBox__text">
          {t('index.welcome')}
          <br/>
          <br/>
          {t('index.about1')}
          <br/>
          <br/>
          {t('index.about2')}
        </p>
        <div className="mainBox__leftBox__info">
          <p><a href="policy.html" target="_blank" className="mainBox__leftBox__info__link">{t('index.policy')}</a></p>
          <p><button onClick={() => setIsContactsOpen(true)} className="mainBox__leftBox__info__link">{t('index.contactUs')}</button></p>
          <p>2022</p>
        </div>
      </div>
      <div className="mainBox__rightBox">
        <nav className="mainBox__rightBox__nav">
          {/* <button className="mainBox__rightBox__nav__item">About</button>
          <button className="mainBox__rightBox__nav__item">Contacts</button> */}
        </nav>
        <h1 className="mainBox__rightBox__header">SelfWatcher</h1>
        <p className="mainBox__rightBox__mini">Beta</p>
        {
          msg ? <p className="mainBox__rightBox__msg">{msg}</p> : null
        }
        {
          isSignUpOpen ? 
            (
              <>
                <SignUp registration={registration}/>
                <p className="mainBox__rightBox__descr">{t('index.haveAccaunt')}</p>
                <button onClick={() => setIsSignUpOpen(false)} className="mainBox__rightBox__switchBtn">{t('index.signin')}</button>
              </>
            )
            :
            (
              <>
                <SignIn login={login}/>
                <button onClick={() => setRestoreOpen(true)} className="mainBox__rightBox__switchBtn">{t('index.restorePass')}</button>
                <p className="mainBox__rightBox__descr">{t('index.noAccaunt')}</p>
                <button onClick={() => setIsSignUpOpen(true)} className="mainBox__rightBox__switchBtn">{t('index.signUp')}</button>
              </>
            ) 
        }

      </div>
    </div>
  );
}

export default MainPage;