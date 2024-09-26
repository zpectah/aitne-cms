import { useMemo, useState } from 'react';
import { ListTableItemLang, ListTableItemProps, UseListTableSearch } from './types';
import { SEARCH_MIN_LENGTH } from './constants';

export const useListTableSearch = <T1 extends ListTableItemProps, T2 extends ListTableItemLang>({
  items = [],
  searchAttrs,
  searchLangAttrs,
}: UseListTableSearch<T1, T2>) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    let results: T1[] = [];

    if (searchQuery.length >= SEARCH_MIN_LENGTH) {
      items.forEach((item) => {
        const queryClean = searchQuery.toLowerCase();

        // Iterate item picked attributes
        searchAttrs.forEach((attr) => {
          const stringClean = (item[attr] as string).toLowerCase();
          const index = results.findIndex((m) => m.id === item.id);

          if (stringClean.search(queryClean) > -1 && !(index > -1)) {
            results.push(item);
          }
        });

        // Iterate also language object attributes
        if (item.lang && searchLangAttrs?.length) {
          const languages = Object.keys(item.lang);

          languages.forEach((lng) => {
            searchLangAttrs.forEach((attr) => {
              const lang = item.lang?.[lng];
              const string = lang?.[attr as string];
              const stringClean = (string as string)?.toLowerCase();
              const index = results.findIndex((m) => m.id === item.id);

              if (stringClean.search(queryClean) > -1 && !(index > -1)) {
                results.push(item);
              }
            });
          });
        }
      });
    } else {
      results = [...items];
    }

    return results;
  }, [items, searchAttrs, searchLangAttrs, searchQuery]);

  return {
    results: searchResults,
    searchQuery,
    setSearchQuery,
  };
};
