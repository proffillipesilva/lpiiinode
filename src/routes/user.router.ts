import { Router } from "express";
import UserController from "../controllers/user.controller";
import { upload } from "../config/multer-config";


const userRouter = Router();

userRouter.post('/login', new UserController().loginUser)
userRouter.post('/sign-up', new UserController().signUpUser)
userRouter.post('/batch-sign-up', upload.single('csvFile'), new UserController().signUpUsersInBatch)
userRouter.put('/update-image/:id', upload.single('image'), new UserController().updateUserImage)

export default userRouter;