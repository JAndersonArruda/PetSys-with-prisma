import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
// import routes from './routes/index.ts';

dotenv.config();

const myPort = process.env.PORTSERVER;
const server = express();
server.use(express.json());

server.use('/', (req: Request, res: Response) => {
    console.log(`API is running on port ${myPort}`);
    res.status(200).json({ message: "web server is running" });
});

server.listen(myPort, () => {
    console.log(`Server is running at http://localhost:${myPort}`);
});