import express from 'express';
import controller from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import ROLE from '../middleware/authRole.js';
// import authRole from '../middleware/authRole.js';

const router = express.Router();

router.post('/', controller.add);
router.get('/', auth, controller.getAll);

router.get('/:id', auth, controller.getById); //authRole(ROLE.ADMIN),
router.delete('/:id', auth, controller.deleteOne);
router.put('/:id', auth, controller.update);

export default router;
