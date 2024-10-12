import { create } from 'zustand';

import { ArticlesModel } from '@model';
import { listTableOrderKeys, ListTableSortDefaults } from '../../../components';

interface ArticlesListStore {
  sort: ListTableSortDefaults<ArticlesModel>;
  setSort: (sort: ListTableSortDefaults<ArticlesModel>) => void;
}

export const useArticlesListStore = create<ArticlesListStore>((set) => ({
  sort: { order: listTableOrderKeys.asc, orderBy: 'id' },
  setSort: (sort) => set({ sort }),
}));
