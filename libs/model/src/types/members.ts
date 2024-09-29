import { membersTypeKeys } from '../enums';

export type MembersType = keyof typeof membersTypeKeys;

export interface MembersModel {
  id: number;
  type: MembersType;
  email: string;
  password: string;
  salt: string;
  firstname: string;
  lastname: string;

  /*
  alias: string;
  phone: string;
  phone_alt: string[];
  email_alt: string[];
  birthdate: string;
  address_street: string;
  address_street_no: string;
  address_city: string;
  address_country: string;
  address_zip: string;
  address_flat_no: string;
  bank_account: string;
  position: string;
  description: string;
  subscription: number;
  public: number;
  */

  created: string;
  updated: string;
  active: number;
  deleted: number;
}
