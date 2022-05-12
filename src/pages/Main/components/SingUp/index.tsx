import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import TextInput from '../../../../components/controls/TextInput';
import Button from '../../../../components/controls/Button';

import './index.scss';

const SignUp: React.FC<{registartion: (name: string, email: string, pass: string) => Promise<void>}> = ({ registartion }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const signUpService = async () => {
    await registartion(name, email, pass);
  }

  return (
    <form className='signInBox'>
      <h3 className='signInBox__header'>{t('index.signUp')}</h3>
      <TextInput placeholder={`${t('common.name')}...`} onChange={(event) => {setName(event.target.value)}} />
      <TextInput type="email" name="email" placeholder={`${t('common.email')}...`} onChange={(event) => {setEmail(event.target.value)}} />
      <TextInput type="password" placeholder={`${t('index.password')}...`} onChange={(event) => {setPass(event.target.value)}} />
      <Button title={t('index.signUp')} onClick={signUpService}/>
      <p className='signInBox__desclimer'>
        {t('index.desc1')} <a href="policy.html" className="policyLink" target="_blank">{t('index.policy')}</a></p>
    </form>
  )
}

export default SignUp;
