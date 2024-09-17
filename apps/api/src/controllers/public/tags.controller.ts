import { Request, Response, NextFunction } from 'express';

import { tags as tagsService } from '../../services';

const getTags = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await tagsService.get();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags' });
  }
};

const getTagById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const user = await tagsService.getById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tag' });
  }
};

export default {
  get: getTags,
  getById: getTagById,
};
