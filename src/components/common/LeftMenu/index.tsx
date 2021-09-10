import React from 'react';
import {NavLink} from 'react-router-dom';

import ExitIco from '../../../assets/icons/exit-ico.png';

import './index.scss';

const LeftMenu: React.FC = () => {
  return (
    <div className="leftMenu">
        <h1 className="leftMenu__header">SelfWatcher</h1>
        <nav className="leftMenu__nav">
          <NavLink to="/dashboard" className="leftMenu__nav__item">Dashboard</NavLink>
          <NavLink to="/food" className="leftMenu__nav__item">Food</NavLink>
          <NavLink to="/health" className="leftMenu__nav__item">Health</NavLink>
          <NavLink to="/profile" className="leftMenu__nav__item">Profile</NavLink>
        </nav>
        <div>
          <img className="leftMenu__exitBtn" src={ExitIco} alt="ExitBtn" />
        </div>
    </div>
  )
}

export default LeftMenu;
