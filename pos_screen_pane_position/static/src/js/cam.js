odoo.define('pos_custom.quagga_integration', function (require) {
    'use strict';

    var PosModel = require('point_of_sale.models');

    // Extiende la funcionalidad del POS
    PosModel.Order = PosModel.Order.extend({
        initialize: function (attributes) {
            this._super(attributes);
            this.initializeQuagga();
        },

        initializeQuagga: function () {
            var self = this;

            // Es recomendable usar el hook adecuado en lugar de `DOMContentLoaded`
            self.pos.ready.then(function () {
                var videoElement = document.querySelector('#cam-scaner');
                if (!videoElement) {
                    console.error('Element #cam-scaner not found in the DOM');
                    return;
                }

                // Configuración de Quagga
                Quagga.init({
                    inputStream: {
                        type: "LiveStream",
                        target: videoElement  // El elemento donde se mostrará el video
                    },
                    decoder: {
                        readers: ["code_128_reader"]  // Ajusta esto según el tipo de código
                    }
                }, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    Quagga.start();
                });

            });
        }
    });
});
