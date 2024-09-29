import { Request, Response, NextFunction } from 'express';

import { CommentsOriginType } from '@model';
import { comments as service } from '../../services';

const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await service.get();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

const getCommentById = async (req: Request, res: Response, next: NextFunction) => {
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

const getCommentsByOrigin = async (req: Request, res: Response, next: NextFunction) => {
  const originType = req.params.type as CommentsOriginType;
  const originId = parseInt(req.params.id, 10);

  try {
    const item = await service.getByOrigin(originType, originId);

    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Items not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item' });
  }
};

const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newItem = await service.create(req.body);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
};

const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { affectedRows } = await service.update(id, req.body);

    if (affectedRows) {
      res.status(200).json({ affectedRows });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating item' });
  }
};

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { affectedRows } = await service.delete(id);

    if (affectedRows) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};

const deleteSelectedComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body;
    const result = await service.deleteSelected(ids);

    res.status(200).json({ message: `${result.affectedRows} items marked as deleted.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update items.' });
  }
};

const toggleComment = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  try {
    const { affectedRows } = await service.toggle(id);

    if (affectedRows) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error toggle item' });
  }
};

const toggleSelectedComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body;
    const result = await service.toggleSelected(ids);

    res.status(200).json({ message: `${result.affectedRows} items toggled` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update items.' });
  }
};

export default {
  get: getComments,
  getById: getCommentById,
  getByOrigin: getCommentsByOrigin,
  create: createComment,
  update: updateComment,
  delete: deleteComment,
  deleteSelected: deleteSelectedComments,
  toggle: toggleComment,
  toggleSelected: toggleSelectedComments,
};
