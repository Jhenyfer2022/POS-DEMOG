odoo.define('your_module_name.NumpadModification', function (require) {
    'use strict';

    const NumpadWidget = require('point_of_sale.NumpadWidget');

    NumpadWidget.include({
        getNumpadButtons() {
            const buttons = this._super();  // Llamar a la función original para obtener todos los botones
            // Filtrar o modificar los botones que quieres ocultar
            return buttons.filter(button => {
                // Ocultar el botón de '7' por ejemplo
                if (button.label === '7') {
                    return false; // No incluir este botón
                }
                return true; // Incluir el resto
            });
        }
    });
});
