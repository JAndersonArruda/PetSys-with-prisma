import { NextFunction, Request, Response } from "express";

const requiredPetDateBody = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (!data.name || !data.type || !data.description || !data.deadline_vaccination) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    
    next();
}

export default requiredPetDateBody;