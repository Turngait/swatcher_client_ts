import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PopUp from 'components/common/PopUp';
import DelIco from 'assets/icons/delete-ico.png';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import { restoreUserPass } from '../../services';

import './index.scss';


//TODO выводить сообщения исходя из статуса ответа
const RestorePass: React.FC<{closeRestore: (isOpne: false) => void}> = ({closeRestore}) => {
  const { t } = useTranslation();

  const [secondStep, setSecondStep] = useState(false);
  const [isComplite, setIsComplite] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pass, setPass] = useState('');

  const startRestore = async () => {
    const { status } = await restoreUserPass(email, pass, code, true);
    if(status === 200) {
      setSecondStep(true);
    }
  }

  const setNewPass = async () => {
    const { status } = await restoreUserPass(email, pass, code, false);
    if(status === 200) {
      setIsComplite(true);
      setSecondStep(false);
    }
  }

  return (
    <PopUp>
      <img onClick={() => closeRestore(false)} className="restorePass__closeBtn" src={DelIco} alt="close modal"/>
      <h2 className="restorePass__header">{t('index.restorePass')}</h2>
      {
        isComplite ? <p className="restorePass__complite">{t('index.restorePassSuccess')}</p> : null
      }
      {
        secondStep 
          ? 
        (
          <div className="restorePass__box">
            <p>{t('index.rstoreMsg')}</p>
            <Textinput onChange={(event) => setCode(event.target.value)} placeholder={t('index.enterSecretCode')} type='email'/>
            <Textinput onChange={(event) => setPass(event.target.value)} placeholder={t('index.enterNewPass')} type='email'/>
            <Button onClick={setNewPass} title={t('common.send')} />
          </div>
        ) 
        : (
          <div className="restorePass__box">
            <Textinput onChange={(event) => setEmail(event.target.value)} placeholder={t('index.enterEmail')} type='email'/>
            <Button onClick={startRestore} title={t('common.send')} />
          </div>
        )
      }
    </PopUp>
  )
}

export default RestorePass;
