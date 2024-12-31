import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const configurePetRoutes = (router: Router) => {
    router.get('/pets', async (req: Request, res: Response) => {});

    router.get('/pets/:id', async (req: Request, res: Response) => {});

    router.post('/pets', async (req: Request, res: Response) => {});

    router.put('/pets/:id', async (req: Request, res: Response) => {});

    router.patch('/pets/:id/vaccinated', async (req: Request, res: Response) => {});

    router.delete('/pets/:id', async (req: Request, res: Response) => {});
}

export default configurePetRoutes;