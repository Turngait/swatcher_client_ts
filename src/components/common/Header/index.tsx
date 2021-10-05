import React from 'react';
import { useSelector } from 'react-redux';

// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
import './index.scss';

const Header:React.FC<{title: string, changePeriod: (period: string) => void}> = ({title, changePeriod}) => {
  const period: string = useSelector((state: any) => state.user.period);

  return (
    <div className="headBox">
      <h2 className="headBox__pageName">{title}</h2>
      <div>
        <input type="month" value={period} onChange={(event) => changePeriod(event.target.value)}/>
      </div>
    </div>
  )
}

export default Header;
