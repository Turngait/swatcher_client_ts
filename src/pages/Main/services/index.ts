import { API_URL } from 'config/api';

export async function signUpService (name: string, email: string, pass: string): Promise<{status: number, token: string, errors?: [{msg: string, param: string}]}> {
  return await fetch(API_URL + '/users/signup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    mode: "cors",
    body: JSON.stringify({
      name,
      email,
      pass
    }),
  })
  .then(res => res.json());
}

export async function signInService (email: string, pass: string): Promise<{status: number, token: string, errors?: [{msg: string, param: string}]}> {
  return await fetch(API_URL + '/users/signin', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    mode: "cors",
    body: JSON.stringify({
      email,
      pass
    }),
  })
  .then(res => res.json());
}