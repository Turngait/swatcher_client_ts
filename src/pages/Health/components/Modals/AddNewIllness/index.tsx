import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PopUp from 'components/common/PopUp';

import { IBodyPlaces, IIllness } from 'types/common';

import './index.scss';
import AddSymptomForm from './AddSymptom';
import AddDiseaseForm from './AddDisease';

const AddNewIllnessModal: React.FC<{
  addNewIllness: (title: string,descr: string, placeId: string, danger: number, setMsg: (msg: string | null) => void) => void,
  addNewDisease: (title: string, treatment: string, descr: string, isChronically: boolean, danger: number, symptoms: string[], setMsg: (msg: string | null) => void) => void,
  addBodyPlace: (title: string) => Promise<{ id: string, status: number }>,
  onClose: (isOpen: boolean) => void,
  bodyPlaces: IBodyPlaces[] | [],
  symptoms: IIllness[] | [],
}> = ({ addNewIllness, addNewDisease, addBodyPlace, onClose, bodyPlaces, symptoms }) => {
  const { t } = useTranslation();

  const [msg, setMsg] = useState<string | null>(null);
  const [type, setType] = useState<"disease" | "symptom">('symptom');

  return (
    <PopUp title={t('health.mAddIllness')} closeModal={() => onClose(false)}>
      {
        msg ? <p className="addNewIllness__msg">{msg}</p> : null
      }
      <div className="addNewIllness__switcher">
        {/* TODO Move to Component Button */}
        <button onClick={() => setType('symptom')} className="addNewIllness__switcher__item addNewIllness__switcher__item__active">{t('health.mSymptom')}</button>
        <button onClick={() => setType('disease')} className="addNewIllness__switcher__item">{t('health.mDisease')}</button>
      </div>
      {
        type === 'symptom' ? <AddSymptomForm bodyPlaces={bodyPlaces} addBodyPlace={addBodyPlace} addNewIllness={addNewIllness} setMsg={setMsg}/> : null
      }
      {
        type === 'disease' ? <AddDiseaseForm symptoms={symptoms} setMsg={setMsg} addNewDisease={addNewDisease} /> : null
      }      
    </PopUp>
  )
}

export default AddNewIllnessModal;
