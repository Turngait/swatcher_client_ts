import { IIllness, IBodyPlaces, IDisease } from "../../types/common";

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

export function setDiseases(diseases: IDisease[]): (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_DISEASES', payload: diseases});
  }
}

export function setActiveDiseases(activeDiseases: string[]): (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_ACTIVE_DISEASES', payload: activeDiseases});
  }
}