import React, { useState } from 'react';

import PopUp from 'components/common/PopUp';
import DelIco from 'assets/icons/delete-ico.png';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import { restoreUserPass } from '../../services';

import './index.scss';


//TODO выводить сообщения исходя из статуса ответа
const RestorePass: React.FC<{closeRestore: (isOpne: false) => void}> = ({closeRestore}) => {
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
      <h2 className="restorePass__header">Восстановить пароль</h2>
      {
        isComplite ? <p className="restorePass__complite">Пароль успешно изменен!</p> : null
      }
      {
        secondStep 
          ? 
        (
          <div className="restorePass__box">
            <p>Вам на e-mail был отправлен код. Введите его в поле ниже</p>
            <Textinput onChange={(event) => setCode(event.target.value)} placeholder='Введите код из e-mail' type='email'/>
            <Textinput onChange={(event) => setPass(event.target.value)} placeholder='Введите Ваш новый пароль' type='email'/>
            <Button onClick={setNewPass} title='Отправить'/>
          </div>
        ) 
        : (
          <div className="restorePass__box">
            <Textinput onChange={(event) => setEmail(event.target.value)} placeholder='Введите Ваш e-mail' type='email'/>
            <Button onClick={startRestore} title='Отправить'/>
          </div>
        )
      }
    </PopUp>
  )
}

export default RestorePass;
