import { Request, Response, NextFunction } from 'express';

import { tags as tagsService } from '../../services';

const getTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await tagsService.get();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags' });
  }
};

const getTagById = async (req: Request, res: Response, next: NextFunction) => {
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

const createTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await tagsService.create(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tag' });
  }
};

const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { affectedRows } = await tagsService.update(id, req.body);

    if (affectedRows) {
      res.status(200).json({ affectedRows });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating tag' });
  }
};

const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { affectedRows } = await tagsService.delete(id);

    if (affectedRows) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tag' });
  }
};

const deleteSelectedTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body;

    // eslint-disable-next-line no-restricted-globals
    if (!Array.isArray(ids) || ids.some(isNaN)) {
      return res.status(400).json({ message: 'Invalid request. Provide an array of numeric IDs.' });
    }

    const result = await tagsService.deleteSelected(ids);

    res.status(200).json({ message: `${result.affectedRows} items marked as deleted.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update items.' });
  }
};

export default {
  get: getTags,
  getById: getTagById,
  create: createTag,
  update: updateTag,
  delete: deleteTag,
  deleteSelected: deleteSelectedTags,
};
