import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import { IDisease, illsDangerEnum } from 'types/common';

import './index.scss';

// TODO Move controls to components
const EditDiseaseModal: React.FC<{
  disease: IDisease,
  closeModal: (isOpen: boolean) => void,
  saveChangesOnDisease: (title: string, descr: string, danger: number, id: string, treatment: string, is_chronicle: boolean) => void
}> = ({ disease, closeModal, saveChangesOnDisease }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState(disease.title);
  const [descr, setDescr] = useState(disease.description);
  const [treatment, setTreatment] = useState(disease.treatment);
  const [danger, setDanger] = useState(+disease.danger);
  const [isChronicle, setIsChronicle] = useState(disease.is_chronicle);

  const showDangerName = (danger: number) => {
    if (!danger) return t('common.empty');
    if (danger === 1) return illsDangerEnum.none;
    if (danger === 2) return illsDangerEnum.small;
    if (danger === 3) return illsDangerEnum.medium;
    if (danger === 4) return illsDangerEnum.high;
    if (danger === 5) return illsDangerEnum.mortal;
  }

  return (
    <PopUp title={`${t('common.edit')} ${disease.title}`} closeModal={() => closeModal(false)}>
      <div className="addNewFood__form">
        <Textinput value={title} maxlength={20} placeholder={`${t('common.title')}...`} onChange={(event) => setTitle(event.target.value)}/>
        <label>
          <p>{t('health.mChooseDanger')}</p>
          <select className="addFoodForDay__form__time" onChange={(event: any) => setDanger(event.target.value)}>
            <option value={danger}>Set: {showDangerName(danger)}</option>
            <option value={1}>{illsDangerEnum.none}</option>
            <option value={2}>{illsDangerEnum.small}</option>
            <option value={3}>{illsDangerEnum.medium}</option>
            <option value={4}>{illsDangerEnum.high}</option>
            <option value={5}>{illsDangerEnum.mortal}</option>
          </select>
        </label>
        <textarea
          className="addNewIllness__form__textarea"
          placeholder={`${t('common.description')}...`}
          onChange={(event) => setDescr(event.target.value)}
          value={descr}
        >
        </textarea>
        <textarea
          className="addNewIllness__form__textarea"
          placeholder={`${t('common.description')}...`}
          onChange={(event) => setTreatment(event.target.value)}
          value={treatment}
        ></textarea>
        <label>
          {/* Move to component */}
          <input className='addNewIllness__form__checkbox' type="checkbox" onChange={(event) => setIsChronicle(event.target.checked) } checked={isChronicle} />
          {t('health.mIsChronically')}
        </label>
         <Button title={t('common.add')} onClick={() => saveChangesOnDisease(title, descr || '', danger, disease.id || '', treatment, isChronicle)} />

      </div>
    </PopUp>
  )
}

export default EditDiseaseModal;
