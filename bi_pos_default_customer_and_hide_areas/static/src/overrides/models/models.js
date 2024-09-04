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
        this.paymentScreenHideCustomerAndFacturationZone();
        this.paymentScreenHideNumpad();
        //ocultar el boton mas si esta con otro tamano de pantalla celular
        this.hidemorebuttos();

        //cambiar barra superior
        this.hide_user_and_menu();
        this.changeLogoandAddText();
        //activar camara
        this.onCamera(this.pos);
        
    },
    
    hidemorebuttos(){
        const observer = new MutationObserver(() => {
            const changeCustomerButton = document.querySelector('button.button.mobile-more-button.btn.btn-secondary.flex-fill.border-bottom');
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


    paymentScreenHideCustomerAndFacturationZone() {
        //console.log("estoy entrando al div");
        // Crear un MutationObserver para observar cambios en el DOM
        const observer = new MutationObserver(() => {
            // Buscar el contenedor principal
            const mainContent = document.querySelector('.main-content.d-flex.overflow-auto.h-100');
    
            if (mainContent) {
                // Ocultar el div con la clase específica dentro del contenedor principal
                const divToHide = mainContent.querySelector('.right-content.w-25.bg-400');
                if (divToHide) {

                    // Verificar tiene el estilo none activado
                    const have_styles = divToHide.hasAttribute('style');
                    if (!have_styles) {
                        // Llamar a la función solo si el color de fondo no era rojo
                        this.simulateButtonClickFacturaccion();
                        divToHide.style.display = 'none';
                    }
                }
            }
        });
    
        // Observar cambios en el DOM dentro del contenedor principal
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },

    simulateButtonClickFacturaccion() {
        const button = document.querySelector('.button.js_invoice.btn.btn-light.py-3.text-start.rounded-0.border-bottom');
        
        if (button) {
            //console.log('Botón fue precionado');
            button.click(); // Simula un clic en el botón
        } 
        /*else {
            console.log('Botón no encontrado');
        }*/
    },

    paymentScreenHideNumpad() {
        // Crear un MutationObserver para observar cambios en el DOM
        const observer = new MutationObserver(() => {
            // Buscar el contenedor principal
            const mainContent = document.querySelector('.main-content.d-flex.overflow-auto.h-100');
    
            if (mainContent) {
                // Buscar el contenedor secundario que contiene el div que queremos eliminar
                const centerContent = mainContent.querySelector('.center-content.d-flex.flex-column.w-50.p-1.border-start.border-end.bg-300');
                
                if (centerContent) {

                    centerContent.classList.remove('w-50'); //elimino esto en el div
                    centerContent.classList.add('w-100'); //adiciono esto en el div

                    // Buscar y eliminar el div con las clases específicas dentro de centerContent
                    const divToRemove = centerContent.querySelector('.flex-grow-1.numpad.row.row-cols-4.gx-0');
                    if (divToRemove) {
                        divToRemove.remove(); // Eliminar el div del DOM
                    }
                }
            }
        });
    
        // Observar cambios en el DOM dentro del cuerpo del documento
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },

    sendAutomaticData(){
        // cuando precione el boton pago de pago se presionara send automaticamente
        // a la maquina y esperara el pago la validacion, cuando se confirme el proceso se 
        //debe automaticamente presionara el bonton de validar
        
    },

    hide_user_and_menu(){
        // Crear un MutationObserver para observar cambios en el DOM
        const observer = new MutationObserver(() => {
            //buscar el menu superior del pos
            const mainContent = document.querySelector('.pos-topheader');
            if (mainContent) {
                //buscar el campo superior derecho menu y usuario
                const rightheader = mainContent.querySelector('.pos-rightheader');
                if(rightheader){
                    // Ocultar el campo con !important
                    rightheader.setAttribute('style', 'display: none !important;');
                }
            }
        });
    
        // Observar cambios en el DOM dentro del contenedor principal
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },

    changeLogoandAddText(){
        // Crear un MutationObserver para observar cambios en el DOM
        const observer = new MutationObserver(() => {
            //buscar el menu superior del pos
            const mainContent = document.querySelector('.pos-topheader');
            if (mainContent) {
                //buscar el campo donde esta el logo de odoo
                const pos_branding = mainContent.querySelector('.pos-branding');
                if(pos_branding){
                    // Seleccionar el elemento img
                    const logo = pos_branding.querySelector('.pos-logo');
                    // Verificar tiene el estilo none activado
                    const have_styles = logo.hasAttribute('style');
                    
                    if (!have_styles) {
                        // Ocultar la imagen antigua
                        logo.style.display = 'none';
                        
                        // Crear y agregar la nueva imagen
                        const newImage = document.createElement('img');
                        newImage.src = 'https://static.vecteezy.com/system/resources/thumbnails/036/627/416/small_2x/ai-generated-branch-with-colorful-blooming-flowers-isolated-on-transparent-background-png.png';
                        newImage.alt = 'NewLogo';

                        // Insertar la nueva imagen en el div
                        pos_branding.appendChild(newImage);

                        // Crear un nuevo elemento span con el texto
                        const asistent_texto = document.createElement('span');
                        asistent_texto.textContent = 'POR FAVOR, ESCANEE SUS PRODUCTOS';
                        asistent_texto.className = 'ms-3'; // Añadir margen para separar el texto de la imagen
                        asistent_texto.style.alignSelf = 'center'; // Alinear el texto verticalmente al centro

                        // Añadir el texto al lado de la imagen w
                        pos_branding.appendChild(asistent_texto);
                    }
                }
            }
        });
    
        // Observar cambios en el DOM dentro del contenedor principal
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },
    onCamera(pos){
        // Crear un MutationObserver para observar cambios en el DOM
        const observer = new MutationObserver(() => {
            //buscar el menu superior del pos
            const mainContent = document.querySelector('#cam-scaner');
            if (mainContent && !mainContent.querySelector('video')) {
                //console.log("iniciar camara");
                this.oncamera1(pos);
            }
        });
        // Observar cambios en el DOM dentro del contenedor principal
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });      
    },

    async oncamera1(pos){
        let lastDetectionTime = 0;
        const detectionInterval = 7000; // 7,000 milisegundos 

        const camScanner = document.querySelector("#cam-scaner");
        
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: camScanner,
                constraints: {
                    width: "80vw",
                    height: "100vw",
                    //width: width,   // Get width of the div
                    //height: height, // Get height of the div
                    facingMode: "enviroment",
                    //aspectRatio: { min: 1, max: 2 },
                },
                area: { // Para especificar un área de escaneo si es necesario
                    top: "0%",    // Área de escaneo desde el borde superior
                    right: "0%",  // Área de escaneo desde el borde derecho
                    bottom: "0%", // Área de escaneo desde el borde inferior
                    left: "0%"    // Área de escaneo desde el borde izquierdo
                }
            },
            decode:{
                //readers:["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"],
                readers:["code_128_reader"],
            }
        },function(err){
            if(err){
                console.log(err)
                return;
            }
            //console.log("QuaggJS iniciado con exito");
            Quagga.start();

            const canvas = document.querySelector("canvas");
            canvas.setAttribute('style', 'display: none !important;');

            //const video = document.querySelector("video");
            //video.setAttribute('style', 'height: 40vh !important;');
        });
        
        Quagga.onDetected(async (result) => {
            const currentTime = Date.now();
            // Verificar si ha pasado el intervalo de tiempo desde la última detección
            if (currentTime - lastDetectionTime >= detectionInterval) { //
                //obtencion de codigo de barra
                var barcode = result.codeResult.code;
                console.log("Código detectado.: ", barcode);
                // Actualizar el tiempo de la última detección
                lastDetectionTime = currentTime; //
                // Detectar el producto y introducirlo a la orden
                await this.handleDetection(barcode, pos, detectionInterval);
            }//
            // Aquí puedes colocar código adicional si es necesario después de que handleDetection termine
        });
    },

    async handleDetection(barcode, pos, detectionInterval) {
        // Busco y adiciono el producto escaneado
        var product = pos.db.get_product_by_barcode(barcode);
        var order = pos.get_order();
        if (product) {
            order.add_product(product);
            // Mostrar el div con id "cam-scaner-success-logo"
            var successDiv = document.getElementById('cam-scaner-success-logo');
            successDiv.style.display = 'block';
            // Esperar
            await new Promise(resolve => setTimeout(resolve, detectionInterval));
            // Ocultar el div nuevamente después de 5 segundos
            successDiv.style.display = 'none';
            // Aquí puedes continuar con la ejecución de otros scripts si es necesario
        }
    }
});