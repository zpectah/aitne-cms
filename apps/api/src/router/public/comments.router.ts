import { Router } from 'express';

import { comments } from '../../controllers/public';

const router = Router();

router.get('/', comments.get);
router.get('/:id', comments.getById);
router.get('/:type/:id', comments.getByOrigin);
router.put('/', comments.create);
router.patch('/:id', comments.update);
router.delete('/:id', comments.delete);

router.patch('/toggle/:id', comments.toggle);

export default router;
