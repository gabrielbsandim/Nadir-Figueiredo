import { Request } from 'express';

import { Machine } from "../entity/Machine";
import { BaseController } from "./BaseController";


export class MachineController extends BaseController<Machine> {
    constructor() {
        super(Machine, true);
    }

    async save(request: Request) {
        const _Machine = <Machine>request.body;

        super.isRequired(_Machine.nameMachine, 'Informe o código da máquina');
        super.isRequired(_Machine.machineVelocity, 'Informe a velocidade da máquina');


        return super.save(_Machine, request);
    }

}