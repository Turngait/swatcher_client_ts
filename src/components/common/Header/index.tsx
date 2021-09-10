import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './index.scss';

const Header:React.FC<{title: string}> = ({title}) => {
  const startDate = new Date();
  return (
    <div className="headBox">
      <h2 className="headBox__pageName">{title}</h2>
      <div>
        <DatePicker selected={startDate} onChange={(date) => {
            console.log(date);
          }}
          dateFormat="MM/yyyy"
          showMonthYearPicker 
        />
      </div>
    </div>
  )
}

export default Header;
