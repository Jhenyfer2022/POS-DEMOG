{
    'name': 'Linkser by appex',
    'version': '17.0.1.0.0',
    'category': 'Point of Sale',
    'summary': """Adicionar un metodo de pago y proveedor de pago""",
    'description': 'Permite crear una coneccion de pago con Punto de venta con la maquina de linkser',
    'author': 'Erick Denis Mercado Oudalova',
    'company': 'AppexBo',
    'maintainer': 'AppexBo',
    'website': 'https://www.appexbo.com/',
    'depends': [
        'payment'
    ],
    'data': [
        'views/payment_provider_linkser_views.xml',
    ],
    #'assets': {
    #    'point_of_sale._assets_pos': [
    #        'pos_screen_pane_position/static/src/xml/Screens/ProductScreen/ProductScreen.xml',
    #    ]
    #},
    
    #'images': [
    #    'static/description/banner.jpg'
    #],
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
}
