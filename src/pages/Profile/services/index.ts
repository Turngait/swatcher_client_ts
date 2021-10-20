import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';

export async function changeUserNameService(name: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/users/changename', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      name,
      token
    }),
  })
  .then(res => res.json());
}

export async function changeUserPassService(oldPass: string, pass: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/users/changepass', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      oldPass,
      pass,
      token
    }),
  })
  .then(res => res.json());
}