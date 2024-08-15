import { PosGlobalState } from 'point_of_sale.models';
import Registries from 'point_of_sale.Registries';

Registries.Component.extend(PosGlobalState, PosButtonRestrict);

const PosButtonRestrict = (PosGlobalState) => class PosButtonRestrict extends PosGlobalState{

    async _processData(loadedData){
        await super._processData(...arguments);
        this.visible_backspece_btn = loadedData['visible_backspece_btn']
    }
}
