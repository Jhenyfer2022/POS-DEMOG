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

    /*
    async increase_quantity(ev) {
        const order_selected = this.pos.get_order().get_selected_orderline()
        const cantidad = this.pos.get_order().get_selected_orderline().get_quantity();

        
        this.pos.get_order().get_selected_orderline().set_quantity(cantidad+1);
    },
    */
    
    async decrease_quantity(ev) {
        // Paso 1: Quitar la clase 'selected' de los elementos dentro del contenedor
        const orderContainer = document.querySelector('.order-container');
        const selectedItems = orderContainer.querySelectorAll('.selected');
        selectedItems.forEach(item => item.classList.remove('selected'));
        // Paso 2: Actualizar el dato seleccionado por el cual precione el boton
        const targetElement = ev.currentTarget.parentNode.parentNode;
        targetElement.classList.add('selected');
        // Paso 3: Actualizar su cantidad
        const order_selected = this.pos.get_order().get_selected_orderline();
        const cantidad = this.pos.get_order().get_selected_orderline().get_quantity();

        if(cantidad>0){
            this.pos.get_order().get_selected_orderline().set_quantity(cantidad-1);
        }
    }
})