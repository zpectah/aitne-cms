import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { ArticlesFormData, ArticlesModel } from '@model';
import { API_ARTICLES_BASE } from '../../constants';

export const useArticlesQuery = () => {
  const query = useQuery<unknown, unknown, ArticlesModel[]>({
    queryKey: ['articles', 'articles-list'],
    queryFn: () => axios.get(`${process.env.API_BASE}${API_ARTICLES_BASE}`).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useArticlesDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['articles', `articles-detail-${id}`],
    queryFn: () => axios.get(`${process.env.API_BASE}${API_ARTICLES_BASE}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useArticlesMutations = () => {
  const createMutation = useMutation<unknown, unknown, ArticlesFormData>({
    mutationKey: ['articles', 'articles-create'],
    mutationFn: (payload) => axios.put(`${process.env.API_BASE}${API_ARTICLES_BASE}`, payload),
  });

  const updateMutation = useMutation<unknown, unknown, ArticlesFormData>({
    mutationKey: ['articles', 'articles-update'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}${API_ARTICLES_BASE}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['articles', 'articles-delete'],
    mutationFn: ({ id }) => axios.delete(`${process.env.API_BASE}${API_ARTICLES_BASE}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['articles', 'articles-selected-delete'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}${API_ARTICLES_BASE}/selected/delete`, payload),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    deleteSelectedMutation,
  };
};
