import { Router } from 'express';

import { members } from '../../controllers/public';

const router = Router();

router.get('/', members.get);
router.get('/:id', members.getById);
router.put('/', members.create);
router.patch('/:id', members.update);

export default router;
