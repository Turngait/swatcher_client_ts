import React from "react";
import './index.scss';
import { IBodyPlaces, IIllness } from "types/common";
import { useSelector } from "react-redux";

import EditIco from 'assets/icons/edit-ico.png';
import DelIco from 'assets/icons/delete-ico.png';

import { getBodyPlaceTitle } from 'utils';


const SymptomItem: React.FC<{ 
    symptom: IIllness,
    deleteIllness: (id: string) => void,
    openEditIllness: (id: string) => void,
    showDangerName: (danger: number) => string | undefined
  }> = ({ symptom, deleteIllness, openEditIllness, showDangerName }) => {
  const bodyPlaces: IBodyPlaces[] = useSelector((state: any) => state.health.bodyPlaces);

  return (
    <div className="symptom__box">
    <div className={`symptom`}>
      <div className={`symptom__headerBox`}>
        <p className="symptom__title">{symptom.title}</p>
        <div className="symptom__contolls">
          <img onClick={() => openEditIllness(symptom.id || '')} className="symptom__contolls__ico" src={EditIco} alt="edit food"/>
          <img onClick={() => deleteIllness(symptom.id || '')} className="symptom__contolls__ico" src={DelIco} alt="delete food"/>
        </div>
      </div>
        <p className="symptom__chars">Power: {showDangerName(+symptom.danger)}</p>
        <p className="symptom__chars">Place: {getBodyPlaceTitle(symptom.placeId, bodyPlaces)}</p>
    {
      symptom.descr ?
      (
        <>
          <hr className="symptom__decription__line" />
          <div className="symptom__decription">
            {symptom.descr}
          </div>
        </>
      )
      : 
      (
        <>
          <hr className="symptom__decription__line" />
          <div className="symptom__decription">
            There are no description
          </div>
        </>
      )
    }
    </div>

  </div>
  )
}

export default SymptomItem;
