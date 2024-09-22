import { Router } from 'express';

import categories from './categories.router';
import tags from './tags.router';
import users from './users.router';

const router = Router();

router.use('/categories', categories);
router.use('/tags', tags);
router.use('/users', users);

export default router;
