# Common imports
import os
import threading
import time

# Imports for Flask
from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room, emit, disconnect

# Imports for utils
from utils.martillero import verificar_subastas
from utils.martillero import validar_venta
from utils.martillero import actualizar_precio
from utils.martillero import cerrar_subasta
from utils.clientes import verificar_login
from utils.clientes import verificar_oferta_valida
from utils.database import obtener_registros
from utils.database import actualizar_registros

# Flask server creation
app = Flask(__name__)
app.config['SECRET_KEY'] = "secret! "

# Socket creation
socket_io = SocketIO(app, cors_allowed_origins="*")

# Lista de usuarios conectados
users = []

# Maximo de usuarios conectados
max_users = 5


"""SERVER USE ONLY"""


@socket_io.on('getUsers')
def post_users():
    socket_io.emit('serverResponse', users, room=request.sid)


def post_new_changes(id_cliente, id_producto, monto, tipo_move):
    names = obtener_registros('c.nombre, p.nombre', 'clientes c, productos p',
                              f" c.id_cliente = '{id_cliente}' and p.id_producto = '{id_producto}'")

    socket_io.emit('new_change', {
        'nombre_cliente': names[0][0],
        'nombre_producto': names[0][1],
        'monto': monto,
        'tipo': tipo_move
    })


def handle_post_sales(sales):
    sales_list = []
    for sale in sales:
        sales_list.append({
            'monto': int(sale[0]),
            'id_producto': sale[1]
        })

    socket_io.emit('post_sales', sales_list, room=request.sid)


def handle_products(products):
    products_list = []
    for product in products:
        products_list.append({
            'nombre_producto': product[0],
            'id_producto': product[1],
        })

    socket_io.emit('products', products_list, room=request.sid)


@socket_io.on('get_report')
def post_reports():
    sales = obtener_registros('o.monto, o.id_producto',
                              'ofertas o', 'o.venta = 1')

    products = obtener_registros(
        'p.nombre, p.id_producto', 'productos p', '1=1')

    if (len(sales) > 0):
        handle_post_sales(sales)
        handle_products(products)
        socket_io.emit('post_report')


""" GENERAL USE """


def handle_connection(tipo, ip):
    global users
    if tipo == 'connect':
        if (len(users) < max_users):
            users.append(request.sid)
        else:
            socket_io.emit('Login response', {
                'response': 'Disconnected', 'message': 'You has been disconnected, to many users actives'}, room=request.sid)
    else:
        if (request.sid in users):
            users.remove(request.sid)


@socket_io.on('connect')
def connect():
    print('request has connected ', request.sid)
    handle_connection('connect', request.remote_addr)


@socket_io.on('disconnect')
def disconnect():
    print('request has disconnected ', request.sid)
    socket_io.emit('newUser', {'id': request.sid,
                               'type': 'disconnected'})
    handle_connection('disconnect', request.remote_addr)


"""CLIENT USE ONLY"""


def validar_ventas(id_cliente, id_producto, offer):
    if (validar_venta(id_cliente, id_producto, offer)):
        if (cerrar_subasta()):
            socket_io.emit('generate_report')
            socket_io.emit('auctions_are_closed')
        names = obtener_registros('c.nombre, p.nombre, h.monto', 'clientes c, productos p, historico_cartera h',
                                  f" c.id_cliente = '{id_cliente}' and p.id_producto = '{id_producto}' and h.id_cliente = '{id_cliente}'")

        socket_io.emit('sale_product', {
            'response': 'Successful',
                        'message': 'Venta exitosa',
                        'id_cliente_sale': id_cliente,
                        'id_producto': id_producto,
                        'nombre_cliente': names[0][0],
                        'nombre_producto': names[0][1]
        })

        socket_io.emit('available', 'not available')
        socket_io.emit('change_report')

        post_new_changes(id_cliente,
                         id_producto, offer, 'venta')
        socket_io.emit('new_cartera', int(names[0][2]), room=request.sid)


def temporizador(segundos, id_cliente, id_producto, offer):
    for i in range(segundos):
        time.sleep(1)

    validar_ventas(id_cliente, id_producto, offer)


def handle_first_validate(id_cliente, id_producto, offer):
    reponse_to_client = ''
    response = verificar_oferta_valida(id_cliente, id_producto, offer)
    if (response == 'Oferta realizada'):
        reponse_to_client = 'Successful'
        actualizar_precio(id_producto, offer)
        socket_io.emit('database_change')
        socket_io.emit('new_offer', {
            'newPrice': offer
        })
        post_new_changes(id_cliente, id_producto, offer, 'oferta')
        hilo = threading.Thread(target=temporizador, args=(
            4, id_cliente, id_producto, offer))
        hilo.start()
    elif (response == 'Oferta ya realizada'):
        reponse_to_client = 'Warning'
    else:
        reponse_to_client = 'Failed'

    names = obtener_registros('c.nombre, p.nombre', 'clientes c, productos p',
                              f" c.id_cliente = '{id_cliente}' and p.id_producto = '{id_producto}'")

    socket_io.emit('response_offer', {
        'response': reponse_to_client,
        'message': response,
        'newPrice': offer,
        'id_cliente_server': id_cliente,
        'id_producto': id_producto,
        'nombre_cliente': names[0][0],
        'nombre_producto': names[0][1]
    })


@socket_io.on('get_cartera')
def post_cartera(data):
    cartera = obtener_registros(
        'h.monto', 'historico_cartera h', f" h.id_cliente = '{data}'")

    socket_io.emit('new_cartera', int(cartera[0][0]), room=request.sid)


@socket_io.on('validate_offer')
def validate_offer(data):
    handle_first_validate(data['id_cliente'],
                          data['id_producto'], data['offer'])


@socket_io.on('get_available')
def post_available(data):
    available = obtener_registros(
        'o.id_producto', 'OFERTAS o', f"o.id_producto= '{data}' and o.venta = 1")
    if (len(available) > 0):
        socket_io.emit('available', 'not available')
    else:
        socket_io.emit('available', 'available')


def handle_post_images(images_list):
    images = []
    for image in images_list:
        images.append({
            'url_image': image[0],
        })

    socket_io.emit('post_images', images, room=request.sid)


@socket_io.on('get_images')
def post_images(data):
    images_list = obtener_registros(
        'url_image', 'IMAGENES i', f'i.id_producto = {data}')

    if len(images_list) > 0:
        handle_post_images(images_list)


def handle_post_products(product_list):
    products = []
    for product in product_list:
        products.append({
            'id_producto': product[0],
            'nombre': product[1],
            'descripcion': product[2],
            'precio': str(product[3]),
            'marca': product[4],
            'modelo': product[5],
            'año': product[6],
            'url_image': product[7],
        })
    socket_io.emit('post_products', products, room=request.sid)


@socket_io.on('get_products')
def post_products():
    products_list = obtener_registros('p.id_producto, p.nombre, p.descripcion, p.precio, p.marca, p.modelo, p.año, i.url_image',
                                      'PRODUCTOS p, IMAGENES i', 'i.tipo = "Primaria" AND i.id_producto = p.id_producto')

    if len(products_list) > 0:
        handle_post_products(products_list)


@socket_io.on('Login')
def login(data):
    global user_connections
    registros = verificar_login(data['email'], data['password'])
    if (len(registros) > 0):
        socket_io.emit('Login response', {
            'response': 'Success',
            'message': 'Login',
            'nombre': registros[0][0],
            'apellido': registros[0][1],
            'correo': registros[0][2],
            'id_cliente': registros[0][3]
        }, room=request.sid)
        socket_io.emit('newUser', {'nombre': registros[0][0],
                                   'apellido': registros[0][1],
                                   'type': 'connected',
                                   'id': request.sid})
    else:
        socket_io.emit('Login response', {
            'response': 'Failed',
            'message': 'Email or Password wrong, please try again'},
            room=request.sid)


if __name__ == "__main__":
    verificar_subastas()
    socket_io.run(app, debug=True, port=4000)
