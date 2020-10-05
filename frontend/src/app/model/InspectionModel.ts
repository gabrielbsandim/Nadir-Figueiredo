import { UsersModel } from './UsersModel';
import { MachinesModel } from './MachinesModel';
import { BugModel } from './BugModel';

export class InspectionModel {
    id: string;
    user_id: string;
    machine_id: string;
    bugs: [{
      id: string
    }];
    created_at: Date;
    statusPalconst: string;
    article: string;
    tag: string;
    palconstLength: number;
    amountSamples: number;
    amountParts: number;
}
