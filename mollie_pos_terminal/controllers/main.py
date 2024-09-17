# coding: utf-8
import logging
from odoo import http
from odoo.http import request

_logger = logging.getLogger(__name__)


class PosMollieController(http.Controller):

    # TODO: '/pos_mollie/webhook' is for backwards compatibility
    # Remove it in v18
    #@http.route([
    #    '/pos_mollie/webhook',
    #    '/pos_mollie/webhook/<string:order_type>',
    #], type='http', methods=['POST'], auth='public', csrf=False)
    #def webhook(self, order_type='pos', **post):
    #    if not post.get('id'):
    #        return
    #    request.env['mollie.pos.terminal.payments']._mollie_process_webhook(post, order_type)
    #    return ""

    @http.route('/register_linkser_payment', type='json', auth='public', methods=['POST'])
    def register_linkser_payment(self, **kwargs):
        # Obtén los datos del request
        data = kwargs.get('data', [])
        # Llama al método custom_method del modelo pos.payment.method
        pos_payment_method_model = request.env['pos.payment.method']
        result = pos_payment_method_model.custom_method(data)
        return result

    @http.route('/aaaaaaaaaaaaaaaaaaaaaaaaaaaaa', type='json', auth='user', methods=['POST'])
    def update_payment_line(self, line_id, status):
        # Obtén la línea de pago correspondiente
        payment_line = request.env['payment.line'].browse(line_id)
        
        if not payment_line:
            return {'success': False, 'message': 'Línea de pago no encontrada'}

        # Actualiza el estado de la línea de pago
        try:
            payment_line.write({'state': status})
            return {'success': True}
        except Exception as e:
            return {'success': False, 'message': str(e)}