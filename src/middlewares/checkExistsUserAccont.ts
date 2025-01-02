import { NextFunction, Request, Response } from "express";
import { prisma } from "../routes";

const checkExistsUserAccount = async (req: Request, res: Response, next: NextFunction) => {
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
    
        req.account = cnpj;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving user account" });
    }
}

export default checkExistsUserAccount;