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
        this.pos = usePos();
        this.numberBuffer = useService("number_buffer");
    },
    /**
     * Handle the clear button click event by sending Backspace key twice to the number buffer.
     * @param {Event} ev - The click event.
     */
    async clear_button_fun(ev) {
        this.numberBuffer.sendKey('Backspace');
        this.numberBuffer.sendKey('Backspace');
    },
    



    /**
     * Handle the increase quantity button click event.
     * @param {Event} ev - The click event.
     */
    async increase_quantity(ev) {
        this.update_quantity(1);
    },

    /**
     * Handle the decrease quantity button click event.
     * @param {Event} ev - The click event.
     */
    async decrease_quantity(ev) {
        this.update_quantity(-1);
    },

    /**
     * Update the quantity of the orderline.
     * @param {number} amount - The amount to increase or decrease.
     */
    update_quantity(amount) {
        // Get the current quantity
        let current_quantity = this.get_quantity();

        // Calculate new quantity
        let new_quantity = Math.max(current_quantity + amount, 0); // Ensure quantity does not go below zero

        // Set the new quantity
        this.set_quantity(new_quantity);
    }
})
