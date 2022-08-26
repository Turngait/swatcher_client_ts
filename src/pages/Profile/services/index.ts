import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';

import { IUserPersonalData } from 'types/common';

export async function changeUserNameService(name: string, token: string): Promise<{status: number, errors: [{msg: string, param: string}]}> {
  return await fetch(API_URL + '/users/changename', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      name
    }),
  })
  .then(res => res.json());
}

export async function changeUserPassService(oldPass: string, pass: string, token: string): Promise<{status: number, errors: [{msg: string, param: string}]}> {
  return await fetch(API_URL + '/users/changepass', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      oldPass,
      newPass: pass
    }),
  })
  .then(res => res.json());
}

export async function changeUserPersonalData(data: IUserPersonalData, token: string): Promise<{status: number, errors: [{msg: string, param: string}]}> {
  return await fetch(API_URL + '/users/changepersdata', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      data
    }),
  })
  .then(res => res.json());
}