import express, { NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';



export const premissionAccess = (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        const decoded = jwt.verify(token as string, process.env.JWT_STRING as string) as JwtPayload

        if (decoded.user.id !== parseInt(req.params.id)) {
            throw new Error()
        }

    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    next();
}