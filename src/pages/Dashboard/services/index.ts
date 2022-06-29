import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';
import {IUserData, IIllness, IFood, IFoodStat, IStat, IIllnessStat } from 'types/common';

export async function saveFirstSetupData(sex: string, age: number, weight: number, height: number, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/users/savedata', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      sex,
      age,
      weight,
      height,
      token
    }),
  })
  .then(res => res.json());
}

export async function getInitData(token: string, period: string): Promise<{user: IUserData | null, status: number, stat: [any] | [] | null, foods: IFood[] | [], health: IIllness[] | null}> {
  return await fetch(API_URL + '/getdata', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      token,
      period
    }),
  })
  .then(res => res.json());
}

export async function getStat(token: string, period: string): Promise<{stat: [any]}> {
  return await fetch(API_URL + '/stats/getstat', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      token,
      period
    }),
  })
  .then(res => res.json());
}

export async function addFoodForDay(food: IFoodStat, date: string, token: string): Promise<{status: number, statsForday: IStat, errors: any}> {
  return await fetch(API_URL + '/stats/addfoodforday', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      ...food,
      date,
      token
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
    },
    mode: "cors",
    body: JSON.stringify({
      token,
      period
    }),
  })
  .then(res => res.json());
}


export async function deleteFoodForDayService(id: string, date: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/stats/delfood', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      id,
      date,
      token
    }),
  })
  .then(res => res.json());
}

export async function addIllnessForDayService(illness: IIllnessStat, date: string, token: string | null): Promise<{status: number, errors: any}> {
  return await fetch(API_URL + '/stats/addillnessforday', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      ...illness,
      date,
      token
    }),
  })
  .then(res => res.json());
}

export async function deleteIllnessForDayService(id: string, date: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/stats/deleteillness', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      id,
      date,
      token
    }),
  })
  .then(res => res.json());
}

