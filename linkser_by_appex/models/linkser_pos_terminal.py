import logging
import requests
from werkzeug import urls

from odoo import fields, models, _
from odoo.exceptions import ValidationError

_logger = logging.getLogger(__name__)


class LinkserPosTerminal(models.Model):
    _name = 'linkser.pos.terminal'
    _description = 'Terminales POS de Linkser'

    name = fields.Char()
    terminal_id = fields.Char('Terminal ID')
    ip_pos = fields.Char('Ip Terminal')
    port_pos = fields.Char('Puerto Terminal')
    
    status = fields.Selection([
    #    ('pending', 'Pending'),
        ('active', 'Active'),
        ('inactive', 'Inactive')
    ])
    #currency_id = fields.Many2one('res.currency', string='Currency')
    #company_id = fields.Many2one('res.company', required=True, default=lambda self: self.env.company)