const initialState = {
  foods: []
};

export default function foodReducer(state = initialState, action: any) {
  switch(action.type) {
    case 'SET_FOODS':
      return {
        ...state,
        foods: action.payload
      }
      default:
        return state;
  }
};
