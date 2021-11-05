import React, { useState } from 'react';

import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import './index.scss';

const Settings: React.FC<{
  userName: string,
  changeUserName: (name: string, setMsg: (msg: string | null) => void) => void,
  changeUserPass: (oldPass: string, pass: string, setMsgPass:(masg: string | null) => void) => void
}> = ({ userName, changeUserName, changeUserPass }) => {
  const [userNameInp, setUserNameInp] = useState(userName);
  const [oldPass, setOldPass] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [msgPass, setMsgPass] = useState<string | null>(null);

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
    </div>
  )
}

export default Settings;
