import React from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { NavLink } from 'react-router-dom';

import UserIco from 'assets/icons/user_ico.svg';
import ExitIco from 'assets/icons/exit_ico.svg';

import "react-datepicker/dist/react-datepicker.css";
import './index.scss';

const Header:React.FC<{title: string, changePeriod?: (period: string) => void, exit: () => void}> = ({title, changePeriod, exit}) => {
  const period: string = useSelector((state: any) => state.user.period);

  return (
    <div className="headBox">
      <h2 className="headBox__pageName">{title}</h2>
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
        <NavLink to="/profile"><img src={UserIco} className="headBox__icon" alt="Profile" /></NavLink>
        <img onClick={exit} src={ExitIco} className="headBox__icon" alt="Logout" />
      </div>
    </div>
  )
}

export default Header;
