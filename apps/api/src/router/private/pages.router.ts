import { Router } from 'express';

import { pages } from '../../controllers/private';

const router = Router();

router.get('/', pages.get);
router.get('/:id', pages.getById);
router.put('/', pages.create);
router.patch('/:id', pages.update);
router.delete('/:id', pages.delete);
router.patch('/selected/delete', pages.deleteSelected);

router.patch('/toggle/:id', pages.toggle);
router.patch('/selected/toggle', pages.toggleSelected);

export default router;
