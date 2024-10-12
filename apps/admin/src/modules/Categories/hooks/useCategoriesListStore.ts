import { create } from 'zustand';

import { CategoriesModel } from '@model';
import { listTableOrderKeys, ListTableSortDefaults } from '../../../components';

interface CategoriesListStore {
  sort: ListTableSortDefaults<CategoriesModel>;
  setSort: (sort: ListTableSortDefaults<CategoriesModel>) => void;
}

export const useCategoriesListStore = create<CategoriesListStore>((set) => ({
  sort: { order: listTableOrderKeys.asc, orderBy: 'id' },
  setSort: (sort) => set({ sort }),
}));
