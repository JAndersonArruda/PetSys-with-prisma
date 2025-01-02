import { NextFunction, Request, Response } from "express";
import { prisma } from "../routes";

const verifyPetshopById = async (req: Request, res: Response, next: NextFunction) => {
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
    
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving by ID petshop" });
    }
}

export default verifyPetshopById;