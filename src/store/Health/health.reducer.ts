import { IBodyPlaces, IIllness } from "types/common";

interface IHealthStore {
  illnesses: [] | IIllness[],
  bodyPlaces: [] | IBodyPlaces[],
}

const initState: IHealthStore = {
  illnesses: [],
  bodyPlaces: [],
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
    default:
      return state;
  }
}