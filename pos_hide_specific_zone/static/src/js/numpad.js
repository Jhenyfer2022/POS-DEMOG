import { PosGlobalState } from 'point_of_sale.models';
import Registries from 'point_of_sale.Registries';

const PosButtonRestrict = (PosGlobalState) => class PosButtonRestrict extends PosGlobalState{

    async _processData(loadedData){
        await super()._processData(...arguments);
        this.numeric_buttons_visible = loadedData['numeric_buttons_visible']
    }
}
