import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SingUp';
import Loader from 'components/common/Loader';

import {signInService, signUpService} from './services';

import './index.scss';

const MainPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) history.push('/dashboard');
  });

  const login = async (email: string, pass: string): Promise<void> => {
    setLoading(true);
    const data = await signInService(email, pass);
    if(data.errors) {
      setMsg(data.errors[0].msg);
      setTimeout(() => setMsg(null), 3000);
    } else {
      if (data.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
        history.push('/dashboard');
      } else if(data.status === 403) {
        setLoading(false);
        setMsg('Неверный e-mail или пароль');
        setTimeout(() => setMsg(null), 3000);
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
      <div className="mainBox__leftBox">
        <div className="mainBox__leftBox__info">
          <p>Terms of condition</p>
          <p>2021</p>
        </div>
      </div>
      <div className="mainBox__rightBox">
        <nav className="mainBox__rightBox__nav">
          <button className="mainBox__rightBox__nav__item">About</button>
          <button className="mainBox__rightBox__nav__item">Contacts</button>
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
                <p className="mainBox__rightBox__descr">Do you have an account?</p>
                <button onClick={() => setIsSignUpOpen(false)} className="mainBox__rightBox__switchBtn">SignIn!</button>
              </>
            )
            :
            (
              <>
                <SignIn login={login}/>
                <p className="mainBox__rightBox__descr">Do not have an account?</p>
                <button onClick={() => setIsSignUpOpen(true)} className="mainBox__rightBox__switchBtn">SignUp!</button>
              </>
            ) 
        }

      </div>
    </div>
  );
}

export default MainPage;