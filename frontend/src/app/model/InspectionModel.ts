import { UsersModel } from './UsersModel';
import { MachinesModel } from './MachinesModel';
import { BugModel } from './BugModel';

export class InspectionModel {
    id: string;
    user: UsersModel;
    machine: MachinesModel;
    bug: BugModel;
    createAt: Date;
    status: string;
    article: string;
    tag: string;
    palconstLength: number;
    amountSamples: number;
    amountOfParts: number;

    constructor() {
        this.user = new UsersModel();
        this.machine = new MachinesModel();
        this.bug = new BugModel();
    }
}