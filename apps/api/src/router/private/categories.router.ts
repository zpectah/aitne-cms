import { Router } from 'express';

import { categories } from '../../controllers/private';

const router = Router();

router.get('/', categories.get);
router.get('/:id', categories.getById);
router.put('/', categories.create);
router.patch('/:id', categories.update);
router.delete('/:id', categories.delete);
router.patch('/selected/delete', categories.deleteSelected);

export default router;
