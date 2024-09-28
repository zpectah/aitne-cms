import { Router } from 'express';

import { categories } from '../../controllers/private';

const router = Router();

router.get('/', categories.get);
router.get('/:id', categories.getById);
router.put('/', categories.create);
router.patch('/:id', categories.update);
router.delete('/:id', categories.delete);
router.patch('/selected/delete', categories.deleteSelected);

router.patch('/toggle/:id', categories.toggle);
router.patch('/selected/toggle', categories.toggleSelected);

export default router;
