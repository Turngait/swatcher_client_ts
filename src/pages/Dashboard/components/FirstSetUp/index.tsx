import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import './index.scss';

const FirstSetUp:React.FC<{saveData: (sex: string, age: number, weight: number, height: number) => void}> = ({saveData}) => {
  const { t } = useTranslation();

  const [sex, setSex] = useState('man');
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  return (
    <PopUp title={t("stats.fillData")}>
      <div className="firstSU__form">
        <label>
          <p className="firstSU__form__desc">{t("stats.fsSetSex")}</p>
          <select className="firstSU__form__select" onChange={(event) => setSex(event.target.value)}>
            <option value="man">{t("stats.fsMan")}</option>
            <option value="woman">{t("stats.fsWoman")}</option>
            <option value="other">{t("stats.fsOther")}</option>
          </select>
        </label>
        <Textinput type="number" placeholder={`${t("stats.fsYourAge")}...`} onChange={(event) => setAge(+event.target.value)}/>
        <Textinput type="number" placeholder={`${t("stats.fsYourWeight")}...`} onChange={(event) => setWeight(+event.target.value)}/>
        <Textinput type="number" placeholder={`${t("stats.fsYourHeight")}...`} onChange={(event) => setHeight(+event.target.value)}/>
        <Button title={t("common.save")} onClick={() => saveData(sex, age, weight, height)}/>
      </div>
    </PopUp>
  )
}

export default FirstSetUp;
