import { Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository, Repository } from 'typeorm';

import config from '../configuration/config';
import { User } from '../entity/User';


export default async (req: Request, res: Response, next: Function) => {
    const token = req.body.token || req.query.token || req.headers['x-token-access'];
    const publicRoutes = <Array<String>>config.publicRoutes;
    let isPublicRoute: boolean = false;
    const _userRepository: Repository<User> = getRepository(User);

    publicRoutes.forEach(url => {
        const isPublic = req.url.includes(url);
        if (isPublic) {
            isPublicRoute = true;
        }
    });

    if (isPublicRoute) {
        next();
    } else {
        if (token) {
            try {
                const _userAuth = verify(token, config.secretyKey);
                req.userAuth = _userAuth;
                
                const _userDB = await _userRepository.findOne({
                    where: {
                        uid: _userAuth.uid
                    }
                });
                req.isRoot = _userDB.isRoot;
                
                next();
            } catch (error) {
                res.status(401).send({ message: 'Token inválido' });
            }
        } else {
            res.status(401).send({ message: 'Para acessar esse recurso, você precisa estar autenticado' });
            return;
        }
    }
}