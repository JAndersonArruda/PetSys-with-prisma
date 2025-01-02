import express from 'express';
import configurePetShopRoutes from './petShop';
import configurePetRoutes from './pet';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const router = express.Router();

configurePetShopRoutes(router);
configurePetRoutes(router);

export default router;