import React from 'react';
import { useSelector } from 'react-redux';

import Day from './Day';

import './index.scss';

const Info: React.FC = () => {
  const stats = useSelector((state: any) => state.user.stat);

  return(
    <div>
      {
        stats.map((stat: any) => <Day stat={stat} key={stat.id} />)
      }
    </div>
  )
}

export default Info;
