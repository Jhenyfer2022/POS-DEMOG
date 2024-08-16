/** @odoo-module */

import { Order, Orderline, Payment } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";

patch(Order.prototype, {

    setup() {
        super.setup(...arguments);
        var default_customer = this.pos.config.res_partner_id;
        var default_customer_by_id = this.pos.db.get_partner_by_id(default_customer[0]);
        
        if(default_customer_by_id){
            this.set_partner(default_customer_by_id);
        } else{
            this.set_partner(null);
        }
        // Ocultar el botón para cambiar el cliente
        this.hideChangeCustomerButton();
        //redimencionar el boton de pago
        this.resizePayButton();
    },
    
    hideChangeCustomerButton() {
        /*const observer = new MutationObserver(() => {
            const changeCustomerButton = document.querySelector('button.button.set-partner');
            if (changeCustomerButton) {
                console.log("hide");
                changeCustomerButton.style.display = 'none';
                observer.disconnect();  // Dejar de observar una vez que el botón haya sido encontrado y ocultado
            }
        });

        // Comenzar a observar el DOM
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });*/

        const observer = new MutationObserver(() => {
            const changeCustomerButton = document.querySelector('button.button.set-partner');
            if (changeCustomerButton) {
                changeCustomerButton.style.display = 'none';
            }
        });

        // Observar cambios en el DOM, especialmente el área del POS donde se renderiza el botón
        observer.observe(document.querySelector('.pos'), {
            childList: true,
            subtree: true
        });
    },

    resizePayButton() {
        /*const resizeButton = new MutationObserver(() => {
            const payButton = document.querySelector('button.pay-order-button');
            if (payButton) {
                console.log("Resizing pay button");
                payButton.style.height = "20%"; // Cambia este valor según lo necesites
                resizeButton.disconnect();  // Dejar de observar una vez que el botón haya sido modificado
            }
        });
        
        // Comenzar a observar el DOM
        resizeButton.observe(document.body, {
            childList: true,
            subtree: true
        });
        */
        const button_pay = new MutationObserver(() => {
            const payButton = document.querySelector('button.pay-order-button');
            if (payButton) {
                payButton.style.width = "100%";
                payButton.style.height = "100%";
            }
        });

        // Observar cambios en el DOM, especialmente el área del POS donde se renderiza el botón
        button_pay.observe(document.querySelector('.pos'), {
            childList: true,
            subtree: true
        });

        this.removeMw50Class();
    },

    removeMw50Class() {
        const observer = new MutationObserver(() => {
            // Selecciona el div con todas las clases especificadas
            const actionpadDiv = document.querySelector('div.actionpad.d-flex.flex-column.flex-grow-1.mw-50.p-0.border-end');
            if (actionpadDiv) {
                actionpadDiv.classList.remove('mw-50');
            }
        });

        // Observar cambios en el DOM
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
});