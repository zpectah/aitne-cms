import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { TranslationsFormData, TranslationsModel } from '@model';
import { API_TRANSLATIONS_BASE } from '../../constants';

const API_ROOT = `${process.env.API_BASE}${API_TRANSLATIONS_BASE}`;

export const useTranslationsQuery = () => {
  const query = useQuery<unknown, unknown, TranslationsModel[]>({
    queryKey: ['translations', 'translations-list'],
    queryFn: () => axios.get(API_ROOT).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useTranslationsDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['translations', `translations-detail-${id}`],
    queryFn: () => axios.get(`${API_ROOT}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useTranslationsMutations = () => {
  const createMutation = useMutation<unknown, unknown, TranslationsFormData>({
    mutationKey: ['translations', 'translations-create'],
    mutationFn: (payload) => axios.put(API_ROOT, payload),
  });

  const updateMutation = useMutation<unknown, unknown, TranslationsFormData>({
    mutationKey: ['translations', 'translations-update'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['translations', 'translations-delete'],
    mutationFn: ({ id }) => axios.delete(`${API_ROOT}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['translations', 'translations-selected-delete'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/selected/delete`, payload),
  });

  const toggleMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['translations', 'translations-toggle'],
    mutationFn: ({ id }) => axios.patch(`${API_ROOT}/toggle/${id}`),
  });

  const toggleSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['translations', 'translations-selected-toggle'],
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
