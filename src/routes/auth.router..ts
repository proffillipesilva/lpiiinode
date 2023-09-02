import { Router } from "express";
import UserController from "../controllers/user.controller";
import { upload } from "../config/multer-config";


const authRouter = Router();

authRouter.post('/login', new UserController().loginUser)
authRouter.post('/sign-up', new UserController().signUpUser)
authRouter.post('/batch-sign-up', upload.single('csvFile'), new UserController().signUpUsersInBatch)
export default authRouter;