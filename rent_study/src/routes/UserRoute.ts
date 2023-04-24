import { Router } from 'express';
import { IDatabaseConnection } from '../database/IDatabaseConnection';
import UserController from '../controllers/UserController';

const UserRoutes = (db: IDatabaseConnection): Router => {
  const router = Router();
  const userController = new UserController(db);

  router.get('/', userController.getAllUsers);
  router.get('/:id', userController.getUserById);
  router.post('/', userController.createUser);
  router.put('/:id', userController.updateUser);
  router.delete('/:id', userController.deleteUser);
  router.post('/login', userController.loginUser);

  return router;
};

export default UserRoutes;