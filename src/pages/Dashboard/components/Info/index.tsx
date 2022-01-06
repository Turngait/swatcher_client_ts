import React from 'react';
import { useSelector } from 'react-redux';

import Day from './Day';

import './index.scss';

const Info: React.FC = () => {
  const stats = useSelector((state: any) => state.user.stat);
  return(
    <div className="dashboardInfo">
      {
        stats.length ?
          stats.map((stat: any) => <Day stat={stat} key={stat.id} />)
        :
        <p className='dashboardInfo__noData'>Нет данных. Начните добавлять данные в состветсвующих разделах</p>
      }
    </div>
  )
}

export default Info;
