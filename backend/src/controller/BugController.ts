import { Request } from 'express';

import { Bug } from "../entity/Bug";
import { BaseController } from "./BaseController";


export class BugController extends BaseController<Bug> {
    constructor() {
        super(Bug, true);
    }

    async save(request: Request) {
        const _bug = <Bug>request.body;

        super.isRequired(_bug.description, 'Informe o defeito');

        return super.save(_bug, request);
    }

}