import { Request, Response } from 'express';
import { users as usersService } from '../services';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await usersService.getUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const user = await usersService.getUserById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await usersService.createUser(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const updatedUser = await usersService.updateUser(id, req.body);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const isDeleted = await usersService.deleteUser(id);

    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
