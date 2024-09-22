import { Request, Response, NextFunction } from 'express';

import { categories as service } from '../../services';

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await service.get();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
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
  get: getCategories,
  getById: getCategoryById,
};
