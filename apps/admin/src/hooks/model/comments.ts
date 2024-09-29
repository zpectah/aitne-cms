import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { CommentsFormData, CommentsModel } from '@model';
import { API_COMMENTS_BASE } from '../../constants';

const API_ROOT = `${process.env.API_BASE}${API_COMMENTS_BASE}`;

export const useCommentsQuery = () => {
  const query = useQuery<unknown, unknown, CommentsModel[]>({
    queryKey: ['comments', 'comments-list'],
    queryFn: () => axios.get(API_ROOT).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useCommentsDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['comments', `comments-detail-${id}`],
    queryFn: () => axios.get(`${API_ROOT}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useCommentsMutations = () => {
  const createMutation = useMutation<unknown, unknown, CommentsFormData>({
    mutationKey: ['comments', 'comments-create'],
    mutationFn: (payload) => axios.put(API_ROOT, payload),
  });

  const updateMutation = useMutation<unknown, unknown, CommentsFormData>({
    mutationKey: ['comments', 'comments-update'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['comments', 'comments-delete'],
    mutationFn: ({ id }) => axios.delete(`${API_ROOT}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['comments', 'comments-selected-delete'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/selected/delete`, payload),
  });

  const toggleMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['comments', 'comments-toggle'],
    mutationFn: ({ id }) => axios.patch(`${API_ROOT}/toggle/${id}`),
  });

  const toggleSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['comments', 'comments-selected-toggle'],
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
