import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { ArticlesFormData, ArticlesModel } from '@model';
import { API_ARTICLES_BASE } from '../../constants';

const API_ROOT = `${process.env.API_BASE}${API_ARTICLES_BASE}`;

export const useArticlesQuery = () => {
  const query = useQuery<unknown, unknown, ArticlesModel[]>({
    queryKey: ['articles', 'articles-list'],
    queryFn: () => axios.get(API_ROOT).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useArticlesDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['articles', `articles-detail-${id}`],
    queryFn: () => axios.get(`${API_ROOT}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useArticlesMutations = () => {
  const createMutation = useMutation<unknown, unknown, ArticlesFormData>({
    mutationKey: ['articles', 'articles-create'],
    mutationFn: (payload) => axios.put(API_ROOT, payload),
  });

  const updateMutation = useMutation<unknown, unknown, ArticlesFormData>({
    mutationKey: ['articles', 'articles-update'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['articles', 'articles-delete'],
    mutationFn: ({ id }) => axios.delete(`${API_ROOT}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['articles', 'articles-selected-delete'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/selected/delete`, payload),
  });

  const toggleMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['articles', 'articles-toggle'],
    mutationFn: ({ id }) => axios.patch(`${API_ROOT}/toggle/${id}`),
  });

  const toggleSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['articles', 'articles-selected-toggle'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/selected/toggle`, payload),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    deleteSelectedMutation,
    toggleMutation,
    toggleSelectedMutation,
  };
};
