import React from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { NavLink } from 'react-router-dom';

import UserIco from 'assets/icons/user_ico.svg';
import ExitIco from 'assets/icons/exit_ico.svg';
import MenuIco from 'assets/icons/menu_ico.svg';

import "react-datepicker/dist/react-datepicker.css";
import './index.scss';

interface Props {
  title: string,
  changePeriod?: (period: string) => void,
  openMenu: (isOpen: boolean) => void,
  exit: () => void
}

const Header:React.FC<Props> = ({title, changePeriod, openMenu, exit}: Props) => {
  const period: string = useSelector((state: any) => state.user.period);

  return (
    <div className="headBox">
      <div className="headBox__mobileBox">
        <h2 className="headBox__pageName">{title}</h2>
        <div>
          <img onClick={() => openMenu(true)} className="headBox__icon" src={MenuIco} alt="Menu"/>
        </div>
      </div>
      <h2 className="headBox__pageName headBox__desktop">{title}</h2>
      <div className="headBox__controllsBox">
        {
          changePeriod ? 
            <DatePicker
              className='headBox__dataPicker'
              selected={new Date(period)}
              onChange={(date: Date) => changePeriod(date.toISOString().slice(0, 7))}
              dateFormat="MMMM, yyyy"
              showMonthYearPicker
            /> : null
        }
        <NavLink to="/profile"><img src={UserIco} className="headBox__icon headBox__desktop" alt="Profile" /></NavLink>
        <img onClick={exit} src={ExitIco} className="headBox__icon headBox__desktop" alt="Logout" />
      </div>
    </div>
  )
}

export default Header;
