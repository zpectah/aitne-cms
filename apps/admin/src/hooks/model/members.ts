import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { MembersFormData, MembersModel } from '@model';
import { API_MEMBERS_BASE } from '../../constants';

const API_ROOT = `${process.env.API_BASE}${API_MEMBERS_BASE}`;

export const useMembersQuery = () => {
  const query = useQuery<unknown, unknown, MembersModel[]>({
    queryKey: ['members', 'members-list'],
    queryFn: () => axios.get(API_ROOT).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useMembersDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['members', `members-detail-${id}`],
    queryFn: () => axios.get(`${API_ROOT}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useMembersMutations = () => {
  const createMutation = useMutation<unknown, unknown, MembersFormData>({
    mutationKey: ['members', 'members-create'],
    mutationFn: (payload) => axios.put(API_ROOT, payload),
  });

  const updateMutation = useMutation<unknown, unknown, MembersFormData>({
    mutationKey: ['members', 'members-update'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['members', 'members-delete'],
    mutationFn: ({ id }) => axios.delete(`${API_ROOT}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['members', 'members-selected-delete'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/selected/delete`, payload),
  });

  const toggleMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['members', 'members-toggle'],
    mutationFn: ({ id }) => axios.patch(`${API_ROOT}/toggle/${id}`),
  });

  const toggleSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['members', 'members-selected-toggle'],
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
