# -*- coding: utf-8 -*-
{
    'name': 'Linkser by appex Test',
    'version': '17.0.1.0.0',
    'category': 'Sales/Point of Sale',
    'summary': 'Integrate your POS with a Seerbit payment terminal',
    "author": "Seerbit",
    "website": "https://github.com/seerbit/seerbit-odoo",
    'data': [
        'data/account_journal.xml',
        'data/pos.payment.method.csv',
        'views/res_config_settings_views.xml',
        'views/pos_payment_method_views.xml',
        ''
    ],
    'depends': ['point_of_sale'],
    'installable': True,
    #'assets': {
    #    'point_of_sale.assets': [
    #        'pos_seerbit/static/src/**/*',
    #    ],
    #},
    'assets': {
        'point_of_sale._assets_pos': [
            'pos_seerbit/static/src/xml/PaymentScreenPaymentLines.xml',
        ],
    },
    #'assets': {
    #    'point_of_sale.assets': [
            #'pos_seerbit/static/src/js/models.js',
            #'pos_seerbit/static/src/js/payment_seerbit.js',
            #'pos_seerbit/static/src/js/PaymentScreen.js',

            #'pos_seerbit/static/src/scss/pos.scss',

    #        'pos_seerbit/static/src/xml/PaymentScreenPaymentLines.xml',
    #    ],
    #},

    'license': 'OPL-1',
    'images': ['static/description/seerbit.gif']
}
