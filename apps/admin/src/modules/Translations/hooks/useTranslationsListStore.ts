import { create } from 'zustand';

import { TranslationsModel } from '@model';
import { listTableOrderKeys, ListTableSortDefaults } from '../../../components';

interface TranslationsListStore {
  sort: ListTableSortDefaults<TranslationsModel>;
  setSort: (sort: ListTableSortDefaults<TranslationsModel>) => void;
}

export const useTranslationsListStore = create<TranslationsListStore>((set) => ({
  sort: { order: listTableOrderKeys.asc, orderBy: 'id' },
  setSort: (sort) => set({ sort }),
}));
