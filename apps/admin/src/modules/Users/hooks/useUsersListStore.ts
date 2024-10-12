import { create } from 'zustand';

import { UsersModel } from '@model';
import { listTableOrderKeys, ListTableSortDefaults } from '../../../components';

interface UsersListStore {
  sort: ListTableSortDefaults<UsersModel>;
  setSort: (sort: ListTableSortDefaults<UsersModel>) => void;
}

export const useUsersListStore = create<UsersListStore>((set) => ({
  sort: { order: listTableOrderKeys.asc, orderBy: 'id' },
  setSort: (sort) => set({ sort }),
}));
