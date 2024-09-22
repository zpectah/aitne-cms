import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { TagsFormData, TagsModel } from '@model';
import { API_TAGS_BASE } from '../../constants';

export const useTagsQuery = () => {
  const query = useQuery<unknown, unknown, TagsModel[]>({
    queryKey: ['tags', 'tags-list'],
    queryFn: () => axios.get(`${process.env.API_BASE}${API_TAGS_BASE}`).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useTagsDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['tags', `tags-detail-${id}`],
    queryFn: () => axios.get(`${process.env.API_BASE}${API_TAGS_BASE}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useTagsMutations = () => {
  const createMutation = useMutation<unknown, unknown, TagsFormData>({
    mutationKey: ['tags', 'tags-create'],
    mutationFn: (payload) => axios.put(`${process.env.API_BASE}${API_TAGS_BASE}`, payload),
  });

  const updateMutation = useMutation<unknown, unknown, TagsFormData>({
    mutationKey: ['tags', 'tags-update'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}${API_TAGS_BASE}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['tags', 'tags-delete'],
    mutationFn: ({ id }) => axios.delete(`${process.env.API_BASE}${API_TAGS_BASE}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['tags', 'tags-selected-delete'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}${API_TAGS_BASE}/selected/delete`, payload),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    deleteSelectedMutation,
  };
};
