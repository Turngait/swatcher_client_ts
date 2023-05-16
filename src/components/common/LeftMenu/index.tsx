import React, { useEffect, useState } from 'react';
import i18n from 'i18n';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Select from 'components/controls/Select';

import './index.scss';

const LeftMenu: React.FC = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("lang") || 'ru');

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (!lang) {
      i18n.changeLanguage('ru');
      localStorage.setItem("lang", "ru");
    }
    else i18n.changeLanguage(lang);
  }, []);

  const langs = [
    {
      title: "En",
      value: "en"
    },
    {
      title: "Ru",
      value: "ru"
    }
  ];

  function changeLang(event: any) {
    i18n.changeLanguage(event.target.value);
    setLang(event.target.value);
    localStorage.setItem("lang", event.target.value);
  }

  return (
    <div className="leftMenu">
        <h1 className="leftMenu__header">
          SelfWatcher
          <p className="leftMenu__mini">Beta</p>
        </h1>
        <nav className="leftMenu__nav">
          <NavLink to="/dashboard" className="leftMenu__nav__item">{t('menu.stats')}</NavLink>
          <NavLink to="/health" className="leftMenu__nav__item">{t('menu.health')}</NavLink>
          <NavLink to="/food" className="leftMenu__nav__item">{t('menu.food')}</NavLink>
          {/* <NavLink to="/profile" className="leftMenu__nav__item">{t('menu.profile')}</NavLink> */}
        </nav>
        <div className="leftMenu__langBox">
          <Select items={langs} defaultValue={lang} onChange={changeLang}/>
        </div>
    </div>
  )
}

export default LeftMenu;
