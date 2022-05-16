import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './index.scss';

const LeftMenu: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="leftMenu">
        <h1 className="leftMenu__header">
          SelfWatcher
          <p className="leftMenu__mini">Beta</p>
        </h1>
        <nav className="leftMenu__nav">
          <NavLink to="/dashboard" className="leftMenu__nav__item">{t('menu.stats')}</NavLink>
          <NavLink to="/food" className="leftMenu__nav__item">{t('menu.food')}</NavLink>
          <NavLink to="/health" className="leftMenu__nav__item">{t('menu.health')}</NavLink>
          {/* <NavLink to="/profile" className="leftMenu__nav__item">{t('menu.profile')}</NavLink> */}
        </nav>
    </div>
  )
}

export default LeftMenu;
