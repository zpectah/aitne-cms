import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { PagesFormData, PagesModel } from '@model';
import { API_PAGES_BASE } from '../../constants';

const API_ROOT = `${process.env.API_BASE}${API_PAGES_BASE}`;

export const usePagesQuery = () => {
  const query = useQuery<unknown, unknown, PagesModel[]>({
    queryKey: ['pages', 'pages-list'],
    queryFn: () => axios.get(API_ROOT).then((res) => res.data),
  });

  return {
    query,
  };
};

export const usePagesDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['pages', `pages-detail-${id}`],
    queryFn: () => axios.get(`${API_ROOT}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const usePagesMutations = () => {
  const createMutation = useMutation<unknown, unknown, PagesFormData>({
    mutationKey: ['pages', 'pages-create'],
    mutationFn: (payload) => axios.put(API_ROOT, payload),
  });

  const updateMutation = useMutation<unknown, unknown, PagesFormData>({
    mutationKey: ['pages', 'pages-update'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['pages', 'pages-delete'],
    mutationFn: ({ id }) => axios.delete(`${API_ROOT}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['pages', 'pages-selected-delete'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/selected/delete`, payload),
  });

  const toggleMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['pages', 'pages-toggle'],
    mutationFn: ({ id }) => axios.patch(`${API_ROOT}/toggle/${id}`),
  });

  const toggleSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['pages', 'pages-selected-toggle'],
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
