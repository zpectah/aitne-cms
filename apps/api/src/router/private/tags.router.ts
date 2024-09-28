import { Router } from 'express';

import { tags } from '../../controllers/private';

const router = Router();

router.get('/', tags.get);
router.get('/:id', tags.getById);
router.put('/', tags.create);
router.patch('/:id', tags.update);
router.delete('/:id', tags.delete);
router.patch('/selected/delete', tags.deleteSelected);

router.patch('/toggle/:id', tags.toggle);
router.patch('/selected/toggle', tags.toggleSelected);

export default router;
