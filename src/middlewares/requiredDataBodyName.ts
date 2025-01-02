import { NextFunction, Request, Response } from "express";

const requiredDataBodyName =  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    if (!data.name) {
        res.status(400).json({ message: "Missing required field: name" });
        return;
    }

    next();
}

export default requiredDataBodyName;