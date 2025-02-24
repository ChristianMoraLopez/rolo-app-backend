
// src/routes/locationRoutes.ts
import express from 'express';
import { auth } from '../middleware/auth';
import createLocation from '../controllers/locationController';
import getLocations from '../controllers/locationController';
import getLocation from '../controllers/locationController';

const router = express.Router();

router.post('/', auth, createLocation);
router.get('/', getLocations);
router.get('/:id', getLocation);

export default router;