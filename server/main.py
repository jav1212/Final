# Imports for Flask
from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room, emit, disconnect

# Imports for utils
from utils.martillero import verificar_subastas
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


def handle_first_validate(id_cliente, id_producto, offer):
    if (verificar_oferta_valida(id_cliente, id_producto, offer)):
        actualizar_registros('PRODUCTOS p', f"precio = '{offer}'",
                             f" p.id_producto = '{id_producto}'")
        socket_io.emit('response_offer', {
                       'response': 'Done'}, room=request.sid)
        socket_io.emit('database_change')


@socket_io.on('validate_offer')
def validate_offer(data):
    id_producto = data['id_producto']
    id_cliente = data['id_cliente']
    offer = data['offer']
    handle_first_validate(id_cliente, id_producto, offer)


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
    correo = data['email']
    contraseña = data['password']
    registros = verificar_login(correo, contraseña)
    if (len(registros) > 0):
        socket_io.emit('Login response', {
            'response': 'Success',
            'message': 'Login',
            'nombre': registros[0][0],
            'apellido': registros[0][1],
            'correo': registros[0][2],
            'id_cliente': registros[0][3]
        }, room=request.sid)
        socket_io.emit('newUser', {'nombre': registros[0][1],
                                   'apellido': registros[0][2],
                                   'type': 'connected',
                                   'id': request.sid})
    else:
        socket_io.emit('Login response', {
            'response': 'Failed', 'message': 'Email or Password wrong, please try again'}, room=request.sid)


if __name__ == "__main__":
    verificar_subastas()
    socket_io.run(app, debug=True, port=4000)
