import React from 'react';
import { useTranslation } from 'react-i18next';
import './index.scss';

import PopUp from 'components/common/PopUp';

const Contacts: React.FC<{onClose: () => void}> = ({onClose}) => {
  const { t } = useTranslation();

  return (
    <PopUp title={t('index.contactUs')} closeModal={() => onClose()}>
      <div className='contacts__text'>
        If you have any questions you can freely contact us via <a className='contacts__text__link' href="mailto:info@ilya-r.ru">our  e-mail</a>
      </div>
    </PopUp>
  )
}

export default Contacts;