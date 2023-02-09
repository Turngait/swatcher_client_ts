import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';

import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import './index.scss';

const AddNewBodyPlaceModal: React.FC<{
  addNewPlace: (title: string) => void,
}> = ({ addNewPlace }) => {
  // const { t } = useTranslation();
  const [title, setTitle] = useState('');

  return (
      <div className="addNewGroup__form">
        <Textinput maxlength={20} placeholder={`Place title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Button title="Add Place" onClick={() => addNewPlace(title)} />
      </div>
  )
}

export default AddNewBodyPlaceModal;
