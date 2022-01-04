import React, { useState } from 'react';

import PopUp from 'components/common/PopUp';
import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import './index.scss';

const FirstSetUp:React.FC<{saveData: (sex: string, age: number, weight: number, height: number) => void}> = ({saveData}) => {
  const [sex, setSex] = useState('man');
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  return (
    <PopUp title="Заполните свои данные">
      <div className="firstSU__form">
        <label>
          <p className="firstSU__form__desc">Ваш пол</p>
          <select className="firstSU__form__select" onChange={(event) => setSex(event.target.value)}>
            <option value="man">Мужской</option>
            <option value="woman">Женский</option>
          </select>
        </label>
        <Textinput type="number" placeholder="Ваш возраст..." onChange={(event) => setAge(+event.target.value)}/>
        <Textinput type="number" placeholder="Ваш вес(кг)..." onChange={(event) => setWeight(+event.target.value)}/>
        <Textinput type="number" placeholder="Ваш рост(см)..." onChange={(event) => setHeight(+event.target.value)}/>
        <Button title="Сохранить" onClick={() => saveData(sex, age, weight, height)}/>
      </div>
    </PopUp>
  )
}

export default FirstSetUp;
