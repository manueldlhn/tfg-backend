DROP TABLE IF EXISTS `usuarios_roles`;
DROP TABLE IF EXISTS `ejercicio_has_rutina`;
DROP TABLE IF EXISTS `usuario_has_ejercicio`;
DROP TABLE IF EXISTS `usuario_has_rutina`;
DROP TABLE IF EXISTS `ejercicio`;
DROP TABLE IF EXISTS `rutina`;
DROP TABLE IF EXISTS `usuarios`;



CREATE TABLE IF NOT EXISTS `ejercicio` (
  `ej_id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Subtitulo` varchar(200) NOT NULL,
  `Descripcion` varchar(1000) NOT NULL,
  `Estado_forma` varchar(10) NOT NULL,
  `Pub_priv` tinyint(1) NOT NULL,
  `Ubicacion` tinyint(1) NOT NULL,
  `Podometro` tinyint(1) NOT NULL,
  `RUTINA_USUARIOS_Email` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de Ejercicios';

--
-- Volcado de datos para la tabla `ejercicio`
--

INSERT INTO `ejercicio` (`ej_id`, `Nombre`, `Subtitulo`, `Descripcion`, `Estado_forma`, `Pub_priv`, `Ubicacion`, `Podometro`, `RUTINA_USUARIOS_Email`) VALUES
(11, 'VOLTERETAS', 'GEMA', 'Partiendo de la posición inicial de cuclillas, con los brazos extendidos al frente impulsarse hacia delante mediante la extensión de las piernas; apoyar las manos sobre la colchoneta llevando la barbilla al pecho y las caderas en alto, apoyar la espalda , rodar sobre ella mediante una posición encorvada, al tiempo que se llevan las rodillas extendidas, seguidamente se flexionan las rodillas, continuando el impulso con el tronco hasta llegar a la posición inicial.', 'Bajo', 1, 0, 0, 'gema@gmail.com'),
(12, 'BICEPS', 'PAUL', 'hhhh', 'Medio', 1, 0, 0, 'paul@gmail.com'),
(13, 'LEVANTAMIENTO DE PESO', 'GEMA', 'Con una posición de pie, mirando al frente y con las rodillas levemente flexionadas, se procederá a acercar la mancuerna a los hombros doblando los codos desde un ángulo de 90 grados. Cuando la mancuerna llegue a la altura de los hombros se volverá a la posición inicial con cuidado. Es recomendable hacer 3 series de 15 repeticiones.', 'Medio', 1, 0, 0, 'gema@gmail.com'),
(14, 'CARRERA AL AIRE LIBRE', 'Manuel Especialista', 'Correr al aire libre, durante el tiempo indicado, con pausas de hidratación.', 'Medio', 1, 1, 1, 'manuel@especialista.es');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicio_has_rutina`
--

CREATE TABLE IF NOT EXISTS `ejercicio_has_rutina` (
  `EJERCICIO_ej_id` int(11) NOT NULL,
  `RUTINA_rut_id` int(11) NOT NULL,
  `Comentarios` varchar(100),
  `USUARIOS_Email` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla que relacion Rutinas con Ejercicios.\nUna rutina puede contener muchos ejercicios.\nUn ejercicio puede estar en muchas rutinas.';

--
-- Volcado de datos para la tabla `ejercicio_has_rutina`
--

INSERT INTO `ejercicio_has_rutina` (`EJERCICIO_ej_id`, `RUTINA_rut_id`, `USUARIOS_Email`) VALUES
(12, 15, 'gema@gmail.com'),
(13, 17, 'gema@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutina`
--

CREATE TABLE IF NOT EXISTS `rutina` (
  `rut_id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(1000) NOT NULL,
  `Info_Rutina` varchar(500) NOT NULL,
  `Pub_priv` tinyint(1) DEFAULT NULL,
  `USUARIOS_Email` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de Rutinas';

--
-- Volcado de datos para la tabla `rutina`
--

INSERT INTO `rutina` (`rut_id`, `Nombre`, `Descripcion`, `Info_Rutina`, `Pub_priv`, `USUARIOS_Email`) VALUES
(15, 'PECHO', 'Recuéstate de espalda sobre un banco y sujeta 2 mancuernas al nivel del pecho, a los lados del cuerpo, con las palmas apuntando hacia tus pies.\n\nEleva las mancuernas en forma recta hacia arriba hasta que tus codos se encuentren cerca de trabarse y bájalas lentamente luego de una breve pausa.\n\nExhala al levantar las mancuernas e inhala al bajarlas.', 'GEMA', 1, 'gema@gmail.com'),
(17, 'ESPALDA', 'Colócate de pie frente a la barra con los pies separados con el ancho de los hombros. Contrae los abdominales, saca pecho manteniendo la espalda recta y dobla las rodillas hasta que pueda llegar a la barra.\nAgarra la barra con un agarre prono (los pulgares uno frente al otro), siendo ligeramente más ancho que la anchura de los hombro – usa los anillos de la barra como punto de referencia, para asegurar que está equilibrado.\nSujeta la barra con fuerza, manteniendo los abdominales y la parte inferior de la espalda contraídos, la espalda recta y el pecho hacia adelante. Fija la mirada en un punto de enfrente, inhala y contén la respiración.', 'GEMA', 1, 'gema@gmail.com'),
(18, 'GEMELOS', 'Movimiento simple, comenzar de pie y realizar elevaciones de talón concentrando el gemelo. Para aumentar el esfuerzo, situar la parte delantera del píe en el borde de un escalón o bordillo y cuando realicéis el movimiento descendente, bajar los talones todo lo que podáis. Aguantar un par de segundos la posición tanto en la parte más elevada como en la inferior para evitar usar el rebote.', 'PAUL', 1, 'paul@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `Email` varchar(45) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Fecha_Nacimiento` date NOT NULL,
  `Enabled` tinyint(4) NOT NULL,
  `Telefono` varchar(9) NOT NULL,
  `Rol` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Email`, `Password`, `Nombre`,`Fecha_Nacimiento`,`Enabled`, `Telefono`,`Rol`) VALUES
('gema@gmail.com', '$2b$10$uveRJSG68o..1k.GN/8hZuh3mxWAtRpimIEybAhFWswmqRKLHD2vi','Gema Perez Sal','1982-01-07', 1, '666555444', 'Especialista'),
('paco@gmail.com', '$2b$10$ADq1tozYv2wo1dMp8s1K/OMisdhovX56NUDmufnlTxk78XeTx2ApK', 'Paco Gin Ton','1980-02-28', 1, '666777888', 'Especialista'),
('paul@gmail.com', '$2b$10$mLJlZntb5WXuCT1Bo/Amr.3jVBE1KUpt4/sS8bbpNJVsS2NKPoENi', 'Pablo Car','1993-02-03', 1, '697550247', 'Usuario'),
('pep@us.es', '$2b$10$pbFHbb5brtysm/zT976PheSaphMo8dt7cCw.MbfvcMF4S5vk9byWe', 'PEPE','1999-12-23', 1, '654654654', 'Usuario'),
('pop@us.es', '$2b$10$mLJlZntb5WXuCT1Bo/Amr.3jVBE1KUpt4/sS8bbpNJVsS2NKPoENi', 'pepe perez nuñez','1998-03-03', 1, '654321123', 'Usuario'),
('manuel@usuario.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Manuel Usuario', '1995-06-26',1,'600600600','Usuario'),
('manuel@especialista.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Manuel Especialista','1995-06-26',1,'661661661','Especialista'),
('timetravel_0@bbs.ab', '$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe', 'John Titor', '1998-08-11', 0, '601835100', 'Usuario'),
('usuario01@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 01','2000-01-01',1,'601601601','Usuario'),
('usuario02@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 02','2000-01-01',1,'602602602','Usuario'),
('usuario03@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 03','2000-01-01',1,'603603603','Usuario'),
('usuario04@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 04','2000-01-01',1,'604604604','Usuario'),
('usuario05@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 05','2000-01-01',1,'605605605','Usuario'),
('usuario06@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 06','2000-01-01',1,'606606606','Usuario'),
('usuario07@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 07','2000-01-01',1,'607607607','Usuario'),
('usuario08@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 08','2000-01-01',1,'608608608','Usuario'),
('usuario09@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 09','2000-01-01',1,'609609609','Usuario'),
('usuario10@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 10','2000-01-01',1,'610610610','Usuario'),
('usuario11@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 11','2000-01-01',1,'611611611','Usuario'),
('usuario12@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 12','2000-01-01',1,'612612612','Usuario'),
('usuario13@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 13','2000-01-01',1,'613613613','Usuario'),
('usuario14@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 14','2000-01-01',1,'614614614','Usuario'),
('usuario15@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 15','2000-01-01',1,'615615615','Usuario'),
('usuario16@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 16','2000-01-01',1,'616616616','Usuario'),
('usuario17@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 17','2000-01-01',1,'617617617','Usuario'),
('usuario18@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 18','2000-01-01',1,'618618618','Usuario'),
('usuario19@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 19','2000-01-01',1,'619619619','Usuario'),
('usuario20@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 20','2000-01-01',1,'620620620','Usuario'),
('usuario21@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 21','2000-01-01',1,'621621621','Usuario'),
('usuario22@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 22','2000-01-01',1,'622622622','Usuario'),
('usuario23@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 23','2000-01-01',1,'623623623','Usuario'),
('usuario24@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 24','2000-01-01',1,'624624624','Usuario'),
('usuario25@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 25','2000-01-01',1,'625625625','Usuario'),
('usuario26@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 26','2000-01-01',1,'626626626','Usuario'),
('usuario27@prueba.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Usuario de Prueba 27','2000-01-01',1,'627627627','Usuario');



-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_has_ejercicio`
--

CREATE TABLE IF NOT EXISTS `usuario_has_ejercicio` (
  `usuario_email` varchar(100) NOT NULL,
  `ejercicio_id` int(11) NOT NULL,
  `Comentarios` varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario_has_ejercicio`
--

INSERT INTO `usuario_has_ejercicio` (`usuario_email`, `ejercicio_id`, `Comentarios`) VALUES
('paco@gmail.com', 11, 'Comentarios de prueba'),
('paco@gmail.com', 12, 'Comentarios de prueba'),
('paco@gmail.com', 13, 'Comentarios de prueba'),
('manuel@usuario.es', 11, 'Comentarios de prueba'),
('manuel@usuario.es', 12, 'Comentarios de prueba'),
('manuel@usuario.es', 14, 'Comentarios de prueba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_has_rutina`
--

CREATE TABLE IF NOT EXISTS `usuario_has_rutina` (
  `usuario_email` varchar(100) NOT NULL,
  `rutina_id` int(11) NOT NULL,
  `Comentarios` varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario_has_rutina`
--

INSERT INTO `usuario_has_rutina` (`usuario_email`, `rutina_id`, `Comentarios`) VALUES
('paco@gmail.com', 15, 'Comentarios de prueba'),
('paco@gmail.com', 17, 'Comentarios de prueba'),
('paco@gmail.com', 18, 'Comentarios de prueba'),
('manuel@usuario.es', 15, 'Comentarios de prueba'),
('manuel@usuario.es', 17, 'Comentarios de prueba');

-- --------------------------------------------------------


--

--
-- Indices de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD PRIMARY KEY (`ej_id`),
  ADD KEY `fk_RUTINA_USUARIOS_Email` (`RUTINA_USUARIOS_Email`);

--
-- Indices de la tabla `ejercicio_has_rutina`
--
ALTER TABLE `ejercicio_has_rutina`
  ADD PRIMARY KEY (`EJERCICIO_ej_id`,`RUTINA_rut_id`),
  ADD KEY `fk_EJERCICIO_has_RUTINA_RUTINA1` (`RUTINA_rut_id`);

--
-- Indices de la tabla `rutina`
--
ALTER TABLE `rutina`
  ADD PRIMARY KEY (`rut_id`,`USUARIOS_Email`),
  ADD KEY `fk_RUTINA_USUARIOS1` (`USUARIOS_Email`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Email`),
  ADD UNIQUE KEY `Telefono` (`Telefono`);



--
-- Indices de la tabla `usuario_has_ejercicio`
--
ALTER TABLE `usuario_has_ejercicio`
  ADD PRIMARY KEY (`usuario_email`,`ejercicio_id`),
  ADD KEY `ejercicio_id` (`ejercicio_id`),
  ADD KEY `usuario_has_ejercicio_ibfk_2` (`usuario_email`);

--
-- Indices de la tabla `usuario_has_rutina`
--
ALTER TABLE `usuario_has_rutina`
  ADD PRIMARY KEY (`usuario_email`,`rutina_id`),
  ADD KEY `usuario_has_rutina_ibfk_1` (`rutina_id`),
  ADD KEY `usuario_email` (`usuario_email`);


--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  MODIFY `ej_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `rutina`
--
ALTER TABLE `rutina`
  MODIFY `rut_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD CONSTRAINT `fk_RUTINA_USUARIOS_Email` FOREIGN KEY (`RUTINA_USUARIOS_Email`) REFERENCES `usuarios` (`Email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ejercicio_has_rutina`
--
ALTER TABLE `ejercicio_has_rutina`
  ADD CONSTRAINT `fk_EJERCICIO_has_RUTINA_EJERCICIO` FOREIGN KEY (`EJERCICIO_ej_id`) REFERENCES `ejercicio` (`ej_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_EJERCICIO_has_RUTINA_RUTINA1` FOREIGN KEY (`RUTINA_rut_id`) REFERENCES `rutina` (`rut_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `rutina`
--
ALTER TABLE `rutina`
  ADD CONSTRAINT `fk_RUTINA_USUARIOS1` FOREIGN KEY (`USUARIOS_Email`) REFERENCES `usuarios` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_has_ejercicio`
--
ALTER TABLE `usuario_has_ejercicio`
  ADD CONSTRAINT `usuario_has_ejercicio_ibfk_1` FOREIGN KEY (`ejercicio_id`) REFERENCES `ejercicio` (`ej_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_has_ejercicio_ibfk_2` FOREIGN KEY (`usuario_email`) REFERENCES `usuarios` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_has_rutina`
--
ALTER TABLE `usuario_has_rutina`
  ADD CONSTRAINT `usuario_has_rutina_ibfk_1` FOREIGN KEY (`rutina_id`) REFERENCES `rutina` (`rut_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_has_rutina_ibfk_2` FOREIGN KEY (`usuario_email`) REFERENCES `usuarios` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE;