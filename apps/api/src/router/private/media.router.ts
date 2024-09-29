import { Router } from 'express';

import { media } from '../../controllers/private';

const router = Router();

router.get('/', media.get);
router.get('/:id', media.getById);
router.put('/', media.create);
router.patch('/:id', media.update);
router.delete('/:id', media.delete);
router.patch('/selected/delete', media.deleteSelected);

router.patch('/toggle/:id', media.toggle);
router.patch('/selected/toggle', media.toggleSelected);

export default router;
