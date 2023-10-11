import Button from "components/controls/Button";
import Textinput from "components/controls/TextInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IIllness, illsDangerEnum } from "types/common";
import Select, { MultiValue } from 'react-select';

export interface SymptomsOption {
  readonly value: string;
  readonly label: string;
}

const AddDiseaseForm: React.FC<{
  addNewDisease: (title: string, treatment: string, descr: string, isChronically: boolean, danger: number, symptoms: string[], setMsg: (msg: string | null) => void) => void,
  setMsg: (msg: string | null) => void,
  symptoms: IIllness[] | [],
}> = ({symptoms, addNewDisease, setMsg}) => {

  const getSymptomsList = (symptoms: IIllness[] | []) => {
    const list: SymptomsOption[] = [];
    
    for(const symptom of symptoms) {
      list.push({
        value: symptom.id || symptom.title,
        label: symptom.title,
      });
    }
    return list;
  }

  const normalizeSelectedSymptoms = (symptoms: MultiValue<SymptomsOption>) => {
    const list: string[] = [];
    for(const symptome of symptoms) {
      list.push(symptome.value);
    }
    setSelectedSymptoms(list);
    return list;
  }

  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [treatment, setTreatment] = useState('');
  const [isChronically, setIsChronically] = useState(false);
  const [danger, setDanger] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  return (
    <div className="addNewIllness__form">
        <Textinput maxlength={20} placeholder={`${t('common.title')}...`} onChange={(event) => setTitle(event.target.value)}/>
        <Select
          isMulti
          name="colors"
          options={getSymptomsList(symptoms)}
          className="basic-multi-select"
          classNamePrefix="select"
          isSearchable={true}
          isClearable={true}
          onChange={(event) => normalizeSelectedSymptoms(event)}
        />
        <textarea
          className="addNewIllness__form__textarea"
          placeholder={`${t('health.mTreatment')}...`}
          onChange={(event) => setTreatment(event.target.value)}
        >
        </textarea>
        <textarea
          className="addNewIllness__form__textarea"
          placeholder={`${t('common.description')}...`}
          onChange={(event) => setDescr(event.target.value)}
        >
        </textarea>
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
        <label>
          {/* Move to component */}
          <input className='addNewIllness__form__checkbox' type="checkbox" onChange={(event) => setIsChronically(event.target.checked) } />
          {t('health.mIsChronically')}
        </label>
        <Button title={t('common.add')} onClick={() => addNewDisease(title, treatment, descr, isChronically, danger, selectedSymptoms, setMsg)} />
      </div>
  )
}

export default AddDiseaseForm;
