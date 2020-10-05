import { IInterface } from './IInterface';

export interface IUsers extends IInterface {
  name: string;
  username: string;
  role: string;
  isAdmin: boolean;
};
