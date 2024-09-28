import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { CategoriesFormData, CategoriesModel } from '@model';
import { API_CATEGORIES_BASE } from '../../constants';

const API_ROOT = `${process.env.API_BASE}${API_CATEGORIES_BASE}`;

export const useCategoriesQuery = () => {
  const query = useQuery<unknown, unknown, CategoriesModel[]>({
    queryKey: ['categories', 'categories-list'],
    queryFn: () => axios.get(API_ROOT).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useCategoriesDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['categories', `categories-detail-${id}`],
    queryFn: () => axios.get(`${API_ROOT}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useCategoriesMutations = () => {
  const createMutation = useMutation<unknown, unknown, CategoriesFormData>({
    mutationKey: ['categories', 'categories-create'],
    mutationFn: (payload) => axios.put(API_ROOT, payload),
  });

  const updateMutation = useMutation<unknown, unknown, CategoriesFormData>({
    mutationKey: ['categories', 'categories-update'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['categories', 'categories-delete'],
    mutationFn: ({ id }) => axios.delete(`${API_ROOT}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['categories', 'categories-selected-delete'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/selected/delete`, payload),
  });

  const toggleMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['categories', 'categories-toggle'],
    mutationFn: ({ id }) => axios.patch(`${API_ROOT}/toggle/${id}`),
  });

  const toggleSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['categories', 'categories-selected-toggle'],
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
