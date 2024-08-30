from . import models


from odoo.addons.payment import setup_provider, reset_payment_provider


def post_init_hook(env):
    """ Create `account.payment.method` records for the installed payment
    providers. """
    setup_provider(env, 'linkser')


def uninstall_hook(env):
    """ Delete `account.payment.method` records created for the installed
    payment providers. """
    reset_payment_provider(env, 'linkser')
