import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';

// TODO типизировать errors
export async function addNewIllnessService(title: string, descr: string, groupId: string, placeId: string, danger: number, token: string | null): Promise<{status: number, id: string, errors: any}> {
  return await fetch(API_URL + '/symptoms', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token ? token : ''
    },
    mode: "cors",
    body: JSON.stringify({
      title,
      groupId,
      placeId,
      descr,
      danger,
    }),
  })
  .then(res => res.json());
}

export async function deleteIllnessService(id: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/symptoms', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      symptomId: id,
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
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      period
    }),
  })
  .then(res => res.json());
}

export async function editIllnessService(title: string, descr: string, danger: number, id: string, token: string): Promise<{status: number}> {
  return await fetch(API_URL + '/symptoms', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      title,
      descr,
      danger,
      _id: id
    }),
  })
  .then(res => res.json());
}