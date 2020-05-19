import { IInterface } from './IInterface';

export interface IUsers extends IInterface {
  name: string;
  identity: string;
  role: string;
  isRoot: boolean;
};