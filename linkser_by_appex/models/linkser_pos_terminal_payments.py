import logging

from odoo import fields, models, api

_logger = logging.getLogger(__name__)


class LinkserPosTerminal(models.Model):
    _name = 'linkser.pos.terminal.payments'
    _description = 'Linkser Pos Terminal'

    name = fields.Char("Transaction ID")
    linkser_uid = fields.Char("Linkser UID")
    terminal_id = fields.Many2one('linkser.pos.terminal')
    session_id = fields.Many2one('pos.session')
    linkser_latest_response = fields.Json('Response', default={})
    status = fields.Selection([
        ('open', 'Open'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('expired', 'Expired'),
        ('canceled', 'Canceled'),
        ('pending', 'Pending'),
    ], default='open')