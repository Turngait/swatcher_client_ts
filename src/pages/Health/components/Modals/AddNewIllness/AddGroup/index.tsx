import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';

import Textinput from 'components/controls/TextInput';
import Button from 'components/controls/Button';

import './index.scss';

const AddNewGroupModal: React.FC<{
  addNewGroup: (title: string) => void,
}> = ({ addNewGroup }) => {
  // const { t } = useTranslation();
  const [title, setTitle] = useState('');

  return (
      <div className="addNewGroup__form">
        <Textinput maxlength={20} placeholder={`Group title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Button title="Add Group" onClick={() => addNewGroup(title)} />
      </div>
  )
}

export default AddNewGroupModal;
