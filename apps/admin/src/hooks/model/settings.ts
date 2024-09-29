import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { SettingsModel } from '@model';
import { API_SETTINGS_BASE } from '../../constants';

const API_ROOT = `${process.env.API_BASE}${API_SETTINGS_BASE}`;

export const useSettingsQuery = () => {
  const query = useQuery<unknown, unknown, SettingsModel>({
    queryKey: ['settings', 'settings-object'],
    queryFn: () => axios.get(API_ROOT).then((res) => res.data),
  });

  return {
    query,
  };
};

export const useSettingsMutations = () => {
  const updateMutation = useMutation<unknown, unknown, Partial<SettingsModel>>({
    mutationKey: ['settings', 'settings-update'],
    mutationFn: (payload) => axios.patch(`${API_ROOT}/patch`, payload),
  });

  return {
    updateMutation,
  };
};
