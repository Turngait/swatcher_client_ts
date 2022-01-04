import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';

import {IIllnessStat} from 'types/common';

export async function addNewIllnessService(title: string, descr: string, danger: number, token: string | null): Promise<{status: number, id: string}> {
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
      danger,
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

export async function deleteIllnessService(id: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/health/deleteillness', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      id,
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

export async function editIllnessService(title: string, descr: string, danger: number, id: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/health/editillness', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      token,
      title,
      descr,
      danger,
      id
    }),
  })
  .then(res => res.json());
}