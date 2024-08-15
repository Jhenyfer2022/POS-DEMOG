from odoo import fields, models


class PosConfig(models.Model):
    """To add fields in pos config to see the visibility of the number buttons"""
    _inherit = 'pos.config'

    numeric_buttons_visible = fields.Boolean("Visible numeric buttons?")

class PosSession(models.Model):
    _inherit = "pos.session"

    def _pos_data_process(self, loaded_data):
        super()._pos_data_process(loaded_data)
        loaded_data['visible_backspace_btn'] = self.config_id.visible_backspace_btn
