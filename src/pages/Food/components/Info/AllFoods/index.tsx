import React from 'react';

import Button from 'components/controls/Button';
import {BtnSize} from 'types/components';
import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';
import './index.scss';

const AllFoods = () => {
  return (
    <div className="allFoods">
      <div className="allFoods__header">All my food</div>
      <div className="allFoods__infoBox">
        <Button size={BtnSize.largeBtn} title="Add food"/>
        <div className="allFoods__infoBox__foods">
          <div className="allFoods__infoBox__foods__item">
            <p className="allFoods__infoBox__foods__item__title">Cofee</p>
            <p className="allFoods__infoBox__foods__item__colories">150kkl</p>
            <div className="allFoods__infoBox__foods__item__contolls">
              <img className="allFoods__infoBox__foods__item__contolls__ico" src={EditIco} alt="edit food"/>
              <img className="allFoods__infoBox__foods__item__contolls__ico" src={DelIco} alt="delete food"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllFoods;
