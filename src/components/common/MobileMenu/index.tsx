import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import CloseIco from 'assets/icons/close_ico2.png';

import "./index.scss";

interface Props {
  closeMenu: (isOpen: boolean) => void
}
const MobileMenu:React.FC<Props> = ({ closeMenu }) => {
  const { t } = useTranslation();

  return (
    <div className="MenuContainer">
      <img onClick={() => closeMenu(false)} className="MenuContainer__closeBtn" src={CloseIco} alt="Close menu" />
      <nav className="MenuContainer__nav">
        <NavLink to="/dashboard" className="MenuContainer__nav__item">{t('menu.stats')}</NavLink>
        <NavLink to="/food" className="MenuContainer__nav__item">{t('menu.food')}</NavLink>
        <NavLink to="/health" className="MenuContainer__nav__item">{t('menu.health')}</NavLink>
        <NavLink to="/profile" className="MenuContainer__nav__item">{t('menu.profile')}</NavLink>
        <NavLink to="/profile" className="MenuContainer__nav__item">{t('menu.logout')}</NavLink>
      </nav>
    </div>
  )
}

export default MobileMenu;
