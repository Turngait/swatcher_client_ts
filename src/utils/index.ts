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
  let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${ye}-${mo}-${da}`;
}

export function getPeriod(date: string | null = null): string {
  const dateForPeriod = getDate(date);

  return dateForPeriod.slice(0, 7);
}