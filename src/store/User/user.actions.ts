import {IUserData} from 'types/common';

export function setUserData(data: IUserData, stat: [any] | [], foods: any):  (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_USER_DATA', payload: data});
    dispatch({type: 'SET_STAT', payload: stat});
    dispatch({type: 'SET_FOODS', payload: foods});
  }
}

export function setPeriod(period: string) {
  return (dispatch: any) => {
    dispatch({type: 'SET_PERIOD', payload: period});
  }
}

export function setStat(stat: any) {
  return (dispatch: any) => {
    dispatch({type: 'SET_STAT', payload: stat});
  }
}