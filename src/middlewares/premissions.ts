import express, { NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UsersModel } from '../models/usersModel';

const usersModel = new UsersModel;

export const accessByID = (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        const decoded = jwt.verify(token as string, process.env.JWT_STRING as string) as JwtPayload
        // console.log(decoded.user.id);
        // console.log(parseInt(req.params.id));
        if (decoded.user.id != parseInt(req.params.id)) {
            throw new Error()
        }

    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    next();
}

const jwtVerify = (req: express.Request) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.JWT_STRING as string) as JwtPayload
}

export const tokenUser = (req: express.Request) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    const decoded = jwt.verify(token as string, process.env.JWT_STRING as string) as JwtPayload
    return decoded.user.id;
}

export const accessByToken = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const usersNumber = await usersModel.fetchAllUsers();
        if (req.path == '/users') {
            if (usersNumber.length > 0) {
                jwtVerify(req);
            }
        } else {
            if (usersNumber.length > 0) {
                jwtVerify(req);
            } else {
                res.status(400)
                return res.json('Please create 1st user')
            }
        }
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    next();
}


