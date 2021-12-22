/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RouteComponentProps } from "react-router-dom";

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';
import AddNewFoodModal from './components/Modals/AddNewFood';
import AddFoodForDayModal from './components/Modals/AddFoodForDay';
import EditFoodModal from './components/Modals/EditFood';
import Loader from 'components/common/Loader';

import { 
  addNewFoodService,
  getAllFoodsDataService,
  deleteFood,
  addFoodForDay,
  getStatForPeriod,
  deleteFoodForDayService,
  editFood
} from './services';

import { setAllFoods } from 'store/Food/food.action';
import { setPeriod, setStat } from 'store/User/user.actions';
import { IFood, IFoodStat, IStat } from 'types/common';

import './index.scss';

const FoodPage: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const foods: [IFood] | [] = useSelector((state: any) => state.food.foods);
  const period: string = useSelector((state: any) => state.user.period);
  const stats: IStat[] = useSelector((state: any) => state.user.stat);

  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [isAddFoodForDayOpen, setIsAddFoodForDayOpen] = useState(false);
  const [isEditFoodOpen, setIsEditFoodOpen] = useState(false);
  const [editableFood, setEditableFood] = useState<IFood | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
  const addNewFood = async (title: string, callories: number, harmfulness: number, descr: string): Promise<void> => {
    setLoading(true);
    const { status, id } = await addNewFoodService(title, callories, harmfulness, descr, token);
    if (status === 200) {
      setIsAddFoodOpen(false);
      const food: IFood = {
        id,
        title,
        callories,
        groupId: '',
        descr,
        createdAt: new Date().toISOString().slice(0,10)
      };

      dispatch(setAllFoods([...foods, food]));
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

  //TODO добавить обработку ошибок и вывод ошибок и добавить реактивности
  const deleteFoodForDayHandler = async (id: string, date: string): Promise<void> => {
    setLoading(true);
    const { status } = await deleteFoodForDayService(id, date, token || '');
    if (status === 200) {
      for (const stat of stats) {
        if (stat.date === date) {
          stat.foods = stat.foods.filter((food: any) => food.id !== id);
        }
      }
      console.log('deleteFoodForDayHandler', stats);
      dispatch(setStat(stats));
    }
    setLoading(false);
  }

  const addFoodForDayHandler = async (foodId: string, amount: number, date: string, time: string, description: string): Promise<void> => {
    setLoading(true);
    const food:IFoodStat = {
      food_id: foodId,
      amount,
      time,
      description
    };
    const { status } = await addFoodForDay(food, date, token || '');
    if (status === 200) {
      // dispatch(setStat(stats));
      setIsAddFoodForDayOpen(false);
      const {stat} = await getStatForPeriod(period, token || '');
      if(stat) {
        dispatch(setStat(stat));
      }
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
      {isAddFoodForDayOpen ? <AddFoodForDayModal addFoodForDay={addFoodForDayHandler} foods={foods} closeModal={setIsAddFoodForDayOpen}/> : null}
      <LeftMenu exit={exit}/>
      <div className="foodPage__info">
        <Header changePeriod={changePeriod} title="Еда"/>
        <Info
          onDeleteFood={deleteFoodHandler}
          setIsAddFoodForDayOpen={setIsAddFoodForDayOpen}
          setIsAddFoodOpen={setIsAddFoodOpen}
          onEditFood={editFoodOpener}
          onDeleteFoodForDay={deleteFoodForDayHandler}
        />
      </div>
    </div>
  )
}

export default FoodPage;
