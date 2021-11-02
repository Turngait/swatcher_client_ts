import React from 'react';

import { IInputProps } from '../../../types/components';

import './index.scss';

const Textinput: React.FC<IInputProps> = ({placeholder, type, name, onChange, value}) => {
  return (
    <input value={value} onChange={onChange} placeholder={placeholder} className="textInput" type={type || 'text'} name={name} />
  )
}

export default Textinput;