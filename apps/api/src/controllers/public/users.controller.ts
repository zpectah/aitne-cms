import { Request, Response, NextFunction } from 'express';

import { users as service } from '../../services';

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const items = await service.get();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const item = await service.getById(id);

    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item' });
  }
};

export default {
  get: getUsers,
  getById: getUserById,
};
