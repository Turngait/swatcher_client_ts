import { API_URL } from 'config/api';

export async function saveFirstSetupData(sex: string, age: number, weight: number, height: number, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/users/savedata', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
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

export async function getInitData(token: string): Promise<any> {
  return await fetch(API_URL + '/getdata', {
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