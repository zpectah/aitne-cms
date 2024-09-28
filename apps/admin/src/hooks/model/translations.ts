import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { TranslationsFormData, TranslationsModel } from '@model';
import { API_TRANSLATIONS_BASE } from '../../constants';

export const useTranslationsQuery = () => {
  const query = useQuery<unknown, unknown, TranslationsModel[]>({
    queryKey: ['Translations', 'Translations-list'],
    queryFn: () => axios.get(`${process.env.API_BASE}${API_TRANSLATIONS_BASE}`).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useTranslationsDetailQuery = (id: number | undefined) => {
  const query = useQuery({
    queryKey: ['Translations', `Translations-detail-${id}`],
    queryFn: () => axios.get(`${process.env.API_BASE}${API_TRANSLATIONS_BASE}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useTranslationsMutations = () => {
  const createMutation = useMutation<unknown, unknown, TranslationsFormData>({
    mutationKey: ['Translations', 'Translations-create'],
    mutationFn: (payload) => axios.put(`${process.env.API_BASE}${API_TRANSLATIONS_BASE}`, payload),
  });

  const updateMutation = useMutation<unknown, unknown, TranslationsFormData>({
    mutationKey: ['Translations', 'Translations-update'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}${API_TRANSLATIONS_BASE}/${payload.id}`, payload),
  });

  const deleteMutation = useMutation<unknown, unknown, { id: number }>({
    mutationKey: ['Translations', 'Translations-delete'],
    mutationFn: ({ id }) => axios.delete(`${process.env.API_BASE}${API_TRANSLATIONS_BASE}/${id}`),
  });

  const deleteSelectedMutation = useMutation<unknown, unknown, { ids: readonly number[] }>({
    mutationKey: ['Translations', 'Translations-selected-delete'],
    mutationFn: (payload) => axios.patch(`${process.env.API_BASE}${API_TRANSLATIONS_BASE}/selected/delete`, payload),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    deleteSelectedMutation,
  };
};
