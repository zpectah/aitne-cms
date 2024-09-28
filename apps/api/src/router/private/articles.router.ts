import { Router } from 'express';

import { articles } from '../../controllers/private';

const router = Router();

router.get('/', articles.get);
router.get('/:id', articles.getById);
router.put('/', articles.create);
router.patch('/:id', articles.update);
router.delete('/:id', articles.delete);
router.patch('/selected/delete', articles.deleteSelected);

router.patch('/toggle/:id', articles.toggle);
router.patch('/selected/toggle', articles.toggleSelected);

export default router;
