import { API_URL } from 'config/api';
import { IFood } from 'types/common';

export async function addNewFoodService(title: string, callories: number, descr: string, token: string | null): Promise<{status: number}> {
  return await fetch(API_URL + '/food/addfood', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
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
    },
    mode: "cors",
    body: JSON.stringify({
      token
    }),
  })
  .then(res => res.json());
}