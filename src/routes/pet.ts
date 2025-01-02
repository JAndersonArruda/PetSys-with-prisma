import { Request, Response, Router } from 'express';
import { prisma } from '.';

import checkExistsUserAccount from '../middlewares/checkExistsUserAccont';
import verifyPetById from '../middlewares/verifyPetById';
import requiredPetDateBody from '../middlewares/requiredPetDateBody';
import validateDeadline from '../middlewares/validateDeadline';

const configurePetRoutes = (router: Router) => {
    router.get('/pets', checkExistsUserAccount, async (req: Request, res: Response) => {
        const account = req.account!;

        try {            
            const pets = await prisma.pets.findMany({
                where: {
                    cnpjPetshop: account
                }
            });

            res.status(200).json(pets);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving pets" });          
        }
    });

    router.get('/pets/:id', checkExistsUserAccount, verifyPetById, async (req: Request, res: Response) => {
        const id = req.params.id;
        const account = req.account!;

        try {
            const pet = await prisma.pets.findFirst({
                where: {
                    id: id,
                    cnpjPetshop: account
                }
            });

            res.status(200).json(pet);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving pet" });            
        }
    });

    router.post('/pets', checkExistsUserAccount, requiredPetDateBody, validateDeadline, async (req: Request, res: Response) => {
        const data = req.body;
        const account = req.account!;
        const deadline = req.deadline!;

        try {
            const newPet = await prisma.pets.create({
                data: {
                    name: data.name,
                    type: data.type,
                    description: data.description,
                    vaccinated: false,
                    deadline_vaccination: deadline,
                    created_at: new Date(),
                    cnpjPetshop: account
                }
            });
            
            res.status(201).json(newPet);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating pet" });
        }
    });

    router.put('/pets/:id', checkExistsUserAccount, verifyPetById, requiredPetDateBody, validateDeadline, async (req: Request, res: Response) => {
        const id = req.params.id;
        const data = req.body;
        const account = req.account!;
        const deadline = req.deadline!;

        try {
            const updatePet = await prisma.pets.update({
                where: {
                    id: id,
                    cnpjPetshop: account
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

    router.patch('/pets/:id/vaccinated', checkExistsUserAccount, verifyPetById, async (req: Request, res: Response) => {
        const id = req.params.id;
        const account = req.account!;

        try {
            const vaccinatedPet = await prisma.pets.update({
                where: {
                    id: id,
                    cnpjPetshop: account
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

    router.delete('/pets/:id', checkExistsUserAccount, verifyPetById, async (req: Request, res: Response) => {
        const id = req.params.id;
        const account = req.account!;

        try {
            const pet = await prisma.pets.delete({
                where: {
                    id: id,
                    cnpjPetshop: account
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