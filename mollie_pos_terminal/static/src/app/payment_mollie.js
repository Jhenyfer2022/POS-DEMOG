/** @odoo-module */

import { _t } from "@web/core/l10n/translation";
import { PaymentInterface } from "@point_of_sale/app/payment/payment_interface";
import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";
import { uuidv4 } from "@point_of_sale/utils";
import { ConfirmPopup } from "@point_of_sale/app/utils/confirm_popup/confirm_popup";

export class PaymentMollie extends PaymentInterface {
    
    setup() {
        super.setup(...arguments);
        this.paymentLineResolvers = {};
        console.log("eeee");
    }

    send_payment_request(cid) {
        console.log("aaaaa");
        super.send_payment_request(cid);
        return this._mollie_pay(cid);
    }

    pending_mollie_line() {
        return this.pos.getPendingPaymentLine("mollie");
    }

    _mollie_pay_data() {
        var order = this.pos.get_order();
        var line = order.selected_paymentline;
        this.most_recent_mollie_uid = uuidv4();
        return {
            'mollie_uid': this.most_recent_mollie_uid,
            'description': order.name,
            'order_id': order.uid,
            'curruncy': this.pos.currency.name,
            'amount': line.amount,
            'session_id': this.pos.pos_session.id,
            'payment_method_id': this.payment_method.id
        }
    }
    get_payment_terminal_information_and_save(){
        $.ajax({
            url: '/register_linkser_payment',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "status": "success",
                "message": "Método ejecutado correctamente"
            }),
            success: function(response) {
                console.log('Solicitud exitosa:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud:', status, error);
            }
        });
    }

    async _submit_mollie_payment(data) {
        console.log(data);
        var ip = "192.168.0.21";
        var puerto = "8000";
        var monto = data.amount * 100;
        
        if(data.curruncy == "BOB"){
            var moneda = "068";
        }else if(data.curruncy == "USD"){
            var moneda = "840";
        }

        var URL_SET_SALE = "http://" + ip + ":" + puerto + "/sale?monto=";
        var montoTran = monto;
        var cod_moneda = moneda;
        var urlSale = URL_SET_SALE + montoTran + "&cod_moneda=" + cod_moneda;
    
        console.log(urlSale);
        //await this.get_payment_terminal_information_and_save();
        
        const mollie_line = this.pending_mollie_line();
        $.ajax({
            url: urlSale,
            type: "GET",
            dataType: "json",
            timeout: 60000,
            context: { mollie_line: mollie_line },
            success: function(dataresponse, statustext, response) {
                this.mollie_line.handle_payment_response(true)
                //alert("mensaje: " + dataresponse.mensaje);
                // Procesa los datos aquí, si es necesario
                //this.waitForPaymentConfirmation()
            },
            error: function(request, errorcode, errortext) {
                // Llama a tu método de manejo de errores aquí
                this._handle_odoo_connection_failure({
                    request: request,
                    errorcode: errorcode,
                    errortext: errortext
                });
            }.bind(this) // Importante: mantén el contexto de `this`
        });
        return
    }
    
    waitForPaymentConfirmation() {
        return new Promise((resolve) => {
            this.paymentLineResolvers[this.pending_mollie_line().cid] = resolve;
        });
    }

    _mollie_pay(cid) {
        var order = this.pos.get_order();

        if (order.selected_paymentline.amount < 0) {
            this._show_error(_t("Cannot process transactions with negative amount."));
            return Promise.resolve();
        }

        var data = this._mollie_pay_data();
        var line = order.paymentlines.find((paymentLine) => paymentLine.cid === cid);
        
        line.setMollieUID(this.most_recent_mollie_uid);
        
        console.log("Mollie Payment for cid: ", cid);
        
        // Aquí puedes hacer la llamada al backend usando rpc
        
        return this._submit_mollie_payment(data)
        /*.then((data) => {
            return this._mollie_handle_response(data);
        });*/
    }

    _handle_odoo_connection_failure(data = {}) {
        var line = this.pending_mollie_line();
        if (line) {
            line.set_payment_status("retry");
        }
        this._show_error(
            _t("Could not connect to the Odoo server, please check your internet connection and try again.")
        );
        return Promise.reject(data);
    }

    _mollie_handle_response(response) {
        var line = this.pending_mollie_line();
        if (response.status != 'open') {
            this._show_error(response.detail);
            line.set_payment_status('retry');
            return Promise.resolve();
        }
        if (response.id) {
            line.transaction_id = response.id;
        }
        line.set_payment_status('waitingCard');
        return this.waitForPaymentConfirmation();
    }

    _show_error(msg, title) {
        if (!title) {
            title = _t("Mollie Error");
        }
        this.env.services.popup.add(ErrorPopup, {
            title: title,
            body: msg,
        });
    }
}
