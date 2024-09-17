import { Router } from 'express';

import tags from './tags.router';
import users from './users.router';

const router = Router();

router.use('/tags', tags);
router.use('/users', users);

export default router;
