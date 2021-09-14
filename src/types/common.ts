export interface IFood {
  id: string,
  title: string,
  callories: number,
  groupId: string,
  descr: string,
  createdAt: string
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