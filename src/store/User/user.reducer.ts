import { IStat, IUserData } from 'types/common';
import { getPeriod } from '../../utils';

interface IUserStore {
  userData: null | IUserData,
  stat: [] | IStat[],
  period: string
}

const initialState: IUserStore = {
  userData: null,
  stat: [],
  period: getPeriod()
}

export default function userReducer(state = initialState, action: any) {
  switch(action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload
      }
    case 'SET_STAT':
      return {
        ...state,
        stat: action.payload
      }
    case 'SET_PERIOD':
      return {
        ...state,
        period: action.payload
      }
    default:
      return state;
  }
}
