import { IIllness, IIllnessGroups, IBodyPlaces } from "types/common";

export function getHealthData() {
  return null;
}

export function setAllHealth(illnesses: IIllness[]): (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_HEALTH', payload: illnesses});
  }
} 

export function setAllGroups(groups: IIllnessGroups[]): (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_GROUPS', payload: groups});
  }
}

export function setAllBodyPlaces(bodyPlaces: IBodyPlaces[]): (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_BODYPLACES', payload: bodyPlaces});
  }
}
