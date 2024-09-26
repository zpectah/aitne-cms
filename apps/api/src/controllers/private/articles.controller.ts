import { Request, Response, NextFunction } from 'express';

import { articles as service } from '../../services';

const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await service.get();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

const getArticleById = async (req: Request, res: Response, next: NextFunction) => {
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

const createArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newItem = await service.create(req.body);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
};

const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
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

const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
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

const deleteSelectedArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body;
    const result = await service.deleteSelected(ids);

    res.status(200).json({ message: `${result.affectedRows} items marked as deleted.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update items.' });
  }
};

export default {
  get: getArticles,
  getById: getArticleById,
  create: createArticle,
  update: updateArticle,
  delete: deleteArticle,
  deleteSelected: deleteSelectedArticles,
};
