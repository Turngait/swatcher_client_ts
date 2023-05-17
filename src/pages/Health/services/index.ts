import { API_URL } from 'config/api';
import { API_KEY } from 'config/keys';
import { IBodyPlaces, IIllness } from 'types/common';

// TODO типизировать errors
export async function addNewIllnessService(title: string, descr: string, placeId: string, danger: number, token: string | null): Promise<{status: number, id: string, errors: any}> {
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

export async function getAllSymptomsDataService(token: string): Promise<{ illnesses: IIllness[], bodyPlaces: IBodyPlaces[] }> {
  return await fetch(API_URL + '/symptoms', {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
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

export async function editIllnessService(title: string, descr: string, danger: number, id: string, token: string, placeId: string): Promise<{status: number}> {
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
      _id: id,
      placeId
    }),
  })
  .then(res => res.json());
}

export async function addGroupService (title: string, token: string): Promise<{ id: string, status: number }> {
  console.log(title);
  return await fetch(API_URL + '/symptoms-group', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      title
    }),
  })
  .then(res => res.json());
}

export async function addBodyPlaceService (title: string, token: string): Promise<{ id: string, status: number }> {
  console.log(title);
  return await fetch(API_URL + '/body-places', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY,
      "TOKEN": token
    },
    mode: "cors",
    body: JSON.stringify({
      title
    }),
  })
  .then(res => res.json());
}