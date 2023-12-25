import React from 'react';

import { ICheckboxInputProps } from '../../../types/components';

import './index.scss';

const CheckboxInput: React.FC<ICheckboxInputProps> = ({ name, title, onChange, checked }) => {
  return (
    <label className='checkboxInputLabel'>
      <input checked={ checked ? checked : false } type='checkbox' onChange={onChange} className="checkboxInput" name={name} />
      <p>{ title }</p>
    </label>
  )
}

export default CheckboxInput;