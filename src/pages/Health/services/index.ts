import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';

export async function addNewIllnessService(title: string, descr: string, token: string | null): Promise<{status: number}> {
  return await fetch(API_URL + '/health/addillness', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      title,
      descr,
      token
    }),
  })
  .then(res => res.json());
}