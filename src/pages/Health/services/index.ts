import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';

import {IIllnessStat} from 'types/common';

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
export async function addIllnessForDayService(illness: IIllnessStat, date: string, token: string | null): Promise<{status: number}> {
  return await fetch(API_URL + '/stats/addillnessforday', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      illness,
      date,
      token
    }),
  })
  .then(res => res.json());
}