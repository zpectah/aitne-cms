import { Router } from 'express';

import { users } from '../../controllers/private';

const router = Router();

router.get('/', users.get);
router.get('/:id', users.getById);
router.put('/', users.create);
router.patch('/:id', users.update);
router.delete('/:id', users.delete);
router.patch('/delete', users.deleteSelected);

router.patch('/toggle/:id', users.toggle);
router.patch('/selected/toggle', users.toggleSelected);

export default router;
