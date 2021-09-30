import { IFood } from 'types/common';

export function setAllFoods(foods: IFood[] | [IFood] | []): (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_FOODS', payload: foods});
  }
} 