import {IUserData, IIllness, IFood, IStat} from 'types/common';

export function setUserData(data: IUserData, stat: [any] | [], foods: IFood[], health: IIllness[]):  (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_USER_DATA', payload: data});
    dispatch({type: 'SET_STAT', payload: stat});
    dispatch({type: 'SET_FOODS', payload: foods});
    dispatch({type: 'SET_HEALTH', payload: health});
  }
}

export function setPeriod(period: string) {
  return (dispatch: any) => {
    dispatch({type: 'SET_PERIOD', payload: period});
  }
}

export function setStat(stat: IStat[]) {
  return (dispatch: any) => {
    dispatch({type: 'SET_STAT', payload: stat});
  }
}

export function setUserInfoData(data: IUserData): (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_USER_DATA', payload: data});
  }
}