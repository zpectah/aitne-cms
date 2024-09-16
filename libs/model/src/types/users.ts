import { usersTypeKeys, usersRoleKeys } from '../enums';

export type UsersType = keyof typeof usersTypeKeys;
export type UsersRole = keyof typeof usersRoleKeys;

export interface UsersModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  type: UsersType;
  role: UsersRole;
  salt: string;
  created: string;
  updated: string;
  active: number;
  deleted: number;
}

export type User = Omit<UsersModel, 'id'>;
