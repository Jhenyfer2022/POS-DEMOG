/** @odoo-module */
import { useService } from "@web/core/utils/hooks";
import { Orderline } from "@point_of_sale/app/generic_components/orderline/orderline";
import { patch } from "@web/core/utils/patch";
import { usePos } from "@point_of_sale/app/store/pos_hook";
/**
 * Enhances the Orderline component with additional functionality.
 * @extends Orderline
 */
patch(Orderline.prototype, {
    setup() {
        super.setup();
        //this._super.apply(this, arguments); // Ensure the base setup is called
        this.pos = usePos();
        this.numberBuffer = useService("number_buffer");
    },
    /**
     * Handle the clear button click event by sending Backspace key twice to the number buffer.
     * @param {Event} ev - The click event.
     */

    clearOrderline() {
        this.pos.remove_orderline(this.orderline);
        this.numberBuffer.reset(); // Optionally reset number buffer*/
    },

    /*Esto funciona
    async clear_button_fun(ev) {
        this.numberBuffer.sendKey('Backspace');
        this.numberBuffer.sendKey('Backspace');
    },*/


    decrementOrderline() {
        const currentQty = this.orderline.quantity;
        if (currentQty > 1) {
            this.orderline.set_quantity(currentQty - 1);
        } else {
            this.pos.remove_orderline(this.orderline);
        }
        this.numberBuffer.reset(); // Optionally reset number buffer
    },

    
    /*async increase_quantity(ev) {
        debugger
        
        
    },
    
    async decrease_quantity(ev) {
        debugger
        
        
    }*/
})