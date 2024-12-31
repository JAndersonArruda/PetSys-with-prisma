import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const configurePetShopRoutes = (router: Router) => {
    router.get('/petshops', async (req: Request, res: Response) => {
        try {
            const petshops = await prisma.petShops.findMany();
            res.status(200).json(petshops);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving petshops" });
        }
    });

    router.get('/petshops/:id', async (req: Request, res: Response) => {});

    router.post('/petshops', async (req: Request, res: Response) => {});

    router.put('/petshops/:id', async (req: Request, res: Response) => {});

    router.delete('/petshops/:id', async (req: Request, res: Response) => {});
}

export default configurePetShopRoutes;