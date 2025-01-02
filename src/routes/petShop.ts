import { Request, Response, Router } from "express";
import { prisma } from ".";
import verifyPetshopById from "../middlewares/verifyPetshopById";
import validateCnpj from "../middlewares/validateCnpj";
import requiredDataBodyName from "../middlewares/requiredDataBodyName";

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

    router.get('/petshops/:id', verifyPetshopById, async (req: Request, res: Response) => {
        const id = req.params.id;
        
        try {
            const petshop = await prisma.petShops.findFirst({
                where: {
                    id: id
                }
            });

            res.status(200).json(petshop);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving petshop" });
        }
    });

    router.post('/petshops', requiredDataBodyName, validateCnpj, async (req: Request, res: Response) => {
        const data = req.body;

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
            
            const newPetshop = await prisma.petShops.create({
                data: {
                    name: data.name,
                    cnpj: data.cnpj
                }
            });

            res.status(201).json({ message: "Creating petshop successfully", petshop: newPetshop });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating petshop" });
        }
    });

    router.put('/petshops/:id',verifyPetshopById, requiredDataBodyName, async (req: Request, res: Response) => {
        const id = req.params.id;
        const data = req.body;

        if (data.cnpj) {
            res.status(400).json({ message: "CNPJ cannot be changed" });
            return;
        }

        try {
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

    router.delete('/petshops/:id', verifyPetshopById, async (req: Request, res: Response) => {
        const id = req.params.id;

        try {
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