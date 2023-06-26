truncate table CLIENTES;
truncate table PRODUCTOS; 
truncate table IMAGENES;
truncate table SUBASTAS;
truncate table OFERTAS;
truncate table HISTORICO_CARTERA;

CREATE TABLE CLIENTES (
    id_cliente INT(2) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    contraseña VARCHAR(50) NOT NULL
);

CREATE TABLE PRODUCTOS (
    id_producto INT(2) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    año INT(4) NOT NULL
);

CREATE TABLE IMAGENES (
    id_imagen INT(2) NOT NULL,
    url_image VARCHAR(1500) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    id_producto INT(2) NOT NULL,
    CONSTRAINT pk_imagenes PRIMARY KEY (id_producto, id_imagen)
);

CREATE TABLE SUBASTAS (
    fecha_inicio DATE PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);

CREATE TABLE OFERTAS (
    oferta_id INTEGER(3),
    hora DATETIME NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    venta INTEGER(1) NOT NULL,
    id_cliente INTEGER(2) NOT NULL,
    id_producto INTEGER(3) NOT NULL,
    CONSTRAINT pk_oferta PRIMARY KEY (id_cliente, oferta_id, id_producto)
);

CREATE TABLE HISTORICO_CARTERA (
    hora_inicio TIME NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    id_cliente INTEGER(2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    hora_fin DATETIME,
    CONSTRAINT pk_historico_cartera PRIMARY KEY (id_cliente, hora_inicio, fecha_inicio)
);

INSERT INTO CLIENTES (id_cliente, nombre, apellido, correo, contraseña)
VALUES (1,'Cristiano', 'Ronaldo', 'cr7@gmail.com', 'cr7'),
       (2,'Stephen', 'Curry', 'chef30@gmail.com', 'chef30'),
       (3,'Sergio', 'Peréz', 'checo@gmail.com', 'checo'),
       (4,'Shoei', 'Ohtani', 'mvp@gmail.com', 'mvp'),
       (5,'Nikola', 'Jókic', 'joker@gmail.com', 'joker'),
       (6,'Francis', 'Bompart', 'frans@gmail.com', 'zurda'),
       (7,'José', 'Peréz', 'eltigre@gmail.com', 'labestia');

INSERT INTO PRODUCTOS (id_producto, nombre, descripcion, precio, marca, modelo, año) 
VALUES ('1', 'Altavoz inteligente Amazon Echo Dot', 'Un altavoz inteligente con Alexa integrado, sonido mejorado, diseño compacto y soporte para múltiples servicios de música en streaming', 49.99,  'Amazon', 'Echo Dot (4ta generación)', 2020),
	   ('2', 'Reloj inteligente Apple Watch Series 7', 'Un reloj inteligente con pantalla siempre encendida, detección de caídas, seguimiento de actividad física, electrocardiograma y conectividad celular', 399.00, 'Apple', 'Watch Series 7', 2022),
       ('3', 'Tableta Apple iPad Pro', 'Una tableta con pantalla Liquid Retina XDR de 12.9\", procesador M1, almacenamiento SSD de 1TB, cámara trasera de 12MP y soporte para Apple Pencil y Magic Keyboard', 1399.00, 'Apple', 'iPad Pro', 2021),
       ('4', 'Auriculares inalámbricos Bose QuietComfort Earbuds', 'Auriculares inalámbricos con cancelación de ruido activa, batería de hasta 6 horas de duración, resistencia al sudor y al agua, y soporte para asistentes de voz', 279.95, 'Bose', 'QuietComfort Earbuds', 2020),
       ('5', 'Cámara Canon EOS R6', 'Una cámara sin espejo de fotograma completo con sensor CMOS de 20.1 megapíxeles, procesador de imagen DIGIC X, grabación de video 4K, estabilización de imagen en el cuerpo y conectividad Wi-Fi y Bluetooth', 2499.00, 'Canon', 'EOS R6', 2020),
       ('6', 'Cafetera De Longhi ESAM3300 Magnifica', 'Una cafetera automática con molinillo de café integrado, sistema de espuma de leche, panel de control digital y capacidad para preparar dos tazas al mismo tiempo', 799.00, 'De Longhi', 'ESAM3300 Magnifica', 2019),
       ('7', 'Laptop HP Spectre x360', 'Una laptop convertible con pantalla táctil de 13.3\", procesador Intel Core i7, 16GB de RAM, almacenamiento SSD de 512GB, y sistema operativo Windows 10', 1599.99, 'HP', 'Spectre x360', 2022),
       ('8', 'Teclado mecánico HyperX Alloy Origins', 'Un teclado mecánico con interruptores HyperX Red, retroiluminación RGB, personalización avanzada de macros y perfil de almacenamiento en la nube', 109.99, 'HyperX', 'Alloy Origins', 2021),
	   ('9', 'Aspiradora robot iRobot Roomba i7+', 'Una aspiradora robot con sistema de limpieza en tres fases, navegación inteligente, soporte para Alexa y Google Assistant, y base de carga con vaciado automático del depósito', 799.00, 'iRobot', 'Roomba i7+', 2020),
       ('10', 'Televisor LG OLED CX', 'Un televisor 4K con pantalla OLED de 55\", procesador α9 Gen 3, HDR, Dolby Vision, sonido Dolby Atmos y sistema operativo webOS 5.0', 1799.99, 'LG', 'OLED55CXPUA', 2021),
       ('11', 'Mochila Samsonite Tectonic 2', 'Una mochila para portátil con capacidad para laptops de hasta 17\", múltiples bolsillos organizadores, respaldo acolchado y correas ajustables', 89.99, 'Samsonite', 'Tectonic 2', 2022),
       ('12', 'Smartphone Samsung Galaxy S21', 'Un smartphone 5G con pantalla Dynamic AMOLED de 6.2\", procesador Exynos 2100, cámara triple de 64MP, batería de 4000 mAh y sistema operativo Android 11', 799.99, 'Samsung', 'Galaxy S21', 2021),
	   ('13', 'Barra de sonido Sonos Arc', 'Una barra de sonido con soporte para Dolby Atmos, conectividad Wi-Fi y Bluetooth, y compatibilidad con el asistente de voz de Google y Alexa', 799.00, 'Sonos', 'Arc', 2020),
       ('14', 'Consola de videojuegos PlayStation 5', 'Una consola de próxima generación con procesador AMD Zen 2, GPU AMD RDNA 2, almacenamiento SSD de 825GB, retrocompatibilidad con juegos de PS4 y soporte para gráficos 4K y 120Hz', 499.99, 'Sony', 'PlayStation 5', 2020),
       ('15', 'Bicicleta eléctrica Trek Verve+ 2', 'Una bicicleta eléctrica híbrida con motor Bosch Active Line, batería integrada, frenos de disco hidráulicos y capacidad para recorrer hasta 70 km con una sola carga', 2899.00, 'Trek', 'Verve+ 2', 2021);

INSERT INTO IMAGENES (id_imagen, url_image, tipo, id_producto)
VALUES (1, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FEcho1.png?alt=media&token=41360e46-78c1-4986-88e0-971069f65a7a', 'Primaria', 1), 
	   (2, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FEcho2.png?alt=media&token=a257b925-29d8-43fc-abb5-5688ee571b72','Secundaria',1),
       (3, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FEcho3.png?alt=media&token=10d5c327-7cc2-4643-9007-1c26b3d05934','Secundaria',1),
       (4, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FAppleW71.png?alt=media&token=9fbfe43e-7894-4e6c-aadd-f3990095169b', 'Primaria', 2),
       (5, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FAppleW72.png?alt=media&token=b2f800ab-aa93-43da-9635-1814b8bd0f87', 'Secundaria', 2),
       (6, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FAppleW73.png?alt=media&token=309d5fa2-32f3-4ffe-bdec-f70c28098e4c', 'Secundaria', 2),
       (7, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FIpad1.png?alt=media&token=c1bfd76f-4e7e-426c-accc-4747c80035fa', 'Primaria', 3),
       (8, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FIpad2.png?alt=media&token=3383e3e5-189c-482e-b4f9-e0659f442374', 'Secundaria', 3),
       (9, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FIpad3.png?alt=media&token=7c783799-a199-4d75-81d8-3cb7d814afa4', 'Secundaria', 3),
       (10, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FBose1.png?alt=media&token=ad6fb0a9-b91b-4812-be34-736c463ef21a', 'Primaria', 4),
       (11, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FBose2.png?alt=media&token=3097176b-037e-4763-b45d-3e7147296515', 'Secundaria', 4),
       (12, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FBose3.png?alt=media&token=e51d0d8e-6420-48b8-873c-f85aed355644', 'Secundaria', 4),
       (13, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FBose4.png?alt=media&token=79778ad8-7fe5-4b70-808b-2a8012480997', 'Secundaria', 4),
       (14, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FCanon1.png?alt=media&token=0858104c-7fa9-4ee4-a095-ab59615e397e', 'Primaria', 5),
       (15, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FCanon2.png?alt=media&token=b87d5fc8-363a-49ea-a2f5-49db8df01f0a', 'Secundaria', 5),
       (16, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FCanon3.png?alt=media&token=7cf84652-9810-42c2-864d-5707899f89fd', 'Secundaria', 5),
       (17, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FLonghi1.png?alt=media&token=baaafc67-e81f-43f7-a2b2-4531b3df10fd', 'Primaria', 6),
       (18, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FSpectre1.png?alt=media&token=7ccb31b5-c31f-4ba5-912b-3e3833a4d418', 'Primaria', 7),
       (19, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FSpectre2.png?alt=media&token=eb1fc8be-6c94-4abd-899d-72217c3a920c', 'Secundaria', 7),
       (20, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FSpectre3.png?alt=media&token=205a199e-920c-4811-a4b1-b191c6e6a473', 'Secundaria', 7),
       (21, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FHyperX1.png?alt=media&token=d64d069b-f7b2-47cd-b865-8609ad29c875', 'Primaria', 8),
       (22, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FHyperX2.png?alt=media&token=fa9fd76b-3a65-46dd-84cb-94b092a9ae42', 'Secundario', 8),
       (23, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FHyperX3.png?alt=media&token=21091d0b-8d2c-4ef0-a560-d3a775c5b452', 'Secundario', 8),
       (24, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FHyperX4.png?alt=media&token=6008a5e1-7526-45b0-be28-65bf738d403d', 'Secundario', 8),
       (25, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FIRobot1.png?alt=media&token=7e496f9e-fe2b-4f8d-90b1-0d4d6959bdff', 'Primaria', 9),
       (26, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FLG1.png?alt=media&token=df62fbba-acb2-4b04-b11e-00b7513194a0', 'Primaria', 10),
       (27, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FLG2.png?alt=media&token=7c525704-61e3-4824-bca3-38898bded2fe', 'Secundaria', 10),
       (28, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FLG3.png?alt=media&token=3a7d3972-b028-4042-9757-9cbf8f46f7ba', 'Secundaria', 10),
       (29, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FSamsonite1.png?alt=media&token=cd97b3c2-4dc5-40c0-a08b-89a623224355', 'Primaria', 11),
       (30, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FSamsonite2.png?alt=media&token=f9004fa1-3f8f-45be-9bae-cbc99f71f15a', 'Secundaria', 11),
       (31, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FSamsonite3.png?alt=media&token=ab2c0c05-5e10-4925-8fed-3f6012c49cfe', 'Secundaria', 11),
       (32, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FSamsung1.png?alt=media&token=85234cf7-b739-404e-97e2-948d0242b69b', 'Primaria', 12),
       (33, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FSamsung2.png?alt=media&token=c740d397-3670-4674-86ab-5ca2627d7090', 'Secundaria', 12),
       (34, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FSamsung3.png?alt=media&token=051c5eb1-7f90-40fb-b104-8c9507d5065b', 'Secundaria', 12),
       (35, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FSonos1.png?alt=media&token=cc3d2973-9081-446a-ad56-7b4f537fcb9f', 'Primaria', 13),
       (36, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FSonos2.png?alt=media&token=49056cf9-ea46-444f-9304-affaa5dd82e3', 'Secundaria', 13),
       (37, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FPlay51.png?alt=media&token=59a2a85d-850b-40d6-a35c-701c6ac6638f', 'Primaria', 14),
       (38, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FPlay52.png?alt=media&token=396ef2a1-4c1f-40b3-8ba4-7dad72780264', 'Secundaria', 14),
       (39, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FVerve1.png?alt=media&token=61547a2c-495c-4ca5-8e9b-ee80161a0526', 'Primaria', 15),
       (40, 'https://firebasestorage.googleapis.com/v0/b/carsales-28935.appspot.com/o/redesfinal%2FVerve2.png?alt=media&token=bd37a650-8d5c-4ba4-b7ec-05481ea6d653', 'Secundaria', 15);