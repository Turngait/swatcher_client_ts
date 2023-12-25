/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';

import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import {IIllness} from 'types/common';

import "react-datepicker/dist/react-datepicker.css";
import './index.scss';
import Select, { ISelectOption } from 'components/controls/Select';

const AddIllness: React.FC<{
    illnesses: IIllness[],
    addIllnesForDay: (illnesId: string, power: number, duration: string, descr: string, time: string, date: string, setMsg:(msg: string | null) => void) => void
  }> = ({illnesses, addIllnesForDay}) => {
    const { t } = useTranslation();

    const [selectedIll, setSelectedIll] = useState(illnesses.length ? illnesses[0].id : '');
    const [power, setPower] = useState(1);
    const [duration, setDuration] = useState('1');
    const [descr, setDescr] = useState('');
    const [time, setTime] = useState(new Date().toLocaleTimeString().slice(0, 5));
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));
    const [msg, setMsg] = useState<string | null>(null);
    const [illOptions, setIllOptions] = useState<ISelectOption[]>([]);

    useEffect(() => {
      const temporaryIllOptions = illnesses.map((item: IIllness) => { return {value: item.id || '', title: item.title || '' }});
      setIllOptions(temporaryIllOptions);
    }, [])
    

  return (
    <>
      {
        msg ? <p className="addNewIllnessForDay__msg">{msg}</p> : null
      }
      <div className="addFoodForDay__form">
        { illnesses.length ? <>
          <label>
            <p>{t('health.mChooseDay')}</p>
            <input value={date} className="addFoodForDay__form__time" type="date" onChange={(event) => setDate(event.target.value)}/>
          </label>
          <label>
            <p>{t('health.mChooseIllness')}</p>
            <Select 
              items={illOptions}
              defaultValue={selectedIll || 0}
              onChange={(event) => setSelectedIll(event.target.value)}
            />
          </label>
          <label>
            <p>{t('health.mChoosePower')}</p>
            <Select 
              items={[
                {value: 1, title: t('common.minimum')},
                {value: 2, title: t('common.low')},
                {value: 3, title: t('common.medium')},
                {value: 4, title: t('common.high')},
                {value: 5, title: t('common.highest')}
              ]}
              defaultValue={1}
              onChange={(event) => setPower(+event.target.value)}
            />
          </label>
          <Textinput maxValue={24} value={duration} type="number" placeholder={`${t('health.mDurationInHours')}...`} onChange={(event) => setDuration(event.target.value)}/>
          <label>
            <p>{t('foods.mChooseTime')}</p>
            <DatePicker
              value={time}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="addFoodForDay__form__time"
              onChange={(date: Date) => setTime(date.toLocaleTimeString().slice(0, 5))}
            />
          </label>
          <textarea
            className="addFoodForDay__form__textarea"
            placeholder={`${t('health.mAdditionalInfo')}...`}
            onChange={(event) => setDescr(event.target.value)}
          >
          </textarea>
          <Button title={t('common.add')} onClick={() => addIllnesForDay(selectedIll || '', power, duration, descr, time, date, setMsg)} />
        </> : null}
      </div>
    </>
  )
}

export default AddIllness;
