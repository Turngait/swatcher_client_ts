/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import LeftMenu from '../../components/common/LeftMenu';
import Header from '../../components/common/Header';
import Info from './components/Info';
import AddNewFoodModal from './components/Modals/AddNewFood';
import AddFoodForDayModal from './components/Modals/AddFoodForDay';

import { 
  addNewFoodService,
  getAllFoodsDataService,
  deleteFood,
  addFoodForDay,
  getStatForPeriod,
  deleteFoodForDayService
} from './services';

import { setAllFoods } from 'store/Food/food.action';
import { setPeriod, setStat } from 'store/User/user.actions';
import { IFood, IFoodStat } from 'types/common';

import './index.scss';

const FoodPage: React.FC = () => {
  const dispatch = useDispatch();
  const foods: [IFood] | [] = useSelector((state: any) => state.food.foods);
  const period: string = useSelector((state: any) => state.user.period);
  const stats = useSelector((state: any) => state.user.stat);

  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [isAddFoodForDayOpen, setIsAddFoodForDayOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const init = async (token: string, period: string): Promise<void> => {
    if (Array.isArray(foods) && foods.length === 0) {
      const { foods } = await getAllFoodsDataService(token);
      if (foods) dispatch(setAllFoods(foods));
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setToken(token);
      init(token, period);
    }
  }, []);

  // TODO Добавить обработку ошибок и вывод сообщений
  const addNewFood = async (title: string, callories: number, descr: string): Promise<void> => {
    const { status } = await addNewFoodService(title, callories, descr, token);
    if (status === 200) {
      setIsAddFoodOpen(false);
      // TODO возвращать со статусом ID нового продукта и не делать еще один запрос к АПИ
      const { foods } = await getAllFoodsDataService(token || '');
      if (foods) dispatch(setAllFoods(foods));
    }
  }

  const deleteFoodHandler = async (id: string): Promise<void> => {
    const {status} = await deleteFood(id, token || '');
    // TODO добавить вывод ошибки сервера на экран
    if (status === 200) {
      const newFoods = foods.filter((food) => food.id !== id);
      dispatch(setAllFoods(newFoods));
    }
  }

  //TODO добавить обработку ошибок и вывод ошибок и добавить реактивности
  const deleteFoodForDayHandler = async (id: string, date: string): Promise<void> => {
    const { status } = await deleteFoodForDayService(id, date, token || '');
    console.log(status);
    if (status === 200) {
      for (const stat of stats) {
        if (stat.date === date) {
          stat.foods = stat.foods.filter((food: any) => food.id !== id);
        }
      }
      dispatch(setStat(stats));
    }
  }

  const addFoodForDayHandler = async (foodId: string, amount: number, date: string, time: string, description: string): Promise<void> => {
    const food:IFoodStat = {
      food_id: foodId,
      amount,
      time,
      description
    };
    const { status, stats } = await addFoodForDay(food, date, token || '');
    console.log(status);
    console.log(stats);
  }
  async function changePeriod(period: string): Promise<void> {
    console.log(period);
    const {stat} = await getStatForPeriod(period, token || '');
    if(stat) {
      dispatch(setStat(stat));
      dispatch(setPeriod(period));
    }
    console.log(stat);
  }

  return (
    <div className="foodPage">
      {
        isAddFoodOpen ? <AddNewFoodModal addNewFood={addNewFood} closeModal={setIsAddFoodOpen}/> : null
      }
      {isAddFoodForDayOpen ? <AddFoodForDayModal addFoodForDay={addFoodForDayHandler} foods={foods} closeModal={setIsAddFoodForDayOpen}/> : null}
      <LeftMenu />
      <div className="foodPage__info">
        <Header changePeriod={changePeriod} title="Food"/>
        <Info
          onDeleteFood={deleteFoodHandler}
          setIsAddFoodForDayOpen={setIsAddFoodForDayOpen}
          setIsAddFoodOpen={setIsAddFoodOpen}
          onDeleteFoodForDay={deleteFoodForDayHandler}
        />
      </div>
    </div>
  )
}

export default FoodPage;
