import { Request, Response, NextFunction } from 'express';

import { media as service } from '../../services';

const getMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await service.get();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

const getMediaById = async (req: Request, res: Response, next: NextFunction) => {
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

const createMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newItem = await service.create(req.body);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
};

export default {
  get: getMedia,
  getById: getMediaById,
  create: createMedia,
};
