import { Router } from 'express';

import { comments } from '../../controllers/private';

const router = Router();

router.get('/', comments.get);
router.get('/:id', comments.getById);
router.put('/', comments.create);
router.patch('/:id', comments.update);
router.delete('/:id', comments.delete);
router.patch('/selected/delete', comments.deleteSelected);

router.patch('/toggle/:id', comments.toggle);
router.patch('/selected/toggle', comments.toggleSelected);

export default router;
