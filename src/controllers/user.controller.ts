import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
        async loginUser(req: Request, res: Response){
            const {email, password} = req.body;
            const foundUser = await new UserService().loginUser(email, password);
            res.json({id: foundUser?.id});
        }

        async signUpUser(req: Request, res: Response){
            const {email, password, name} = req.body;
            await new UserService().signUpUser(name, email, password);
            res.json('Bem criado!');
        }

        async signUpUsersInBatch(req:Request, res:Response) {
            console.log(req.file);
            await new UserService().signUpUsersInBatch(req);
            res.json('files');
        }

        async updateUserImage(req:Request, res:Response) {
            console.log(req.file);
            await new UserService().updateUserImage(req);
            res.json('files');
        }

}

export default UserController;