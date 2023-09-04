import express, {Request, RequestHandler, Response} from 'express';
import cors from 'cors';
import userRouter from '../routes/user.router';
import morgan from 'morgan'
import logger from './logger';
import authRouter from '../routes/auth.router.';
import { validator } from '../controllers/auth.validator';

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


app.use('/users', validator);
app.use('/alunos', validator);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.get('/alunos', (req: Request,res: Response) => {
    res.json([])
})

export default app;