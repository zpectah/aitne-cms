import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { CategoriesFormData, CategoriesModel } from '@model';
import { API_CATEGORIES_BASE } from '../../constants';

export const useCategoriesQuery = () => {
  const query = useQuery<unknown, unknown, CategoriesModel[]>({
    queryKey: ['categories', 'categories-list'],
    queryFn: () => axios.get(`${process.env.API_BASE}${API_CATEGORIES_BASE}`).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useCategoriesDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['categories', `categories-detail-${id}`],
    queryFn: () => axios.get(`${process.env.API_BASE}${API_CATEGORIES_BASE}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useCategoriesMutations = () => {
  const createMutation = useMutation<unknown, unknown, CategoriesFormData>({
    mutationKey: ['categories', 'categories-create'],
    mutationFn: (payload) => axios.put(`${process.env.API_BASE}${API_CATEGORIES_BASE}`, payload),
  });

  const updateMutation = useMutation<unknown, unknown, CategoriesFormData>({
    mutationKey: ['categories', 'categories-update'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}${API_CATEGORIES_BASE}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['categories', 'categories-delete'],
    mutationFn: ({ id }) => axios.delete(`${process.env.API_BASE}${API_CATEGORIES_BASE}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['categories', 'categories-selected-delete'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}${API_CATEGORIES_BASE}/selected/delete`, payload),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    deleteSelectedMutation,
  };
};
