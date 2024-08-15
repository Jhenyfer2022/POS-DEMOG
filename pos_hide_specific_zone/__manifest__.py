{
    'name': 'ocultar botones y especificas zonas',
    'version': '17.0.1.0.0',
    'category': 'Point of Sale',
    'summary': """...""",
    'description': '....',
    'author': 'AppexBo',
    'company': 'AppexBo',
    'maintainer': 'AppexBo',
    'website': 'https://www.appexbo.com/',
    'depends': [
        'point_of_sale'
    ],
    'data': [
        'views/pos_config_views.xml', 
    ],
    'assets': {
        'point_of_sale.assets': [
            'pos_hide_specific_zone/static/src/xml/Numpad/numpad.xml',
            'pos_hide_specific_zone/static/src/js/numpad.js'
        ]
    },
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
}
