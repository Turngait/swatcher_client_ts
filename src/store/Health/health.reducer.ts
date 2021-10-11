const initState = {
  illnesses: []
}

export default function healthReducer(state = initState, action: any) {
  switch(action.type) {
    case 'SET_HEALTH':
      return {
        ...state,
        illnesses: action.payload
      };
    default:
      return state;
  }
}