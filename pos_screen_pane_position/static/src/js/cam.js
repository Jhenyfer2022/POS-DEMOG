odoo.define('pos_custom.quagga_integration', function (require) {
    'use strict';

    var core = require('web.core');
    var PosModel = require('point_of_sale.models');
    var _super_order = PosModel.Order.prototype;

    // Extiende la funcionalidad del POS
    PosModel.Order = PosModel.Order.extend({
        initialize: function (attributes) {
            this._super(attributes);
            this.initializeQuagga();
        },

        initializeQuagga: function () {
            var self = this;

            document.addEventListener('DOMContentLoaded', function () {
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

                // Manejar eventos de Quagga
                /*Quagga.onDetected(function (result) {
                    console.log('Code detected:', result.codeResult.code);
                    // Aquí puedes agregar lógica para manejar el código detectado
                });*/
            });
        }
    });
});
