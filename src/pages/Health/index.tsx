import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Info from './components/Info';
import AddNewIllnessModal from './components/Modals/AddNewIllness';
import EditIllnessModal from './components/Modals/EditIllnessModal';
import EditDiseaseModal from './components/Modals/EditDiseaseModal';
import Loader from '../../components/common/Loader';
import Overlay from 'components/common/Overlay';
// import DialogModal from 'components/common/DialogModal';

import {
  addNewIllnessService,
  deleteIllnessService,
  editIllnessService,
  getAllSymptomsDataService,
  addBodyPlaceService,
  addNewDiseaseService,
  deleteDiseaseService,
  editDiseaseService,
  toggleDiseaseActiveStatus
} from './services';
import { setAllHealth, setAllBodyPlaces, setDiseases, setActiveDiseases } from '../../store/Health/health.actions';

import {IBodyPlaces, IDisease, IIllness} from '../../types/common';

import './index.scss';


const HealthPage:React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isAddIllnessOpen, setIsAddIllnessOpen] = useState(false);
  const [isEditIllnessOpen, setIsEditIllnessOpen] = useState(false);
  const [isEditDiseaseOpen, setIsEditDiseaseOpen] = useState(false);

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editableIllness, setEditableIllness] = useState<IIllness | null>(null);
  const [editableDisease, setEditableDisease] = useState<IDisease | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const illnesses: IIllness[] | [] = useSelector((state: any) => state.health.illnesses);
  const diseases: IDisease[] | [] = useSelector((state: any) => state.health.diseases);
  const bodyPlaces: IBodyPlaces[] | [] = useSelector((state: any) => state.health.bodyPlaces);

  const init = async (token: string): Promise<void> => {
    if ((Array.isArray(illnesses) && illnesses.length === 0) || (Array.isArray(diseases) && diseases.length)) {
      const data = await getAllSymptomsDataService(token);
      console.log(data);
      if(data.symptoms.illnesses) dispatch(setAllHealth(data.symptoms.illnesses));
      if(data.symptoms.bodyPlaces) dispatch(setAllBodyPlaces(data.symptoms.bodyPlaces));
      if(data.diseases.diseases) dispatch(setDiseases(data.diseases.diseases));
      if(data.diseases.active_diseases) dispatch(setActiveDiseases(data.diseases.active_diseases));
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setToken(token);
      init(token);
    }
    else history.push('/');
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

  const addBodyPlace = async (title: string): Promise<{ id: string, status: number }> => {
    setLoading(true);
    const data = await addBodyPlaceService(title, token || '');
    setLoading(false);
    return data;
  }

  const addNewIllness = async (title: string, descr: string, placeId: string, danger: number, setMsg: (msg: string | null) => void): Promise<void> => {
    setLoading(true);
    const { status, id, errors } = await addNewIllnessService(title, descr, placeId, danger, token);

    if (status === 200) {
      setIsAddIllnessOpen(false);

      const ill: IIllness = {
        id,
        title,
        placeId,
        danger,
        descr
      };

      const newIllnesses = [...illnesses, ill];
      dispatch(setAllHealth(newIllnesses));
    } else if(errors && errors.length) {
      setMsg(errors[0].msg || t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000);
    } else {
      setMsg(t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000);
    }
    setLoading(false);
  }

  const addNewDisease = async (title: string, treatment: string, descr: string, is_chronicle: boolean, danger: number, symptoms: string[],  setMsg: (msg: string | null) => void): Promise<void> => {
    setLoading(true);
    const { status, id, errors } = await addNewDiseaseService(title, treatment, descr, is_chronicle, danger, symptoms, [], token);

    if (status === 200) {
      setIsAddIllnessOpen(false);

      const disease: IDisease = {
        id,
        title,
        treatment,
        is_chronicle,
        is_active: false,
        descr,
        data: [],
        symptoms,
        danger
      };


      const newDiseases = [...diseases, disease];
      dispatch(setDiseases(newDiseases));
    } else if(errors && errors.length) {
      setMsg(errors[0].msg || t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    } else {
      setMsg(t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    }
    setLoading(false);
  }

  const deleteIllness = async (id: string): Promise<void> => {
    setLoading(true);
    const { status } = await deleteIllnessService(id, token || '');
    if(status === 200) {
      const newIlls = illnesses.filter((item) => item.id !== id);
      dispatch(setAllHealth(newIlls));
    } else {
      setMsg(t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    }
    setLoading(false);
  }

  const deleteDisease = async (id: string): Promise<void> => {
    setLoading(true);
    const { status } = await deleteDiseaseService(id, token || '');
    if(status === 200) {
      const newDiseases = diseases.filter((item) => item.id !== id);
      dispatch(setDiseases(newDiseases));
    } else {
      setMsg(t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    }
    setLoading(false);
  }

  const openEditIllness = (id: string) => {
    const editableIllness = illnesses.filter(((item: IIllness) => item.id === id));
    if(editableIllness) {
      setEditableIllness(editableIllness[0]);
      setIsEditIllnessOpen(true);
    }
  }

  const openEditDisease = (id: string) => {
    const editableDisease = diseases.filter(((item: IDisease) => item.id === id));
    if(editableDisease) {
      setEditableDisease(editableDisease[0]);
      setIsEditDiseaseOpen(true);
    }

  }

  const saveChangesOnIllness = async(title: string, descr: string, danger: number, id: string, bodyPlaceId: string) => {
    const { status } = await editIllnessService(title, descr, +danger, id, token || '', bodyPlaceId);
    if (status === 200) {
      for (const idx in illnesses) {
        if (illnesses[idx].id === id) {
          illnesses[idx].title = title;
          illnesses[idx].descr = descr;
          illnesses[idx].danger = danger;
          break;
        }
      }
      dispatch(setAllHealth(illnesses));
    } else {
      setMsg(t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    }
    setIsEditIllnessOpen(false);
  }

  const saveChangesOnDisease = async (title: string, descr: string, danger: number, id: string, treatment: string, is_chronicle: boolean) => {
    setLoading(true);
    const { status } = await editDiseaseService(title, descr, +danger, id, token || '', treatment, is_chronicle);
    if (status === 200) {
      for (const idx in diseases) {
        if (diseases[idx].id === id) {
          diseases[idx].title = title;
          diseases[idx].descr = descr;
          diseases[idx].danger = danger;
          break;
        }
      }
      dispatch(setDiseases(diseases));
    } else {
      setMsg(t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    }
    setIsEditDiseaseOpen(false);
    setLoading(false);
    return;
  }

  const toggleDiseaseActiveStatusHandler = async (id: string, is_active: boolean) => {
    setLoading(true);
    const { status } = await toggleDiseaseActiveStatus(id, !is_active, token || '');
    if (status === 200) {
      for (const idx in diseases) {
        if (diseases[idx].id === id) {
          diseases[idx].is_active = !is_active;
          break;
        }
      }
      dispatch(setDiseases(diseases));
    } else {
      setMsg(t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    }
    setLoading(false);
    return;
  }

  return (
    <div className="healthPage">
      {
        loading ? <Loader /> : null
      }
      {
        isEditIllnessOpen && editableIllness ?
          <EditIllnessModal illness={editableIllness} closeModal={setIsEditIllnessOpen} saveChangesOnIllness={saveChangesOnIllness}/>
        : null
      }
      {
        isEditDiseaseOpen && editableDisease ?
         <EditDiseaseModal disease={editableDisease} closeModal={setIsEditDiseaseOpen} saveChangesOnDisease={saveChangesOnDisease} />
         : null
      }
      {
        isAddIllnessOpen ? 
          <AddNewIllnessModal
            onClose={setIsAddIllnessOpen}
            addNewIllness={addNewIllness}
            addBodyPlace={addBodyPlace}
            addNewDisease={addNewDisease}
            bodyPlaces={bodyPlaces}
            symptoms={illnesses}
          /> : null
      }
      <Overlay setLoading={setLoading} history={history} title={t('health.health')} >
        <Info
          msg={msg}
          deleteDisease={deleteDisease}
          deleteIllness={deleteIllness}
          setIsAddIllnessOpen={setIsAddIllnessOpen}
          openEditIllness={openEditIllness}
          openEditDisease={openEditDisease}
          toggleDiseaseActiveStatus={toggleDiseaseActiveStatusHandler}
        />
      </Overlay>
    </div>
  )
}

export default HealthPage;
