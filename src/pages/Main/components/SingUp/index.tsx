import React, { useState } from 'react';

import TextInput from '../../../../components/controls/TextInput';
import Button from '../../../../components/controls/Button';

import './index.scss';

const SignUp: React.FC<{registartion: (name: string, email: string, pass: string) => Promise<void>}> = ({ registartion }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const signUpService = async () => {
    await registartion(name, email, pass);
  }

  return (
    <form className='signInBox'>
      <h3 className='signInBox__header'>Создать</h3>
      <TextInput placeholder="Имя..." onChange={(event) => {setName(event.target.value)}} />
      <TextInput type="email" name="email" placeholder="E-mail..." onChange={(event) => {setEmail(event.target.value)}} />
      <TextInput type="password" placeholder="Пароль..." onChange={(event) => {setPass(event.target.value)}} />
      <Button title="Создать" onClick={signUpService}/>
      <p className='signInBox__desclimer'>
        Нажимая кнопку "Создать" Вы соглашаетесь с <a href="policy.html" className="policyLink" target="_blank">"Политикой обработки персональных данных"</a> на этом сайте.</p>
    </form>
  )
}

export default SignUp;
