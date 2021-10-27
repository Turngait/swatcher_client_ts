export interface IFood {
  id: string,
  title: string,
  callories: number,
  groupId: string,
  descr: string,
  createdAt: string
}

export interface IIllness {
  id?: string,
  title: string,
  danger: string,
  descr: string
}

export interface IUserData {
  name: string,
  email: string,
  status: string,
  isBanned: boolean,
  data: {
    sex: string,
    age: number,
    weight: number,
    height: number,
  },
  settings: {
    lang: string,
    theme: string,
  },
  onboarding: {
    firstTime: boolean,
  },
  createdAt: string
}

export interface IFoodStat {
  id?: string,
  food_id: string,
  description: string,
  amount: number,
  time: string
}

export interface IIllnessStat {
  health_id?: string,
  power: number,
  begin: string,
  duration: string,
  description: string
}

export interface IStat {
  id?: string,
  date: string,
  foods: IFoodStat[] | [],
  health: [IIllnessStat] | []
}

export enum illsDangerEnum {
  none = 'Незначительная',
  small = 'Небольшая',
  medium = 'Средняя',
  high = 'Высокая',
  mortal = 'Смертелньая'
}