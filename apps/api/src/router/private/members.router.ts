import { Router } from 'express';

import { members } from '../../controllers/private';

const router = Router();

router.get('/', members.get);
router.get('/:id', members.getById);
router.put('/', members.create);
router.patch('/:id', members.update);
router.delete('/:id', members.delete);
router.patch('/selected/delete', members.deleteSelected);

router.patch('/toggle/:id', members.toggle);
router.patch('/selected/toggle', members.toggleSelected);

export default router;
