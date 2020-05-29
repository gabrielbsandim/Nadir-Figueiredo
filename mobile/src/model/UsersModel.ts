import { BaseModel } from './BaseModel';

export class UsersModel extends BaseModel    {
    name: string;
    identity: string;
    role: string;
    isRoot: boolean;
    password: string;
    confirmPassword: string;
  };