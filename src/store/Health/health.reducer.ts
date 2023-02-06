const initState = {
  illnesses: [],
  groups: [],
  bodyPlaces: [],
}

export default function healthReducer(state = initState, action: any) {
  switch(action.type) {
    case 'SET_HEALTH':
      return {
        ...state,
        illnesses: action.payload
      };
    case 'SET_GROUPS':
      return{
        ...state,
        groups: action.payload
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