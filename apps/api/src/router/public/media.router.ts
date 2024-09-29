import { Router } from 'express';

import { media } from '../../controllers/public';

const router = Router();

router.get('/', media.get);
router.get('/:id', media.getById);
router.put('/', media.create);

export default router;
