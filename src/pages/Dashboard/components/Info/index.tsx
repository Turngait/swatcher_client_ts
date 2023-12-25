import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { IDisease } from 'types/common';

import Day from './Day';

import './index.scss';

const Info: React.FC<{
  msg: string | null,
  deleteIllnessForDay: (id: string, date: string) => Promise<void>;
  deleteFoodForDayHandler: (id: string, date: string) => Promise<void>;
  }> = ({deleteIllnessForDay, deleteFoodForDayHandler, msg}) => {
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
      {
        msg ? <div className="dashboardInfo__msgBox">{msg}</div> : null
      }
      <div className="dashboardInfo__activeDiseasesBox">
        <p className="dashboardInfo__activeDiseasesBox__title">{t("stats.activeDiseases")}: </p>
        {
          activeDiseases.length ? activeDiseases.map((item) => {
            return (
              <p className="dashboardInfo__activeDiseasesBox__title" key={item}>{showDiseaseTitle(item, diseases)}</p>
            )
          })
          : (<p className="dashboardInfo__activeDiseasesBox__empty">{t('stats.nothing')}</p>)
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
