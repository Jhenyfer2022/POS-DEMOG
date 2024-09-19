import logging

from odoo import fields, models, api

_logger = logging.getLogger(__name__)


class MolliePosTerminal(models.Model):
    _name = 'mollie.pos.terminal.payments'
    _description = 'Mollie Pos Terminal'

    name = fields.Char("Transaction ID")
    mollie_uid = fields.Char("Mollie UID")
    terminal_id = fields.Many2one('mollie.pos.terminal')
    session_id = fields.Many2one('pos.session')
    mollie_latest_response = fields.Json('Response', default={})
    status = fields.Selection([
        ('paid', 'Paid'),
    ], default='paid')

    def _create_mollie_payment_request(self, id_terminal, data, pos_session):
        self.create({
            'name': response.get('id'),  # Valor por defecto en lugar de response.get('id')
            'mollie_uid': data.get('mollie_uid'),  # Valor por defecto en lugar de data.get('mollie_uid')
            'terminal_id': id_terminal,  # Valor fijo para 'terminal_id'
            'session_id': pos_session,  # Valor por defecto en lugar de data.get('session_id')
            'mollie_latest_response': data,  # Valor por defecto en lugar de response
            'status': 'paid'  # Valor fijo para 'status'
        })
        result = {'status': 'success', 'message': "llegue"}
        return result
        #self.create({
        #    'name': response.get('id'),
        #    'mollie_uid': data.get('mollie_uid'),
        #    'terminal_id': data.get('terminal_id'),
        #    'session_id': data.get('session_id'),
        #    'mollie_latest_response': response,
        #    'status': response.get('status')
        #})
        

    #@api.model
    def get_mollie_payment_status(self, transaction_id=None, mollie_uid=None):
        domain = []
        if transaction_id:
            domain.append(('name', '=', transaction_id))
        elif mollie_uid:
            domain.append(('mollie_uid', '=', mollie_uid))
        else:
            return {}
        mollie_payment = self.search(domain, limit=1)
        if mollie_payment:
            return mollie_payment.mollie_latest_response
        return {}

    #@api.model
    #def mollie_cancel_payment_request(self, transaction_id=None, mollie_uid=None):
    #    domain = []
    #    if transaction_id:
    #        domain.append(('name', '=', transaction_id))
    #    elif mollie_uid:
    #        domain.append(('mollie_uid', '=', mollie_uid))
    #    else:
    #        return {}
    #    mollie_payment = self.search(domain, limit=1)
    #    if mollie_payment and mollie_payment.status == 'open':
    #        return mollie_payment.terminal_id._api_cancel_mollie_payment(mollie_payment.name)
    #    return {}

    #def _mollie_process_webhook(self, webhook_data, order_type='pos'):
    #    mollie_payment = self.sudo().search([('name', '=', webhook_data.get('id'))], limit=1)
    #    if mollie_payment:
    #        payment_status = mollie_payment.terminal_id._api_get_mollie_payment_status(webhook_data.get('id'))
    #        if payment_status and payment_status.get('status'):
    #            mollie_payment.write({
    #                'mollie_latest_response': payment_status,
    #                'status': payment_status.get('status')
    #            })
    #            self.env["bus.bus"].sudo()._sendone(mollie_payment.session_id._get_bus_channel_name(), "MOLLIE_TERMINAL_RESPONSE", mollie_payment.session_id.config_id.id)
