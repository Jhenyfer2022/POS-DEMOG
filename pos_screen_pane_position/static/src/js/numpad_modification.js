odoo.define('your_module_name.NumpadModification', function (require) {
    'use strict';

    const NumpadWidget = require('point_of_sale.NumpadWidget');

    NumpadWidget.include({
        renderElement: function () {
            this._super();
            this.$('.button-numpad[data-key="7"]').hide(); // Ocultar el botón '7'
            // Puedes agregar más botones a ocultar de la misma manera
        }
    });
});
