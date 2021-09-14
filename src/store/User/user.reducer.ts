const initialState = {
  userData: null
}

export default function userReducer(state = initialState, action: any) {
  switch(action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload
      }
    default:
      return state;
  }
}
