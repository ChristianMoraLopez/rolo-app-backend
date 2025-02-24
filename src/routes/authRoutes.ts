// src/routes/authRoutes.ts
import { Router } from 'express';
import { register, login, googleAuth, verifyToken, getUsers } from '../controllers/authController';

const router = Router();

// Define routes with proper typing
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/verify', verifyToken);
router.get('/users', getUsers); // Nueva ruta para obtener usuarios

export default router;