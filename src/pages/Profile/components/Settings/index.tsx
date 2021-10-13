import React from 'react';

import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import './index.scss';

const Settings: React.FC = () => {
  return (
    <div className="settings">
        <div className="settings__item">
          <h3 className="settings__item__header">Сменить имя</h3>
          <div className="settings__item__form">
            <Textinput placeholder="Ваше имя..."/>
            <Button title="Сохранить"/>
          </div>
        </div>
        <div className="settings__item">
          <h3 className="settings__item__header">Сменить пароль</h3>
          <div className="settings__item__form">
            <Textinput placeholder="Ваш старый пароль..."/>
            <Textinput placeholder="Ваш новый пароль..."/>
            <Button title="Сохранить"/>
          </div>
        </div>
    </div>
  )
}

export default Settings;
