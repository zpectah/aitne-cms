import { usersTypeKeys, usersRoleKeys, UsersFormData, UsersType, UsersRole } from '@model';

export const usersBlankModel: UsersFormData = {
  firstname: '',
  lastname: '',
  email: '',
  type: usersTypeKeys.default as UsersType,
  role: usersRoleKeys.redactor as UsersRole,
  // password: '',
  // salt: '',
  active: 1,
  deleted: 0,
};
