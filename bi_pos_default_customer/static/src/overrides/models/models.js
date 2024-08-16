/** @odoo-module */

import { Order, Orderline, Payment } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";

patch(Order.prototype, {

    setup() {
        super.setup(...arguments);
        var default_customer = this.pos.config.res_partner_id;
        var default_customer_by_id = this.pos.db.get_partner_by_id(default_customer[0]);
        console.log("setCustomer");
        if(default_customer_by_id){
            this.set_partner(default_customer_by_id);
        } else{
            this.set_partner(null);
        }
        // Ocultar el botón para cambiar el cliente
        this.hideChangeCustomerButton();
    },
    
    hideChangeCustomerButton() {
        console.log("hide");
        const changeCustomerButton = document.querySelector('button.button.set-partner');
        if (changeCustomerButton) {
            changeCustomerButton.style.display = 'none';
        }
    },
});