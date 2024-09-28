import { Request, Response, NextFunction } from 'express';

import { settings as service } from '../../services';

const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const items = await service.get();

    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

const getSettingsByName = async (req: Request, res: Response, next: NextFunction) => {
  return {};
};

export default {
  get: getSettings,
  getByName: getSettingsByName,
};
