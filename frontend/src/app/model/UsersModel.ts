import { BaseModel } from './BaseModel';

export class UsersModel extends BaseModel    {
    name: string;
    username: string;
    role: string;
    isAdmin: boolean;
    password: string;
    confirmPassword: string;
  };
