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
      <h3 className='signInBox__header'>SignUp</h3>
      <TextInput placeholder="Name..." onChange={(event) => {setName(event.target.value)}} />
      <TextInput type="email" name="email" placeholder="E-mail..." onChange={(event) => {setEmail(event.target.value)}} />
      <TextInput type="password" placeholder="Password..." onChange={(event) => {setPass(event.target.value)}} />
      <Button title="SignUp" onClick={signUpService}/>
    </form>
  )
}

export default SignUp;
