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

        //ocultar campos del payment-screen
        this.manageDivs();
    },
    
    hideChangeCustomerButton() {
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
    },


    manageDivs() {
        console.log("estoy entrando al div");
        // Crear un MutationObserver para observar cambios en el DOM
        const observer = new MutationObserver(() => {
            // Buscar el contenedor principal
            const mainContent = document.querySelector('.main-content.d-flex.overflow-auto.h-100');
    
            if (mainContent) {
                // Ocultar el div con la clase específica dentro del contenedor principal
                const divToHide = mainContent.querySelector('.right-content.w-25.bg-400');
                if (divToHide) {
                    divToHide.style.display = 'none';
                }
            }
        });
    
        // Observar cambios en el DOM dentro del contenedor principal
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});