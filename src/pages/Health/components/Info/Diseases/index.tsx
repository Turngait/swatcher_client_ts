import React from 'react';

import Disease from './Disease';

import './index.scss';
import { useSelector } from 'react-redux';
import { IDisease } from '../../../../../types/common';

const Diseases: React.FC<{
  deleteDisease: (id: string) => void,
  openEditDisease: (id: string) => void,
  toggleDiseaseActiveStatus: (id: string, is_active: boolean) => void
}> = ({deleteDisease, openEditDisease, toggleDiseaseActiveStatus}) => {
  const diseases: IDisease[] = useSelector((state: any) => state.health.diseases);
  return (
    <div className='diseasesBox'>
      <h3 className='diseasesBox__header'>Diseases</h3>
      <div className='diseasesBox__box'>
        {
          diseases.length ? diseases.map((item) => {
            return (
              <Disease deleteDisease={deleteDisease} disease={item} key={item.id} openEditDisease={openEditDisease} toggleDiseaseActiveStatus={toggleDiseaseActiveStatus}/>
            )
          }) : null
        }
      </div>
    </div>
  );
}

export default Diseases;
