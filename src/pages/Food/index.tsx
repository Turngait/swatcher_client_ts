/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';
import AddNewFoodModal from './components/Modals/AddNewFood';
import EditFoodModal from './components/Modals/EditFood';
import Loader from 'components/common/Loader';
import MobileMenu from 'components/common/MobileMenu';

import { 
  addNewFoodService,
  getAllFoodsDataService,
  deleteFood,
  getStatForPeriod,
  editFood
} from './services';

import { setAllFoods } from 'store/Food/food.action';
import { setPeriod, setStat } from 'store/User/user.actions';
import { IFood } from 'types/common';

import './index.scss';

const FoodPage: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const foods: [IFood] | [] = useSelector((state: any) => state.food.foods);

  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [isEditFoodOpen, setIsEditFoodOpen] = useState(false);
  const [editableFood, setEditableFood] = useState<IFood | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const init = async (token: string): Promise<void> => {
    if (Array.isArray(foods) && foods.length === 0) {
      const { foods } = await getAllFoodsDataService(token);
      if (foods) dispatch(setAllFoods(foods));
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setToken(token);
      init(token);
    }
  }, []);

  // TODO Добавить обработку ошибок и вывод сообщений
  const addNewFood = async (
      title: string,
      calories: number,
      units:string,
      harmfulness: number,
      descr: string,
      setMsg: (msg: string | null) => void
    ): Promise<void> => {
    setLoading(true);
    const { status, id, errors } = await addNewFoodService(title, calories, units, harmfulness, descr, token);
    if (status === 200) {
      setIsAddFoodOpen(false);
      const food: IFood = {
        id,
        title,
        calories: calories,
        harmfulness,
        units,
        groupId: '',
        descr,
        createdAt: new Date().toISOString().slice(0,10)
      };

      dispatch(setAllFoods([...foods, food]));
    } else if(errors && errors.length) {
      setMsg(errors[0].msg || t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    } else {
      setMsg(t('msgs.err1'));
      setTimeout(() => setMsg(null), 3000)
    }
    setLoading(false);
  }

  const exit = () => {
    localStorage.removeItem('token');
    history.push('/');
  }

  const deleteFoodHandler = async (id: string): Promise<void> => {
    setLoading(true);
    const {status} = await deleteFood(id, token || '');
    // TODO добавить вывод ошибки сервера на экран
    if (status === 200) {
      const newFoods = foods.filter((food) => food.id !== id);
      dispatch(setAllFoods(newFoods));
    }
    setLoading(false);
  }

  const editFoodOpener = (id: string): void => {
    const editableFood = foods.filter((food: IFood) => food.id === id);
    if (editableFood[0]) {
      setEditableFood(editableFood[0]);
      setIsEditFoodOpen(true);
    }
  }

  const editFoodHandler = async (food: IFood) => {
    setLoading(true);
    const {status} = await editFood(food, token || '');
    if (status === 200) {
      for (const idx in foods) {
        if (foods[idx].id === food.id) foods[idx] = food; 
      }
      dispatch(setAllFoods(foods));
      setIsEditFoodOpen(false);
    }
    setLoading(false);
  }

  async function changePeriod(period: string): Promise<void> {
    setLoading(true);
    const {stat} = await getStatForPeriod(period, token || '');
    if(stat) {
      dispatch(setStat(stat));
      dispatch(setPeriod(period));
    }
    setLoading(false);
  }

  return (
    <div className="foodPage">
      {
        loading ? <Loader /> : null
      }
      {
        isEditFoodOpen && editableFood ? <EditFoodModal food={editableFood} editFoodHandler={editFoodHandler} closeModal={setIsEditFoodOpen}/> : null
      }
      {
        isAddFoodOpen ? <AddNewFoodModal addNewFood={addNewFood} closeModal={setIsAddFoodOpen}/> : null
      }
      {isMenuOpen ? <MobileMenu closeMenu={setIsMenuOpen} logOut={exit} /> : null}
      <LeftMenu />
      <div className="foodPage__info">
        <Header openMenu={setIsMenuOpen} exit={exit} changePeriod={changePeriod} title={t('foods.food')}/>
        <Info
          onDeleteFood={deleteFoodHandler}
          setIsAddFoodOpen={setIsAddFoodOpen}
          onEditFood={editFoodOpener}
        />
      </div>
    </div>
  )
}

export default FoodPage;
