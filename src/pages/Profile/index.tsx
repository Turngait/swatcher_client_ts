import React, {useState, useEffect}  from 'react';

import LeftMenu from 'components/common/LeftMenu';
import Header from '../../components/common/Header';
import Settings from './components/Settings';

import './index.scss';

const Profile:React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setToken(token);
    }
  }, []);
  async function changePeriod(period: string): Promise<void> {
    console.log(period);
  }
  return (
    <div className="profilePage">
      <LeftMenu />
      <div className="profilePage__info">
        <Header changePeriod={changePeriod} title="Profile"/>
        <Settings />
      </div>
    </div>
  )
}

export default Profile;
