import { RouteComponentProps } from "react-router-dom";

import {IUserData} from './common';

export interface IDashboardProps extends RouteComponentProps {
  userData?: IUserData,
  setUserData: (data: IUserData) => void
}