odoo.define('your_module_name.NumpadModification', ['require', 'point_of_sale.NumpadWidget'], function (require) {
    'use strict';

    const NumpadWidget = require('point_of_sale.NumpadWidget');

    NumpadWidget.include({
        renderElement: function () {
            this._super.apply(this, arguments);
            this.$('.button-numpad[data-key="7"]').hide(); // Ocultar el botón '7'
            // Puedes agregar más botones a ocultar de la misma manera
        }
    });
});
