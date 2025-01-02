import 'express';

declare global {
    namespace Express {
        interface Request {
            account?: string;
            deadline?: Date;
        }
    }
}   