from odoo import fields, models


class PosConfig(models.Model):
    """To add fields in pos config to see the visibility of the number buttons"""
    _inherit = 'pos.config'

    numeric_buttons_visible = fields.Boolean("Visible numeric buttons?")