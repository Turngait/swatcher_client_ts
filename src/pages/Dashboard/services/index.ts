import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';
import {IUserData, IIllness, IFood, IFoodStat, IStat, IIllnessStat, IBodyPlaces } from 'types/common';

export async function saveFirstSetupData(sex: string, age: number, weight: number, height: number, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/users/savedata', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      sex,
      age,
      weight,
      height,
    }),
  })
  .then(res => res.json());
}

export async function getInitData(token: string, period: string): Promise<{user: IUserData | null, status: number, stat: [any] | [] | null, foods: {foods: {publicFoods: IFood[] | []}, ingredients: any[]}, health: {illnesses: IIllness[] | null, bodyPlaces: IBodyPlaces[] | null}, diseases: any}> {
  return await fetch(API_URL + '/stats/getdata', {
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

export async function getStat(token: string, period: string): Promise<{stat: [any]}> {
  return await fetch(API_URL + '/stats/get', {
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

export async function addFoodForDay(food: IFoodStat, date: string, token: string): Promise<{status: number, statsForday: IStat, errors: any}> {
  return await fetch(API_URL + '/stats/food', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      food,
      date,
    }),
  })
  .then(res => res.json());
}

export async function getStatForPeriod(period: string, token: string): Promise<{stat: any | []}> {
  return await fetch(API_URL + '/stats/get', {
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


export async function deleteFoodForDayService(id: string, date: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/stats/food', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      id,
      date,
    }),
  })
  .then(res => res.json());
}

export async function addIllnessForDayService(illness: IIllnessStat, date: string, token: string | null): Promise<{status: number, errors: any}> {
  return await fetch(API_URL + '/stats/ill', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token ? token : ''
    },
    mode: "cors",
    body: JSON.stringify({
      illness,
      date,
    }),
  })
  .then(res => res.json());
}

export async function deleteIllnessForDayService(id: string, date: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/stats/ill', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      id,
      date,
    }),
  })
  .then(res => res.json());
}

