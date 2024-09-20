odoo.define('qr_pos_terminal.pos_payment_modal', function (require) {
    "use strict";

    var screens = require('point_of_sale.screens');
    var gui = require('point_of_sale.gui');
    var QWeb = require('web.QWeb');

    screens.PaymentScreenWidget.include({
        select_paymentmethod: function(payment_method) {
            this._super(payment_method);

            if (payment_method.name === "QR BY APPEX") {
                this.show_payment_modal();
            }
        },

        show_payment_modal: function() {
            var modal = $(QWeb.render('pos_payment_modal'));
            modal.find('#modal-image').attr('src', 'path/to/your/image.png'); // Cambia esto por la ruta de tu imagen

            modal.find('.close').on('click', function() {
                modal.hide();
            });

            modal.find('#button1').on('click', function() {
                // Acción para botón 1
                modal.hide();
            });

            modal.find('#button2').on('click', function() {
                // Acción para botón 2
                modal.hide();
            });

            $('body').append(modal);
            modal.show();
        }
    });
});
