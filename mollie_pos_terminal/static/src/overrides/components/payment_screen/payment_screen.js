/** @odoo-module */

import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { patch } from "@web/core/utils/patch";
import { onMounted } from "@odoo/owl";

patch(PaymentScreen.prototype, {
    
    setup() {
        super.setup(...arguments);
        onMounted(() => {
            const pendingPaymentLine = this.currentOrder.paymentlines.find(
                (paymentLine) =>
                    paymentLine.payment_method.use_payment_terminal === "mollie" &&
                    !paymentLine.is_done() &&
                    paymentLine.get_payment_status() !== "pending"
            );
            
            if (!pendingPaymentLine) {
                return;
            }
            /*
            pendingPaymentLine.payment_method.payment_terminal.set_most_recent_mollie_uid(
                pendingPaymentLine.mollieUID
            );
            */
        });
    },
    
    async _isOrderValid(isForceValidate) {
        console.log("valid???");
        
    },
    
    async sendMollieStatusCheck(line) {
        console.log("entre a status check");
        const payment_terminal = line.payment_method.payment_terminal;
        line.set_payment_status("waiting");
        await payment_terminal.send_mollie_status_check(
            this.currentOrder,
            line.cid
        );
        if (line.payment_status == 'waiting') {
            line.set_payment_status("waitingCard");
        }
    
    }
    
});
