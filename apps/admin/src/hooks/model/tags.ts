import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { TagsFormData } from '@model';

export const useTagsQuery = () => {
  const query = useQuery({
    queryKey: ['tags-list'],
    queryFn: () => fetch(`${process.env.API_BASE}/api/private/tags`).then((res) => res.json()),
  });

  return {
    query,
  };
};

export const useTagsDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: [`tags-detail-${id}`],
    queryFn: () => fetch(`${process.env.API_BASE}/api/private/tags/${id}`).then((res) => res.json()),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useTagsMutations = () => {
  const createMutation = useMutation<unknown, unknown, TagsFormData>({
    mutationKey: ['tags-create'],
    mutationFn: (payload) => axios.put(`${process.env.API_BASE}/api/private/tags`, payload),
  });

  const updateMutation = useMutation<unknown, unknown, TagsFormData>({
    mutationKey: ['tags-update'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}/api/private/tags/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['tags-delete'],
    mutationFn: (payload) => axios.delete(`${process.env.API_BASE}/api/private/tags/${payload.id}`),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
