import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
        async loginUser(req: Request, res: Response){
            const {email, password} = req.body;
            try {
            const token = await new UserService().loginUser(email, password);
            res.json({token});
            } catch(err) {
                res.status(401).send("Login Failed");
            }
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