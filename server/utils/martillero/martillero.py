import random
import datetime
from utils.database import obtener_registros, insertar_registros

"""SECCION DE TRABAJO SOBRE EL FUNCIONAMIENTO DEL MARTILLERO"""

"""
    Esta funcion va a verificar si hay subastas activas para la fecha actual.
    1. Si hay una subasta creada para la fecha actual, solo se continua.
    2. Si no hay una subasta creada para la fecha actual, se crea una.
        2.a. hora de inicio es aleatoria
        2.b. hora de fin es aleatoria
        2.c. hora de inicio < hora de fin
"""


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
