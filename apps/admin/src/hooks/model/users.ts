import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { UsersFormData, UsersModel } from '@model';
import { API_USERS_BASE } from '../../constants';

export const useUsersQuery = () => {
  const query = useQuery<unknown, unknown, UsersModel[]>({
    queryKey: ['users', 'users-list'],
    queryFn: () => axios.get(`${process.env.API_BASE}${API_USERS_BASE}`).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useUsersDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['users', `users-detail-${id}`],
    queryFn: () => axios.get(`${process.env.API_BASE}${API_USERS_BASE}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useUsersMutations = () => {
  const createMutation = useMutation<unknown, unknown, UsersFormData>({
    mutationKey: ['users', 'users-create'],
    mutationFn: (payload) => axios.put(`${process.env.API_BASE}${API_USERS_BASE}`, payload),
  });

  const updateMutation = useMutation<unknown, unknown, UsersFormData>({
    mutationKey: ['users', 'users-update'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}${API_USERS_BASE}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['users', 'users-delete'],
    mutationFn: ({ id }) => axios.delete(`${process.env.API_BASE}${API_USERS_BASE}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['users', 'users-selected-delete'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}${API_USERS_BASE}/selected/delete`, payload),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    deleteSelectedMutation,
  };
};
