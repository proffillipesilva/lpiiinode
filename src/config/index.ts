import express, {Request, Response} from 'express';
import cors from 'cors';
import userRouter from '../routes/user.router';
import morgan from 'morgan'
import logger from './logger';

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("combined"));

app.get('/name', (req: Request, res: Response) => {
    logger.info("Testando request name")
    res.json('DWEB III');
})

app.get('/dados-fake', (req: Request, res: Response) => {
    setTimeout(() => res.json([3,6,5,3,2,7,5]), 5000);
})


app.use('/users', userRouter);

export default app;