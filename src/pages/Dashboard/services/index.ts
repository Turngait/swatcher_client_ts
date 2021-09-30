import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';
import {IUserData} from 'types/common';

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

export async function getInitData(token: string): Promise<{user: IUserData | null, status: number}> {
  return await fetch(API_URL + '/getdata', {
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