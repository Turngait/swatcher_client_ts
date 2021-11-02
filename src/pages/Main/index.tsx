import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SingUp';
import Loader from 'components/common/Loader';
import RestorePass from './components/Restore';

import {signInService, signUpService} from './services';

import './index.scss';

const MainPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);

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

  const registartion = async (name: string, email: string, pass: string): Promise<void> => {
    setLoading(true);
    const data = await signUpService(name, email, pass);
    if(data.errors) {
      setLoading(false);
      setMsg(data.errors[0].msg);
      setTimeout(() => setMsg(null), 3000);
      return;
    } else {
      if (data.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
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
      <div className="mainBox__leftBox">
        <div className="mainBox__leftBox__info">
          <p><a href="policy.html" target="_blank" className="mainBox__leftBox__info__link">Политика обработки персональных данных</a></p>
          <p><a className="mainBox__leftBox__info__link" href="mailto:info@ilya-r.ru">Напишите нам</a></p>
          <p>2021</p>
        </div>
      </div>
      <div className="mainBox__rightBox">
        <nav className="mainBox__rightBox__nav">
          {/* <button className="mainBox__rightBox__nav__item">About</button>
          <button className="mainBox__rightBox__nav__item">Contacts</button> */}
        </nav>
        <h1 className="mainBox__rightBox__header">SelfWatcher</h1>
        {
          msg ? <p className="mainBox__rightBox__msg">{msg}</p> : null
        }
        {
          isSignUpOpen ? 
            (
              <>
                <SignUp registartion={registartion}/>
                <p className="mainBox__rightBox__descr">Уже есть аккаунт?</p>
                <button onClick={() => setIsSignUpOpen(false)} className="mainBox__rightBox__switchBtn">Войдите!</button>
              </>
            )
            :
            (
              <>
                <SignIn login={login}/>
                <button onClick={() => setRestoreOpen(true)} className="mainBox__rightBox__switchBtn">Восстановить пароль</button>
                <p className="mainBox__rightBox__descr">Нет еще аккаунта?</p>
                <button onClick={() => setIsSignUpOpen(true)} className="mainBox__rightBox__switchBtn">Регестрация!</button>
              </>
            ) 
        }

      </div>
    </div>
  );
}

export default MainPage;