import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';
import { IFood } from 'types/common';

export async function addNewFoodService(
    title: string,
    calories: number,
    units: string,
    harmfulness: number,
    descr: string,
    token: string | null
  ): Promise<{status: number, id: string, errors: any}> {
  return await fetch(API_URL + '/food', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token ? token : ''
    },
    mode: "cors",
    body: JSON.stringify({
      title,
      calories,
      units,
      harmfulness,
      descr
    }),
  })
  .then(res => res.json());
}

export async function getAllFoodsDataService(token: string): Promise<[IFood] | []> {
  return await fetch(API_URL + '/food', {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
  })
  .then(res => res.json());
}

export async function editFood(food: IFood, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/food', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      ...food
    }),
  })
  .then(res => res.json());
}

export async function deleteFood(foodId: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/food', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      foodId
    }),
  })
  .then(res => res.json());
}

export async function getStatForPeriod(period: string, token: string): Promise<{stat: any | []}> {
  return await fetch(API_URL + '/stats/getstat', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      period
    }),
  })
  .then(res => res.json());
}