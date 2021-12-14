import React, { useState } from 'react';

import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import { IUserPersonalData } from 'types/common';

import './index.scss';

const Settings: React.FC<{
  userName: string,
  userData: IUserPersonalData | null,
  changeUserName: (name: string, setMsg: (msg: string | null) => void) => void,
  changeUserPass: (oldPass: string, pass: string, setMsgPass:(masg: string | null) => void) => void,
  changeUserData: (data: IUserPersonalData, setMsgPass:(masg: string | null) => void) => void
}> = ({ userName, userData, changeUserName, changeUserPass, changeUserData }) => {
  const [userNameInp, setUserNameInp] = useState(userName);
  const [oldPass, setOldPass] = useState('');
  const [pass, setPass] = useState('');
  const [age, setAge] = useState<number>(userData ? userData.age : 0);
  const [height, setHeight] = useState<number>(userData ? userData.height : 0);
  const [weight, setWeight] = useState<number>(userData ? userData.weight : 0);
  const [msg, setMsg] = useState<string | null>(null);
  const [msgPass, setMsgPass] = useState<string | null>(null);
  const [msgData, setMsgData] = useState<string | null>(null);

  return (
    <div className="settings">
        <div className="settings__item">
          <h3 className="settings__item__header">Сменить имя</h3>
          {
            msg ? <p className="settings__msg">{msg}</p> : null
          }
          <div className="settings__item__form">
            <Textinput value={userNameInp} onChange={(event) => setUserNameInp(event.target.value)} placeholder="Ваше имя..."/>
            <Button onClick={() => changeUserName(userNameInp, setMsg)} title="Сохранить"/>
          </div>
        </div>
        <div className="settings__item">
          <h3 className="settings__item__header">Сменить пароль</h3>
          {
            msgPass ? <p className="settings__msg">{msgPass}</p> : null
          }
          <div className="settings__item__form">
            <Textinput type="password" onChange={(event) => setOldPass(event.target.value)} placeholder="Ваш старый пароль..."/>
            <Textinput type="password" onChange={(event) => setPass(event.target.value)} placeholder="Ваш новый пароль..."/>
            <Button onClick={() => changeUserPass(oldPass, pass, setMsgPass)} title="Сохранить"/>
          </div>
        </div>
        <div className="settings__item">
          <h3 className="settings__item__header">Ваши данные</h3>
          {
            msgData ? <p className="settings__msg">{msgData}</p> : null
          }
          <div className="settings__item__form">
            <Textinput value={age} type="number" onChange={(event) => setAge(+event.target.value)} placeholder="Ваш возраст..."/>
            <Textinput value={height} type="number" onChange={(event) => setHeight(+event.target.value)} placeholder="Ваш рост..."/>
            <Textinput value={weight} type="number" onChange={(event) => setWeight(+event.target.value)} placeholder="Ваш вес..."/>
            <Button onClick={() => changeUserData({age, height, weight}, setMsgData)} title="Сохранить"/>
          </div>
        </div>
    </div>
  )
}

export default Settings;
