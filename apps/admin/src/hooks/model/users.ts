import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { UsersFormData, UsersModel } from '@model';
import { API_USERS_BASE } from '../../constants';

const API_ROOT = `${process.env.API_BASE}${API_USERS_BASE}`;

export const useUsersQuery = () => {
  const query = useQuery<unknown, unknown, UsersModel[]>({
    queryKey: ['users', 'users-list'],
    queryFn: () => axios.get(API_ROOT).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useUsersDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['users', `users-detail-${id}`],
    queryFn: () => axios.get(`${API_ROOT}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useUsersMutations = () => {
  const createMutation = useMutation<unknown, unknown, UsersFormData>({
    mutationKey: ['users', 'users-create'],
    mutationFn: (payload) => axios.put(API_ROOT, payload),
  });

  const updateMutation = useMutation<unknown, unknown, UsersFormData>({
    mutationKey: ['users', 'users-update'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['users', 'users-delete'],
    mutationFn: ({ id }) => axios.delete(`${API_ROOT}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['users', 'users-selected-delete'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/selected/delete`, payload),
  });

  const toggleMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['users', 'users-toggle'],
    mutationFn: ({ id }) => axios.patch(`${API_ROOT}/toggle/${id}`),
  });

  const toggleSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['users', 'users-selected-toggle'],
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
