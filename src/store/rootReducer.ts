import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import foodReducer from './Food/food.reducer';
import healthReducer from './Health/health.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  food: foodReducer,
  health: healthReducer,
});
