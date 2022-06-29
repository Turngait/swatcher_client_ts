export function normalizeStatFoods(statFood: any, foods: any): any {
  const normalizeData = [];
  for (const stat of statFood) {
    for (const food of foods) {
      if(stat.food_id === food.id) {
        stat.title = food.title;
      }
    }
    normalizeData.push(stat); 
  }

  return normalizeData;
}

export function getDate(date: string | null = null): string {
  let d = new Date();
  if(date) d = new Date(date);
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${ye}-${mo}-${da}`;
}

export function getPeriod(date: string | null = null): string {
  const dateForPeriod = getDate(date);

  return dateForPeriod.slice(0, 7);
}

export const logOut = (history: any) => {
  localStorage.removeItem('token');
  history.push('/');
}

export function showPower(power: number): string {
  if(power===1) return 'Minimum'; 
  if(power===2) return 'Low'; 
  if(power===3) return 'Medium'; 
  if(power===4) return 'High'; 
  if(power===5) return 'Highest'; 
  return 'Unknown';
}

export function showHarmfulness(power: number): string {
  if(power===1) return 'Minimum'; 
  if(power===2) return 'Low'; 
  if(power===3) return 'Medium'; 
  if(power===4) return 'High'; 
  if(power===5) return 'Highest'; 
  return 'Unknown';
}