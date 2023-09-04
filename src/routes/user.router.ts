import { Router } from "express";
import UserController from "../controllers/user.controller";
import { upload } from "../config/multer-config";


const userRouter = Router();

userRouter.put('/update-image', upload.single('image'), new UserController().updateUserImage)

export default userRouter;