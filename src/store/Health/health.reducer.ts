import { IBodyPlaces, IIllness, IDisease } from "../../types/common";

interface IHealthStore {
  illnesses: [] | IIllness[],
  bodyPlaces: [] | IBodyPlaces[],
  diseases: [] | IDisease[],
  activeDiseases: [] | string [],
}

const initState: IHealthStore = {
  illnesses: [],
  bodyPlaces: [],
  diseases: [],
  activeDiseases: []
}

export default function healthReducer(state = initState, action: any) {
  switch(action.type) {
    case 'SET_HEALTH':
      return {
        ...state,
        illnesses: action.payload
      };
    case 'SET_BODYPLACES':
      return{
        ...state,
        bodyPlaces: action.payload
      };
    case 'SET_DISEASES':
      return{
        ...state,
        diseases: action.payload
      };
    case 'SET_ACTIVE_DISEASES':
      return{
        ...state,
        activeDiseases: action.payload
      };
    default:
      return state;
  }
}