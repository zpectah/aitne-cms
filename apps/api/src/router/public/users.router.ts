import { Router } from 'express';

import { users } from '../../controllers/public';

const router = Router();

router.get('/', users.get);
router.get('/:id', users.getById);

export default router;
