import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import TextInput from '../../../../components/controls/TextInput';
import Button from '../../../../components/controls/Button';

import './index.scss';

const SignIn: React.FC<{login: (email: string, pass: string)=> Promise<void>}> = ({ login }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const signInService = async (): Promise<void> => {
    await login(email, pass);
  }
  return (
    <form className='signInBox'>
      <h3 className='signInBox__header'>{t('index.signin')}</h3>
      <TextInput type="email" name="email" placeholder={`${t('index.email')}...`} onChange={(event) => {setEmail(event.target.value)}}/>
      <TextInput type="password" placeholder={`${t('index.password')}...`} onChange={(event) => {setPass(event.target.value)}}/>
      <Button title="Go!" onClick={signInService}/>
    </form>
  )
}

export default SignIn;
