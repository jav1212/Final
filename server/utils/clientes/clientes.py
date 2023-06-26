import datetime
from utils.database import obtener_registros, insertar_registros


def verificar_login(correo, constraseña):
    return obtener_registros('c.nombre, c.apellido, c.correo, c.id_cliente',
                             'CLIENTES c', f" c.correo ='{correo}' AND c.contraseña = '{constraseña}'")


def verificar_producto_comprado(id_producto):
    return len(obtener_registros('o.venta, o.id_producto, o.id_cliente', 'OFERTAS o', f" o.id_producto = '{id_producto}' AND o.venta = 1 ")) == 0


def ofertas_exceden_cartera(id_cliente, offer):
    ofertas = obtener_registros('SUM(o.monto) AS suma, o.monto_historico',
                                f"(SELECT MAX(o2.monto) AS monto, h.monto AS monto_historico FROM ofertas o2 JOIN historico_cartera h ON o2.id_cliente=h.id_cliente WHERE o2.id_cliente='{id_cliente}' GROUP BY o2.id_cliente, o2.id_producto) AS o", '1=1')

    cartera = obtener_registros(
        'h.monto', 'HISTORICO_CARTERA h', f"h.id_cliente = '{id_cliente}'")

    if (ofertas[0][0] is not None):
        return ofertas[0][0] + int(offer) < cartera[0][0]
    else:
        return int(offer) < cartera[0][0]


def insertar_oferta(oferta, id_cliente, id_producto, offer):
    insertar_registros(
        'OFERTAS', f"('{oferta + 1}', '{datetime.datetime.now()}', '{offer}', 0, '{id_cliente}', '{id_producto}')")


def ultima_oferta(id_producto, id_cliente, offer):
    ultima_oferta = obtener_registros(
        'o.oferta_id, o.monto, o.id_cliente', 'OFERTAS o', f" o.monto = (SELECT MAX(o.monto) FROM ofertas o WHERE o.id_producto = '{id_producto}')")

    ultima_oferta_cliente = obtener_registros(
        'max(o.oferta_id)', ' OFERTAS o', f" o.id_producto = '{id_producto}' AND o.id_cliente = '{id_cliente}'")

    if (len(ultima_oferta) > 0):
        if (ultima_oferta[0][2] != id_cliente):
            if (ultima_oferta_cliente[0][0] is not None):
                insertar_oferta(
                    ultima_oferta_cliente[0][0], id_cliente, id_producto, offer)
                return 'Oferta realizada'
            else:
                insertar_oferta(0, id_cliente, id_producto, offer)
                return 'Oferta realizada'
        else:
            return 'Oferta ya realizada'
    else:
        insertar_oferta(0, id_cliente, id_producto, offer)
        return 'Oferta realizada'


def verificar_oferta_valida(id_cliente, id_producto, offer):
    if (not verificar_producto_comprado(id_producto)):
        return 'Producto comprado'

    if (not ofertas_exceden_cartera(id_cliente, offer)):
        return 'Oferta excede el monto de su cartera'

    return ultima_oferta(id_producto, id_cliente, offer)
