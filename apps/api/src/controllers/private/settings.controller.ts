import { Request, Response, NextFunction } from 'express';

import { SettingsModel } from '@model';
import { settings as service } from '../../services';

const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await service.get();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

const getSettingsByName = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;

  try {
    const item = await service.getByName(name as keyof SettingsModel);

    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item' });
  }
};

const patchSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { affectedRows } = await service.patch(req.body);

    if (affectedRows) {
      res.status(200).json({ affectedRows });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating item' });
  }
};

export default {
  get: getSettings,
  getByName: getSettingsByName,
  patch: patchSettings,
};
