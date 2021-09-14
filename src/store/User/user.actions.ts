import {IUserData} from 'types/common';

export function setUserData(data: IUserData):  (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_USER_DATA', payload: data});
  }
}
