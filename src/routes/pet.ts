import { Request, Response, Router } from 'express';
import { prisma } from '.';

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
                return;
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

    router.post('/pets', async (req: Request, res: Response) => {
        const data = req.body;
        const account = req.headers['cnpj'];

        if (!account) {
            res.status(401).json({ message: "Missing required header: cnpj" });
            return;
        }

        const cnpj = Array.isArray(account)? account[0] : account;

        if (!data.name || !data.type || !data.description || !data.deadline_vaccination) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const deadline = new Date(data.deadline_vaccination);
        if (isNaN(deadline.getTime())) {
            res.status(400).json({ message: "Invalid deadline_vaccination date format" });
            return;
        }

        try {
            const userAccount = await prisma.petShops.findFirst({ 
                where: {
                    cnpj: cnpj
                }
            });

            if (!userAccount) {
                res.status(404).json({ message: "User not exists" });
                return;
            }

            const newPet = await prisma.pets.create({
                data: {
                    name: data.name,
                    type: data.type,
                    description: data.description,
                    vaccinated: false,
                    deadline_vaccination: deadline,
                    created_at: new Date(),
                    cnpjPetshop: cnpj
                }
            });
            
            res.status(201).json(newPet);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating pet" });
        }
    });

    router.put('/pets/:id', async (req: Request, res: Response) => {
        const id = req.params.id;
        const data = req.body;
        const account = req.headers['cnpj'];

        if (!account) {
            res.status(401).json({ message: "Missing required header: cnpj" });
            return;
        }

        const cnpj = Array.isArray(account)? account[0] : account;

        if (!data.name || !data.type || !data.description || !data.deadline_vaccination) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const deadline = new Date(data.deadline_vaccination);
        if (isNaN(deadline.getTime())) {
            res.status(400).json({ message: "Invalid deadline_vaccination date format" });
            return;
        }

        try {
            const userAccount = await prisma.petShops.findFirst({
                where: { 
                    cnpj: cnpj
                }
            });

            if (!userAccount) {
                res.status(404).json({ message: "User not exists" });
                return;
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

            const updatePet = await prisma.pets.update({
                where: {
                    id: id,
                    cnpjPetshop: cnpj
                },
                data: {
                    name: data.name,
                    type: data.type,
                    description: data.description,
                    deadline_vaccination: deadline
                }
            });

            res.status(200).json({ message: "Update pet successfully", pet: updatePet });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error updating pet" });
        }
    });

    router.patch('/pets/:id/vaccinated', async (req: Request, res: Response) => {
        const id = req.params.id;
        const account = req.headers['cnpj'];

        if (!account) {
            res.status(401).json({ message: "Missing required header: cnpj" });
            return;
        }

        const cnpj = Array.isArray(account)? account[0] : account;

        try {
            const userAccount = await prisma.petShops.findFirst({
                where: { 
                    cnpj: cnpj
                }
            });

            if (!userAccount) {
                res.status(404).json({ message: "User not exists" });
                return;
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

            const vaccinatedPet = await prisma.pets.update({
                where: {
                    id: id,
                    cnpjPetshop: cnpj
                },
                data: {
                    vaccinated: true
                }
            });

            res.status(200).json({ message: "Pet vaccinated successfully", pet: vaccinatedPet });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error vaccinated pet" });
        }
    });

    router.delete('/pets/:id', async (req: Request, res: Response) => {
        const id = req.params.id;
        const account = req.headers['cnpj'];

        if (!account) {
            res.status(401).json({ message: "Missing required header: cnpj" });
            return;
        }

        const cnpj = Array.isArray(account)? account[0] : account;

        try {
            const userAccount = await prisma.petShops.findFirst({
                where: { 
                    cnpj: cnpj
                }
            });

            if (!userAccount) {
                res.status(404).json({ message: "User not exists" });
                return;
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

            await prisma.pets.delete({
                where: {
                    id: id,
                    cnpjPetshop: cnpj
                }
            });

            res.status(200).json({ message: "Pet deleted successfully", pet: pet });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error deleting pet" });
        }
    });
}

export default configurePetRoutes;