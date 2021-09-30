import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';
import { IFood, IFoodStat, IStat } from 'types/common';

export async function addNewFoodService(title: string, callories: number, descr: string, token: string | null): Promise<{status: number}> {
  return await fetch(API_URL + '/food/addfood', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      title,
      callories,
      descr,
      token
    }),
  })
  .then(res => res.json());
}

export async function getAllFoodsDataService(token: string): Promise<{foods: [IFood] | []}> {
  return await fetch(API_URL + '/food/alldata', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      token
    }),
  })
  .then(res => res.json());
}

export async function deleteFood(id: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/food/delfood', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      id,
      token
    }),
  })
  .then(res => res.json());
}

export async function addFoodForDay(food: IFoodStat, date: string, token: string): Promise<{status: number, stats: IStat}> {
  return await fetch(API_URL + '/stats/addfoodforday', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      food,
      date,
      token
    }),
  })
  .then(res => res.json());
}