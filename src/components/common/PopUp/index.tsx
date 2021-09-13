import React from 'react';

import './index.scss';

const PopUp:React.FC<any> = ({children}) => {
  return (
    <div className="popup">
      <div className="modal">
        {children}
      </div>
    </div>
  );
}

export default PopUp;
