import { Request, Response, NextFunction } from 'express';

import { users as usersService } from '../../services';

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await usersService.get();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const user = await usersService.getById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

export default {
  get: getUsers,
  getById: getUserById,
};
