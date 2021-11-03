import React from 'react';
import {NavLink} from 'react-router-dom';

import ExitIco from '../../../assets/icons/exit-ico.png';

import './index.scss';

const LeftMenu: React.FC<{exit?: () => void}> = ({exit}) => {
  return (
    <div className="leftMenu">
        <h1 className="leftMenu__header">
          SelfWatcher
          <p className="leftMenu__mini">Beta</p>
        </h1>
        <nav className="leftMenu__nav">
          <NavLink to="/dashboard" className="leftMenu__nav__item">Статистика</NavLink>
          <NavLink to="/food" className="leftMenu__nav__item">Еда</NavLink>
          <NavLink to="/health" className="leftMenu__nav__item">Здоровье</NavLink>
          <NavLink to="/profile" className="leftMenu__nav__item">Профиль</NavLink>
        </nav>
        <div>
          <img className="leftMenu__exitBtn" src={ExitIco} alt="ExitBtn" onClick={exit}/>
        </div>
    </div>
  )
}

export default LeftMenu;
