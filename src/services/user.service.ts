import { v4 } from "uuid";
import { Request } from "express";
import csvParser from "csv-parser";
import fs from 'fs';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import Jimp from "jimp";


import { User } from "../models/user";
import userRepository from "../models/user.repository";
import logger from "../config/logger";


class UserService {

    getUserFromData(name: string, email: string, password: string) : User{
        const newUser = new User();
        newUser.id = v4();
        newUser.email = email;
        newUser.name = name;
        const hashDigest = sha256(password);
        logger.debug("HashAntes: ", hashDigest)
        const privateKey = "FIEC2023"
        const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey ))
        logger.debug("HashDepos: ",hashDigest)
        newUser.password = hmacDigest;
        return newUser;
    }

    async loginUser(email: string, password: string){
        const foundUser = await userRepository.findOneBy({ email, password});
        return foundUser;
    }

    async signUpUser(name: string, email: string, password: string){
        const newUser = this.getUserFromData(name, email, password);
        await userRepository.save(newUser);
    }

    async signUpUsersInBatch(req: Request){
        const file = req.file;
        const users : User[] = [];
        if(file != null) {
            fs.createReadStream(file.path)
                .pipe(csvParser())
                .on('data', (data) => users.push(this.getUserFromData(data.name, data.email, data.password)))
                .on('end', () => {
                    console.log(users);
                    userRepository.insert(users);
                    
            });
        }
    }

    async updateUserImage(req: Request){
        const file = req.file;
        const id = req.params.id;
        const foundUser = await userRepository.findOneBy({id});
        if(file != null && foundUser != null){
            const image = await Jimp.read(file.path);
            await image.resize(600,600);
            await image.write('uploads/' + file.originalname);
            foundUser.imageUrl = file.originalname;
            await userRepository.save(foundUser);
        }
    }
    //1b9f4cee-d5bb-4b09-851f-171595544fb6

}

export default UserService;