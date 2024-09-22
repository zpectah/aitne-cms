import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { TagsFormData, TagsModel } from '@model';

export const useTagsQuery = () => {
  const query = useQuery<unknown, unknown, TagsModel[]>({
    queryKey: ['tags', 'tags-list'],
    queryFn: () => axios.get(`${process.env.API_BASE}/api/private/tags`).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useTagsDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['tags', `tags-detail-${id}`],
    queryFn: () => axios.get(`${process.env.API_BASE}/api/private/tags/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useTagsMutations = () => {
  const createMutation = useMutation<unknown, unknown, TagsFormData>({
    mutationKey: ['tags', 'tags-create'],
    mutationFn: (payload) => axios.put(`${process.env.API_BASE}/api/private/tags`, payload),
  });

  const updateMutation = useMutation<unknown, unknown, TagsFormData>({
    mutationKey: ['tags', 'tags-update'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}/api/private/tags/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['tags', 'tags-delete'],
    mutationFn: (payload) => axios.delete(`${process.env.API_BASE}/api/private/tags/${payload.id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['tags', 'tags-delete-selected'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}/api/private/tags/delete`, payload),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    deleteSelectedMutation,
  };
};
