import { NextFunction, Request, Response } from "express";
import { prisma } from "../routes";

const verifyPetById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const account = req.account;

    try {
        const pet = await prisma.pets.findFirst({
            where: {
                id: id,
                cnpjPetshop: account
            }
        });

        if (!pet) {
            res.status(404).json({ message: "Pet not exists" });
            return;
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving by ID pet" });
    }
}

export default verifyPetById;