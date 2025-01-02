import { NextFunction, Request, Response } from "express";

const validateDeadline = async (req: Request, res: Response, next: NextFunction) => {
    const deadline = new Date(req.body.deadline_vaccination);

    if (isNaN(deadline.getTime())) {
        res.status(400).json({ message: "Invalid deadline_vaccination date format" });
        return;
    }

    req.deadline = deadline;
    next();
}

export default validateDeadline;