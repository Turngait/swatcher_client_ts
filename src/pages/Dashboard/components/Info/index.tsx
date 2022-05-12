import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Day from './Day';

import './index.scss';

const Info: React.FC = () => {
  const { t } = useTranslation();

  const stats = useSelector((state: any) => state.user.stat);
  return(
    <div className="dashboardInfo">
      {
        stats.length ?
          stats.map((stat: any) => <Day stat={stat} key={stat.id} />)
        :
        <p className='dashboardInfo__noData'>{t('stats.noData')}</p>
      }
    </div>
  )
}

export default Info;
