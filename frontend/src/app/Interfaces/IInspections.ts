export interface IInspections {
    id: string;
    user_id: string;
    machine_id: string;
    bugs: [{
      id: string
    }];
    created_at: Date;
    statusPalconst: string;
    identity: string;
}
