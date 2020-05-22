import { Request } from 'express';

import { Inspection } from "../entity/Inspection";
import { BaseController } from "./BaseController";


export class InspectionController extends BaseController<Inspection> {
    constructor() {
        super(Inspection, false);
    }

    async save(request: Request) {
        const _inspection = <Inspection>request.body;

        super.isRequired(_inspection.machine, 'Informe a máquina');
        super.isRequired(_inspection.article, 'Informe o artigo');
        super.isRequired(_inspection.tag, 'Informe a etiqueta');

        super.isRequired(_inspection.palconstLength, 'Informe a quantidade de peças por palete');
        super.isTrue(isNaN(_inspection.palconstLength), 'Deve ser um número');
        super.isTrue(_inspection.palconstLength <= 0, 'Deve ser maior que 0');

        super.isRequired(_inspection.amountSamples, 'Informe a quantidade de amostras');
        super.isTrue(isNaN(_inspection.amountSamples), 'Deve ser um número');
        super.isTrue(_inspection.amountSamples <= 0, 'Deve ser maior que 0');

        super.isRequired(_inspection.statusPalconst, 'Informe se a máquina está liberada');

        super.isRequired(_inspection.amountOfParts, 'Informe a quantidade de peças com defeito');
        super.isTrue(isNaN(_inspection.amountOfParts), 'Deve ser um número');
        super.isTrue(_inspection.amountOfParts <= 0, 'Deve ser maior que 0');

        return super.save(_inspection, request);
    }

}