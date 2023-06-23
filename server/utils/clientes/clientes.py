import datetime
from utils.database import obtener_registros, insertar_registros


def verificar_login(correo, constraseña):
    return obtener_registros('c.nombre, c.apellido, c.correo, c.id_cliente',
                             'CLIENTES c', f" c.correo ='{correo}' AND c.contraseña = '{constraseña}'")


def verificar_producto_comprado(id_producto):
    return len(obtener_registros('o.venta, o.id_producto, id_cliente', 'OFERTAS o', f" o.id_producto = '{id_producto}' AND o.venta = 1 ")) == 0


def verificar_oferta_valida(id_cliente, id_producto, offer):
    if (verificar_producto_comprado(id_producto)):
        ofertas = obtener_registros('max(o.oferta_id), sum(o.monto), h.monto', 'OFERTAS o, HISTORICO_CARTERA h',
                                    f" o.id_cliente ='{id_cliente}' AND o.venta = 0 AND h.id_cliente ='{id_cliente}' AND h.hora_fin IS NULL ")

        if (ofertas != ((None, None, None),)):
            if (ofertas[0][1] < ofertas[0][2]):
                ultima_oferta = obtener_registros(
                    'o.monto, o.id_cliente', 'OFERTAS o', f" o.monto = (SELECT MAX(o.monto) FROM ofertas o)")
                if (ultima_oferta[0][1] != id_cliente):
                    insertar_registros(
                        'OFERTAS', f"('{ofertas[0][0] + 1}', '{datetime.datetime.now()}', '{offer}', 0, '{id_cliente}', '{id_producto}')")
                    return True

        else:
            insertar_registros(
                'OFERTAS', f"('1', '{datetime.datetime.now()}', '{offer}', 0, '{id_cliente}', '{id_producto}')")
            return True

    return False
