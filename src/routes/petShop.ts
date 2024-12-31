import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const configurePetShopRoutes = (router: Router) => {
    router.get('/petshops', async (req: Request, res: Response) => {});

    router.get('/petshops/:id', async (req: Request, res: Response) => {});

    router.post('/petshops', async (req: Request, res: Response) => {});

    router.put('/petshops/:id', async (req: Request, res: Response) => {});

    router.delete('/petshops/:id', async (req: Request, res: Response) => {});
}

export default configurePetShopRoutes;