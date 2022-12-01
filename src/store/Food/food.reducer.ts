const initialState = {
  foods: [],
  ingredients: []
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
    default:
      return state;
  }
};
