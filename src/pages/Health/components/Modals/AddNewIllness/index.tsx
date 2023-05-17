import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import AddBodyPlace from './AddBodyPlaces';
import CloseIco from 'assets/icons/close_ico2.png';

import { IBodyPlaces, illsDangerEnum } from 'types/common';

import './index.scss';

const AddNewIllnessModal: React.FC<{
  addNewIllness: (title: string,descr: string, placeId: string, danger: number, setMsg: (msg: string | null) => void) => void,
  addGroup: (title: string) => Promise<{ id: string, status: number }>
  addBodyPlace: (title: string) => Promise<{ id: string, status: number }>
  onClose: (isOpen: boolean) => void,
  bodyPlaces: IBodyPlaces[] | [],
}> = ({ addNewIllness, addGroup, addBodyPlace, onClose, bodyPlaces }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [danger, setDanger] = useState(1);
  const [placeId, setPlaceId] = useState(bodyPlaces[0]._id || '');
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [places, setPlaces] = useState(bodyPlaces);

  const addBodyPlaceHandle = async (placeTitle: string): Promise<any> => {
    const data = await addBodyPlace(placeTitle);
    console.log(data);
    if (data.status === 500) {
      setMsg("Something goes wrong. Try later.");
    } else {
      setPlaces([...places, { _id: data.id, title: placeTitle }]);
    }
    setIsAddPlaceOpen(false);
  }

  return (
    <PopUp title={t('health.mAddIllness')} closeModal={() => onClose(false)}>
      {
        msg ? <p className="addNewIllness__msg">{msg}</p> : null
      }
      <div className="addNewIllness__form">
        <Textinput maxlength={20} placeholder={`${t('common.title')}...`} onChange={(event) => setTitle(event.target.value)}/>
        <textarea
          className="addNewIllness__form__textarea"
          placeholder={`${t('common.description')}...`}
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
        <label>
          <p>Choose place in body</p>
          <div className="addNewIllness__form__selectBox">
            <select className="addFoodForDay__form__time" onChange={(event: any) => setPlaceId(event.target.value)}>
              {
                places.map(place => {
                  return <option key={place._id || ''} value={place._id}>{place.title}</option>
                })
              }
            </select>
            <button className="addNewIllness__form__selectBox__plsBtn" onClick={() => setIsAddPlaceOpen(!isAddPlaceOpen)}>
              {
                isAddPlaceOpen ? <img className="addNewIllness__form__selectBox__plsBtn__clsIcon" src={CloseIco} alt="close"/> : <span>+</span>
              }
            </button>
          </div>
          {
            isAddPlaceOpen ? <AddBodyPlace addNewPlace={addBodyPlaceHandle} /> : null
          }
        </label>
        <label>
          <p>{t('health.mChooseDanger')}</p>
          <select className="addFoodForDay__form__time" onChange={(event: any) => setDanger(+event.target.value)}>
            <option value={1}>{illsDangerEnum.none}</option>
            <option value={2}>{illsDangerEnum.small}</option>
            <option value={3}>{illsDangerEnum.medium}</option>
            <option value={4}>{illsDangerEnum.high}</option>
            <option value={5}>{illsDangerEnum.mortal}</option>
          </select>
        </label>
        <Button title={t('common.add')} onClick={() => addNewIllness(title, descr, placeId, danger, setMsg)} />
      </div>
    </PopUp>
  )
}

export default AddNewIllnessModal;
