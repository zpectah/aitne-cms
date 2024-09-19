import { Router } from 'express';

import { users } from '../../controllers/private';

const router = Router();

router.get('/', users.get);
router.get('/:id', users.getById);
router.put('/', users.create);
router.patch('/:id', users.update);
router.delete('/:id', users.delete);
// TODO #delete-multiple ids

export default router;
