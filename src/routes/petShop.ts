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

    router.get('/petshops/:id', async (req: Request, res: Response) => {
        const id = req.params.id;
        
        try {
            const petshop = await prisma.petShops.findFirst({
                where: {
                    id: id
                }
            });
            
            if (!petshop) {
                res.status(404).json({ message: "Petshop not found" });
                return;
            }

            res.status(200).json(petshop);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving petshop" });
        }
    });

    router.post('/petshops', async (req: Request, res: Response) => {
        const data = req.body;

        if (!data.name || !data.cnpj) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const regexFormatCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        if (!regexFormatCnpj.test(data.cnpj)) {
            res.status(400).json({ error: "CNPJ must follow the format XX.XXX.XXX/XXXX-XX" });
            return;
        }

        try {
            const petshop = await prisma.petShops.findFirst({
                where: {
                    cnpj: data.cnpj
                }
            });
            
            if (petshop) {
                res.status(409).json({ message: "Petshop with this CNPJ already exists" });
                return;
            }
            
            const petshops = await prisma.petShops.create({
                data: {
                    name: data.name,
                    cnpj: data.cnpj
                }
            });
            res.status(201).json(petshops);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating petshop" });
        }
    });

    router.put('/petshops/:id', async (req: Request, res: Response) => {
        const id = req.params.id;
        const data = req.body;

        if (!data.name) {
            res.status(400).json({ message: "Missing required field: name" });
            return;
        }

        if (data.cnpj) {
            res.status(400).json({ message: "CNPJ cannot be changed" });
            return;
        }

        try {
            const petshop = await prisma.petShops.findFirst({
                where: {
                    id: id
                }
            });

            if (!petshop) {
                res.status(404).json({ message: "Petshop not found" });
                return;
            }

            const updatePetshop = await prisma.petShops.update({
                where: {
                    id: id
                },
                data: {
                    name: data.name
                }
            });

            res.status(200).json( { message: "Updating successfully", petshop: updatePetshop });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error updating petshop" });
        }
    });

    router.delete('/petshops/:id', async (req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const petshop = await prisma.petShops.findFirst({
                where: {
                    id: id
                }
            });

            if (!petshop) {
                res.status(404).json({ message: "Petshop not found" });
                return;
            };

            const deletePetshop = await prisma.petShops.delete({
                where: {
                    id: id
                }
            });

            res.status(200).json({ message: "Deleting successfully", petshop: deletePetshop });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error deleting petshop" });            
        }
    });
}

export default configurePetShopRoutes;