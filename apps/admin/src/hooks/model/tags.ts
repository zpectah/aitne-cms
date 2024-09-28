import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { TagsFormData, TagsModel } from '@model';
import { API_TAGS_BASE } from '../../constants';

const API_ROOT = `${process.env.API_BASE}${API_TAGS_BASE}`;

export const useTagsQuery = () => {
  const query = useQuery<unknown, unknown, TagsModel[]>({
    queryKey: ['tags', 'tags-list'],
    queryFn: () => axios.get(API_ROOT).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useTagsDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['tags', `tags-detail-${id}`],
    queryFn: () => axios.get(`${API_ROOT}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useTagsMutations = () => {
  const createMutation = useMutation<unknown, unknown, TagsFormData>({
    mutationKey: ['tags', 'tags-create'],
    mutationFn: (payload) => axios.put(API_ROOT, payload),
  });

  const updateMutation = useMutation<unknown, unknown, TagsFormData>({
    mutationKey: ['tags', 'tags-update'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['tags', 'tags-delete'],
    mutationFn: ({ id }) => axios.delete(`${API_ROOT}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['tags', 'tags-selected-delete'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/selected/delete`, payload),
  });

  const toggleMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['tags', 'tags-toggle'],
    mutationFn: ({ id }) => axios.patch(`${API_ROOT}/toggle/${id}`),
  });

  const toggleSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['tags', 'tags-selected-toggle'],
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
