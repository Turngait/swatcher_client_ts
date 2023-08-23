import React from 'react';

import Disease from './Disease';

import './index.scss';

const Diseases: React.FC = () => {
  return (
    <div className='diseasesBox'>
      <h3 className='diseasesBox__header'>Diseases</h3>
      <div className='diseasesBox__box'>
        <Disease />
        <Disease />
        <Disease />
      </div>
    </div>
  );
}

export default Diseases;
