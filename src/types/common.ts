export interface IFood {
  id: string,
  title: string,
  calories: number,
  callories?: number,
  harmfulness?: number,
  units?: string,
  groupId: string,
  descr: string,
  createdAt: string
}

export interface IIllness {
  id?: string,
  title: string,
  danger: number,
  descr: string
}

export interface IUserPersonalData {
  sex?: string,
  age: number,
  weight: number,
  height: number
}

export interface IUserData {
  name: string,
  email: string,
  status: string,
  isBanned: boolean,
  data: IUserPersonalData,
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
  none = 'Little',
  small = 'Small',
  medium = 'Middle',
  high = 'High',
  mortal = 'Average'
}