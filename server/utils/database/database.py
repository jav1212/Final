import pymysql


def crear_conexion():
    conexion = pymysql.connect(
        host='localhost',
        user='root',
        password='29577769',
        db='finalredes'
    )
    return conexion


def obtener_registros(valores, tabla, condicion):
    conexion = crear_conexion()
    cursor = conexion.cursor()
    query = f"SELECT {valores} FROM {tabla} WHERE {condicion}"
    cursor.execute(query)
    registros = cursor.fetchall()
    cursor.close()
    conexion.close()
    return registros


def insertar_registros(tabla, valores):
    conexion = crear_conexion()
    cursor = conexion.cursor()
    query = f"INSERT INTO {tabla} VALUES {valores}"
    cursor.execute(query)
    conexion.commit()
    cursor.close()
    conexion.close()


def actualizar_registros(tabla, valores, condicion):
    conexion = crear_conexion()
    cursor = conexion.cursor()
    query = f"UPDATE {tabla} SET {valores} WHERE {condicion}"
    cursor.execute(query)
    conexion.commit()
    cursor.close()
    conexion.close()
