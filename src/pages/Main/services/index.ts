import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';

export async function signUpService (name: string, email: string, pass: string): Promise<{userData: {token: string}, status: number, error?: string}> {
  return await fetch(API_URL + '/users/signup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      name,
      email,
      password: pass
    }),
  })
  .then(res => res.json());
}

export async function signInService (email: string, pass: string): Promise<{status: number, token: string, errors?: [{msg: string, param: string}]}> {
  return await fetch(API_URL + '/users/signin', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      email,
      password: pass
    }),
  })
  .then(res => res.json());
}

export async function restoreUserPass (email: string, pass: string, code: string, start = true): Promise<{status: number, errors?: [{msg: string, param: string}]}> {
  return await fetch(API_URL + '/users/restorepass', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      email,
      pass,
      code,
      start
    }),
  })
  .then(res => res.json());
}