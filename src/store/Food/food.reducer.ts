const initialState = {
  foods: [],
  ingredients: [],
  groups: []
};

export default function foodReducer(state = initialState, action: any) {
  switch(action.type) {
    case 'SET_FOODS':
      return {
        ...state,
        foods: action.payload
      }
    case 'SET_INGREDIENTS':
      return {
        ...state,
        ingredients: action.payload
      }
    case 'SET_GROUPS':
      return {
        ...state,
        groups: action.payload
      }
    default:
      return state;
  }
};
