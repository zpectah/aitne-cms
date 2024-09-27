import TableCell from '@mui/material/TableCell';

import { UsersModel } from '@model';
import config from '../../../config';
import { ListTable, ButtonLink } from '../../components';
import { useUsersList } from './hooks';

export const UsersList = () => {
  const {
    table: { heading, items },
    query: { isError }, // TODO #error handler
    onRowDelete,
    onSelectedDelete,
  } = useUsersList();

  const renderRow = ({ id, firstname, lastname, email }: UsersModel) => (
    <>
      <TableCell>
        <ButtonLink path={`${config.routes.users.path}/${id}`}>
          {firstname} {lastname}
        </ButtonLink>
      </TableCell>
      <TableCell>{email}</TableCell>
    </>
  );

  return (
    <ListTable<UsersModel, NonNullable<unknown>>
      headingCells={heading}
      items={items}
      onRowDelete={onRowDelete}
      onSelectedDelete={onSelectedDelete}
      renderRow={renderRow}
      rootPath={config.routes.users.path}
      searchAttrs={['firstname', 'lastname', 'email']}
      sortColumns={['id', 'lastname', 'updated']}
    />
  );
};

export default UsersList;
