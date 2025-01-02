import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const configurePetRoutes = (router: Router) => {
    router.get('/pets', async (req: Request, res: Response) => {
        const account = req.headers['cnpj'];

        if (!account) {
            res.status(401).json({ message: "Missing required header: cnpj" });
            return;
        }

        const cnpj = Array.isArray(account) ? account[0] : account;

        try {
            const userAccount = await prisma.petShops.findFirst({
                where: {
                    cnpj: cnpj
                }
            })
    
            if (!userAccount) {
                res.status(404).json({ message: "User not exists" });
            }
            
            const pets = await prisma.pets.findMany({
                where: {
                    cnpjPetshop: cnpj
                }
            });

            res.status(200).json(pets);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving pets" });            
        }
    });

    router.get('/pets/:id', async (req: Request, res: Response) => {
        const id = req.params.id;
        const account = req.headers['cnpj'];

        if (!account) {
            res.status(401).json({ message: "Missing required header: cnpj" });
            return;
        }

        const cnpj = Array.isArray(account) ? account[0] : account;

        try {
            const userAccount = await prisma.petShops.findFirst({
                where: {
                    cnpj: cnpj
                }
            });

            if (!userAccount) {
                res.status(404).json({ message: "User not exists" });
            }

            const pet = await prisma.pets.findFirst({
                where: {
                    id: id,
                    cnpjPetshop: cnpj
                }
            });

            if (!pet) {
                res.status(404).json({ message: "Pet not exists" });
                return;
            }

            res.status(200).json(pet);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving pet" });            
        }
    });

    router.post('/pets', async (req: Request, res: Response) => {});

    router.put('/pets/:id', async (req: Request, res: Response) => {});

    router.patch('/pets/:id/vaccinated', async (req: Request, res: Response) => {});

    router.delete('/pets/:id', async (req: Request, res: Response) => {});
}

export default configurePetRoutes;