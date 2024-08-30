from odoo import models, fields

class PaymentProviderLinkser(models.Model):
    _inherit = 'payment.provider'

    code = fields.Selection(selection_add=[('linkser', 'Linkser')],
                            ondelete={'linkser': 'set default'},
                            string='Code',
                            help='Identifying the payment method')

    linkser_merchant = fields.Char(string='Merchant ID',
                                 help='linkser merchant id')

    linkser_secret_key = fields.Char(string='Secret Key',
                                   help='linkser secret key')

    linkser_key = fields.Char(string='Secret Key', help='linkser key')