from odoo import api, models


class AccountPaymentMethod(models.Model):
    """" Inherits account payment method to add linkser payment method """
    _inherit = 'account.payment.method'

    @api.model
    def _get_payment_method_information(self):
        #""" Payment method for linkser """
        #res = super()._get_payment_method_information()
        #res['linkser'] = {'mode': 'multi', 'domain': [('type', '=', 'bank')]}
        #return res

        """ Integrate Linkser as a provider under the Card payment method """
        res = super()._get_payment_method_information()
        if 'card' in res:
            res['card']['domain'] = [('type', '=', 'bank')]  # o cualquier otra configuración que necesites
        return res