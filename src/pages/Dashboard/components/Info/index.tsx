import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Day from './Day';

import './index.scss';
import { IDisease } from 'types/common';

const Info: React.FC<{
  deleteIllnessForDay: (id: string, date: string) => Promise<void>;
  deleteFoodForDayHandler: (id: string, date: string) => Promise<void>;
  }> = ({deleteIllnessForDay, deleteFoodForDayHandler}) => {
  const { t } = useTranslation();

  const stats = useSelector((state: any) => state.user.stat);
  const activeDiseases: string[] = useSelector((state: any) => state.health.activeDiseases);
  const diseases: IDisease[] = useSelector((state: any) => state.health.diseases);

  const showDiseaseTitle = (diseaseId: string, diseases: IDisease[]) => {
    for (const disease of diseases) {
      if (disease.id === diseaseId) return disease.title;
    }
  }
  return(
    <div className="dashboardInfo">
      <div className="dashboardInfo__activeDiseasesBox">
        <p className="dashboardInfo__activeDiseasesBox__title">Active diseases: </p>
        {
          activeDiseases.length ? activeDiseases.map((item) => {
            return (
              <p className="dashboardInfo__activeDiseasesBox__title" key={item}>{showDiseaseTitle(item, diseases)}</p>
            )
          })
          : (<p className="dashboardInfo__activeDiseasesBox__empty">Nothing</p>)
        }
      </div>
      {
        stats.length ?
          stats.map((stat: any) => <Day deleteFoodForDayHandler={deleteFoodForDayHandler} deleteIllnessForDay={deleteIllnessForDay} stat={stat} key={stat.id} />)
        :
        <p className='dashboardInfo__noData'>{t('stats.noData')}</p>
      }
    </div>
  )
}

export default Info;
