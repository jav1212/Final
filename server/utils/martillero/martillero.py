from threading import Lock
import os
import threading
import random
import datetime
import time
from utils.database import obtener_registros, insertar_registros, actualizar_registros

"""SECCION DE TRABAJO SOBRE EL FUNCIONAMIENTO DEL MARTILLERO"""

"""
    Esta funcion va a verificar si hay subastas activas para la fecha actual.
    1. Si hay una subasta creada para la fecha actual, solo se continua.
    2. Si no hay una subasta creada para la fecha actual, se crea una.
        2.a. hora de inicio es aleatoria
        2.b. hora de fin es aleatoria
        2.c. hora de inicio < hora de fin
"""


def todos_productos_vendidos():
    productos_vendidos = obtener_registros(
        'o.id_producto', 'ofertas o', 'o.venta = 1')

    return len(productos_vendidos) == 14


def sin_disponibilidad_de_compra():
    carteras = obtener_registros('h.monto', 'historico_cartera h', '1=1')
    productos = obtener_registros(
        'p.precio, p.id_producto', 'productos p', '1=1')
    productos_vendidos = obtener_registros(
        'o.id_producto', 'ofertas o', 'o.venta = 1')

    resultado = [elem for elem in obtener_registros(
        'p.precio, p.id_producto', 'productos p', '1=1') if elem[1] not in [t[0] for t in obtener_registros('o.id_producto', 'ofertas o', '1=1')]]

    for producto in resultado:
        for cartera in carteras:
            if (int(cartera[0]) > int(producto[0])):
                return False

    return True


def cerrar_subasta():
    if (todos_productos_vendidos() or sin_disponibilidad_de_compra()):
        return True
    return False


def actualizar_cartera(id_cliente, offer):
    actualizar_registros(
        'HISTORICO_CARTERA h', f" h.monto=h.monto - '{int(offer)}'", f" h.id_cliente ='{id_cliente}'")


def actualizar_precio(id_producto, offer):
    actualizar_registros('PRODUCTOS p', f"precio = '{offer}'",
                         f" p.id_producto = '{id_producto}'")


def concretar_venta(id_producto, id_cliente, id_oferta):
    actualizar_registros(
        'OFERTAS o', f" o.venta = '1'", f" o.id_producto ='{id_producto}' AND o.id_cliente = '{id_cliente}' AND o.oferta_id = '{id_oferta}'")


def validar_venta(id_cliente, id_producto, offer):

    producto_vendido = obtener_registros(
        'o.id_producto', 'ofertas o', f"o.id_producto = '{id_producto}' and o.venta = 1")

    if (len(producto_vendido) == 0):
        ultima_oferta = obtener_registros(
            'max(o.monto), o.id_cliente, max(o.oferta_id)', 'OFERTAS o', f"o.id_producto = '{id_producto}' AND o.venta = 0")

        if (ultima_oferta[0][0] == int(offer)):
            concretar_venta(id_producto, id_cliente, ultima_oferta[0][2])
            actualizar_cartera(id_cliente, offer)

        return ultima_oferta[0][0] == int(offer)
    return False


def verificar_subastas():
    fecha_actual = datetime.date.today().strftime('%Y-%m-%d')
    tabla_subastas = obtener_registros('s.fecha_inicio',
                                       'SUBASTAS s', f" s.fecha_inicio = '{fecha_actual}'")

    if len(tabla_subastas) == 0:
        hora_inicio = datetime.datetime.now()
        minutos = random.randint(0, 59)
        segundos = random.randint(0, 59)
        duracion = datetime.timedelta(minutes=minutos, seconds=segundos)
        hora_fin = hora_inicio + duracion

        insertar_registros(
            'SUBASTAS', f"('{fecha_actual}', '{hora_inicio}', '{hora_fin}')")

        generar_carteras(fecha_actual)


def generar_carteras(fecha_actual):
    tabla_clientes = obtener_registros('id_cliente', 'CLIENTES', '1=1')
    hora_inicio = datetime.datetime.now()

    for clientes in tabla_clientes:
        monto = random.randint(500, 1500)

        insertar_registros(
            'HISTORICO_CARTERA', f"('{hora_inicio}', '{monto}', '{clientes[0]}', '{fecha_actual}', NULL)")


def obtener_ganancia():
    pass


"""SECCION DE TRABAJO SOBRE LA BASE DE DATOS"""
