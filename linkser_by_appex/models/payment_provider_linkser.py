from odoo import models, fields

class PaymentProviderLinkser(models.Model):
    _inherit = 'payment.provider'

    provider = fields.Selection(selection_add=[('linkser', 'Linkser')], ondelete={'linkser': 'set default'})
    usuario = fields.Char(string='Usuario', help='El usuario para la autenticación con Linkser.')
    clave = fields.Char(string='Clave', help='La clave para la autenticación con Linkser.')
