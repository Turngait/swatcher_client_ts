import React, { useState } from 'react';

import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import './index.scss';

const Settings: React.FC<{
  changeUserName: (name: string) => void,
  changeUserPass: (oldPass: string, pass: string) => void
}> = ({ changeUserName, changeUserPass }) => {
  const [userName, setUserName] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div className="settings">
        <div className="settings__item">
          <h3 className="settings__item__header">Сменить имя</h3>
          <div className="settings__item__form">
            <Textinput onChange={(event) => setUserName(event.target.value)} placeholder="Ваше имя..."/>
            <Button onClick={() => changeUserName(userName)} title="Сохранить"/>
          </div>
        </div>
        <div className="settings__item">
          <h3 className="settings__item__header">Сменить пароль</h3>
          <div className="settings__item__form">
            <Textinput type="password" onChange={(event) => setOldPass(event.target.value)} placeholder="Ваш старый пароль..."/>
            <Textinput type="password" onChange={(event) => setPass(event.target.value)} placeholder="Ваш новый пароль..."/>
            <Button onClick={() => changeUserPass(oldPass, pass)} title="Сохранить"/>
          </div>
        </div>
    </div>
  )
}

export default Settings;
