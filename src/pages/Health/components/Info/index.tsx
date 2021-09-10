import React from 'react';

import Stats from './Stats';
import AllIllness from './AllIllness';

import './index.scss';

const Info: React.FC = () => {
  return(
    <div className="healthInfo">
      <Stats />
      <AllIllness />
    </div>
  )
}

export default Info;
