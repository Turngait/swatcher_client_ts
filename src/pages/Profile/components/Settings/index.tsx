import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
          <h3 className="settings__item__header">{t('profile.changeName')}</h3>
          {
            msg ? <p className="settings__msg">{msg}</p> : null
          }
          <div className="settings__item__form">
            <Textinput value={userNameInp} onChange={(event) => setUserNameInp(event.target.value)} placeholder={`${t('profile.yourName')}...`}/>
            <Button onClick={() => changeUserName(userNameInp, setMsg)} title={t('commone.save')}/>
          </div>
        </div>
        <div className="settings__item">
          <h3 className="settings__item__header">{t('profile.changePass')}</h3>
          {
            msgPass ? <p className="settings__msg">{msgPass}</p> : null
          }
          <div className="settings__item__form">
            <Textinput type="password" onChange={(event) => setOldPass(event.target.value)} placeholder={`${t('profile.yourOldPass')}...`}/>
            <Textinput type="password" onChange={(event) => setPass(event.target.value)} placeholder={`${t('profile.yourNewPass')}...`}/>
            <Button onClick={() => changeUserPass(oldPass, pass, setMsgPass)} title={t('commone.save')}/>
          </div>
        </div>
        <div className="settings__item">
          <h3 className="settings__item__header">{t('profile.yourData')}</h3>
          {
            msgData ? <p className="settings__msg">{msgData}</p> : null
          }
          <div className="settings__item__form">
            <Textinput value={age} type="number" onChange={(event) => setAge(+event.target.value)} placeholder={`${t('profile.yourAge')}...`}/>
            <Textinput value={height} type="number" onChange={(event) => setHeight(+event.target.value)} placeholder={`${t('profile.yourHeight')}...`}/>
            <Textinput value={weight} type="number" onChange={(event) => setWeight(+event.target.value)} placeholder={`${t('profile.yourWeight')}...`}/>
            <Button onClick={() => changeUserData({age, height, weight}, setMsgData)} title={t('commone.save')}/>
          </div>
        </div>
    </div>
  )
}

export default Settings;
