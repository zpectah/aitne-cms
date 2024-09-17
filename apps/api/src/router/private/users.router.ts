import { Router } from 'express';
import { users } from '../../controllers';

const router = Router();

router.get('/', users.get);
router.get('/:id', users.getById);
router.put('/', users.create);
router.patch('/:id', users.update);
router.patch('/:id', users.delete);

export default router;
