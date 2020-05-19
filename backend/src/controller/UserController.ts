import { Request } from 'express';
import * as md5 from 'md5';
import { sign } from 'jsonwebtoken';

import { User } from "../entity/User";
import { BaseController } from "./BaseController";
import config from '../configuration/config';


export class UserController extends BaseController<User> {
    constructor() {
        super(User, true);
    }

    async auth(request: Request) {
        const { identity, password } = request.body;
        if (!identity || !password) {
            return { status: 400, message: 'Informe o usuário e a senha' }
        }
        
        const user = await this.repository.findOne({ identity: identity, password: md5(password) });
        if (user) {
            const _payload = {
                uid: user.uid,
                name: user.name,
                identity: user.identity,
                role: user.role
            }
            return { status: 200, message: {
                user: _payload,
                token: sign({
                    ..._payload,
                    tm: new Date().getTime()
                }, config.secretyKey)
            }}
        } else {
            return { status: 404, message: 'Usuário ou senha inválidos'}
        }
    }

    async createUser(request: Request) {
        const { name, identity, role, isRoot, password, confirmPassword } = request.body;
        super.isRequired(name, 'Informe o nome');
        super.isRequired(identity, 'Informe o usuário');
        super.isRequired(role, 'Informe o cargo');
        super.isRequired(password, 'Informe a senha');
        super.isRequired(confirmPassword, 'Confirme a senha');

        const _user = new User();
        _user.name = name;
        _user.identity = identity;
        _user.role = role;
        _user.isRoot = isRoot;

        if (password != confirmPassword) {
            return { status: 400, errors: ['A senha e a confirmação de senha são diferentes'] };
        }
        
        if (password) {
            _user.password = md5(password);
        }


        return super.save(_user, request);
    }

    async save(request: Request) {
        const _user = <User>request.body;

        super.isRequired(_user.name, 'Informe o nome');
        super.isRequired(_user.role, 'Informe o cargo');

        return super.save(_user, request);
    }
}