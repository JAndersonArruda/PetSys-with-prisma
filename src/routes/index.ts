import express from 'express';
import configurePetShopRoutes from './petShop';
import configurePetRoutes from './pet';

const router = express.Router();

configurePetShopRoutes(router);
configurePetRoutes(router);

export default router;