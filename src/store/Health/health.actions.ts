export function getHealthData() {
  return null;
}

export function setAllHealth(illnesses: any): (dispatch: any) => void {
  return (dispatch: any) => {
    dispatch({type: 'SET_HEALTH', payload: illnesses});
  }
} 