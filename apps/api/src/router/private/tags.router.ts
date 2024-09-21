import { Router } from 'express';

import { tags } from '../../controllers/private';

const router = Router();

router.get('/', tags.get);
router.get('/:id', tags.getById);
router.put('/', tags.create);
router.patch('/:id', tags.update);
router.delete('/:id', tags.delete);
// TODO #delete-multiple ids
router.patch('/selected/delete', tags.deleteSelected);

export default router;
