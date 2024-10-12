import { create } from 'zustand';

import { TagsModel } from '@model';
import { listTableOrderKeys, ListTableSortDefaults } from '../../../components';

interface TagsListStore {
  sort: ListTableSortDefaults<TagsModel>;
  setSort: (sort: ListTableSortDefaults<TagsModel>) => void;
}

export const useTagsListStore = create<TagsListStore>((set) => ({
  sort: { order: listTableOrderKeys.asc, orderBy: 'id' },
  setSort: (sort) => set({ sort }),
}));
