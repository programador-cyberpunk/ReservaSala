import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

//resolvendo o request pra guardar o id e role do usuario
    export interface AuthRequest extends Request{
        user?: {id:string, role: string};
    }

export function authMiddleWare(req: AuthRequest, res: Response, next: NextFunction){
    const token = req.headers.authorization?.split(' ')[1];
        if(!token) res.status(401).json({ error: 'Token nao foi encontrado'});
            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
                    id: str: req.user = decoded;
                    next();
                } catch{
                    res.status(401).json({error: 'Token inválido'});
                }
            }
        
        
}

//agoravem a autorização middleware
export function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction){
     if(req.user?.role !=='ADMIN'){
        return res.satus(403).json({error: 'Acesso negado, vc não e um administrador...'});
     }
     next();
}