import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export type MysqlPromiseRequest =
  | ResultSetHeader
  | ResultSetHeader[]
  | RowDataPacket[]
  | RowDataPacket[][]
  | [RowDataPacket[], ResultSetHeader];

// TODO
export type RequestParameters = {
  version?: string | undefined;
} & {
  environment?: string | undefined;
} & {
  model?: string | undefined;
} & {
  type?: string | undefined;
} & {
  mod1?: string | undefined;
} & {
  mod2?: string | undefined;
} & {
  mod3?: string | undefined;
};
