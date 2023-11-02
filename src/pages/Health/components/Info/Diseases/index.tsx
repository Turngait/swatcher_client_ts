import React from 'react';

import Disease from './Disease';

import './index.scss';
import { useSelector } from 'react-redux';
import { IDisease } from '../../../../../types/common';

const Diseases: React.FC<{
  deleteDisease: (id: string) => void,
}> = ({deleteDisease}) => {
  const diseases: IDisease[] = useSelector((state: any) => state.health.diseases);
  return (
    <div className='diseasesBox'>
      <h3 className='diseasesBox__header'>Diseases</h3>
      <div className='diseasesBox__box'>
        {
          diseases.length ? diseases.map((item) => {
            return (
              <Disease deleteDisease={deleteDisease} disease={item} key={item.id} />
            )
          }) : null
        }
      </div>
    </div>
  );
}

export default Diseases;
