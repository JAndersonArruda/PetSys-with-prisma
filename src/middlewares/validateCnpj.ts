import { NextFunction, Request, Response } from "express";

const validateCnpj = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const regexFormatCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    if (!data.cnpj) {
        res.status(400).json({ message: "Missing required field: cnpj" });
        return;
    }

    if (!regexFormatCnpj.test(data.cnpj)) {
        res.status(400).json({ error: "CNPJ must follow the format XX.XXX.XXX/XXXX-XX" });
        return;
    }

    next();
}

export default validateCnpj;