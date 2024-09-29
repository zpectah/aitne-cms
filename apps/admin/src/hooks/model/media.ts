import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { MediaFormData, MediaModel } from '@model';
import { API_MEDIA_BASE } from '../../constants';

const API_ROOT = `${process.env.API_BASE}${API_MEDIA_BASE}`;

export const useMediaQuery = () => {
  const query = useQuery<unknown, unknown, MediaModel[]>({
    queryKey: ['media', 'media-list'],
    queryFn: () => axios.get(API_ROOT).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useMediaDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['media', `media-detail-${id}`],
    queryFn: () => axios.get(`${API_ROOT}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useMediaMutations = () => {
  const createMutation = useMutation<unknown, unknown, MediaFormData>({
    mutationKey: ['media', 'media-create'],
    mutationFn: (payload) => axios.put(API_ROOT, payload),
  });

  const updateMutation = useMutation<unknown, unknown, MediaFormData>({
    mutationKey: ['media', 'media-update'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['media', 'media-delete'],
    mutationFn: ({ id }) => axios.delete(`${API_ROOT}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['media', 'media-selected-delete'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/selected/delete`, payload),
  });

  const toggleMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['media', 'media-toggle'],
    mutationFn: ({ id }) => axios.patch(`${API_ROOT}/toggle/${id}`),
  });

  const toggleSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['media', 'media-selected-toggle'],
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
