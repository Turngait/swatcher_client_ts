import { IIllness, IBodyPlaces } from "types/common";

export function setAllHealth(illnesses: IIllness[]): (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_HEALTH', payload: illnesses});
  }
}

export function setAllBodyPlaces(bodyPlaces: IBodyPlaces[]): (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_BODYPLACES', payload: bodyPlaces});
  }
}
