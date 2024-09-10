{
    'name': 'Linkser by AppexBolivia',
    'version': '17.0.1.0.0',
    'description': 'Registra y habilita el uso de las terminales POS de linkser',
    'summary': 'POS LINKSER de pdv',
    'author': 'Erick Denis Mercado Oudalova',
    'maintainer': 'AppexBo',
    'company': 'AppexBo',
    'website': 'https://www.appexbo.com/',
    
    'license': 'AGPL-3',
    
    'category': 'Point of Sale',
    'depends': [
        'point_of_sale',
    ],
    'data': [
        'security/ir.model.access.csv',
        
        'views/linkser_pos_terminal_views.xml',
        'views/linkser_pos_terminal_payments_views.xml',
        'views/res_config_settings_views.xml',
    ],
    #'assets': {
    #    'point_of_sale._assets_pos': [
    #        'pos_screen_pane_position/static/src/xml/Screens/ProductScreen/ProductScreen.xml',
    #    ]
    #},
    'post_init_hook': 'post_init_hook',
    'uninstall_hook': 'uninstall_hook',
    #'images': [
    #    'static/description/banner.jpg'
    #],
    'installable': True,
    'auto_install': False,
    'application': False,
}
