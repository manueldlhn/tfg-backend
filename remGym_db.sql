DROP TABLE IF EXISTS `historial_usuarios`;
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
  `Ubicacion` tinyint(1) NOT NULL,
  `Podometro` tinyint(1) NOT NULL,
  `Video` varchar(100),
  `USUARIOS_Email` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de Ejercicios';

--
-- Volcado de datos para la tabla `ejercicio`
--

INSERT INTO `ejercicio` (`ej_id`, `Nombre`, `Subtitulo`, `Descripcion`, `Estado_forma`, `Ubicacion`, `Podometro`, `Video`, `USUARIOS_Email`) VALUES
(11, 'VOLTERETAS', 'Gema Perez Sal', 'Partiendo de la posición inicial de cuclillas, con los brazos extendidos al frente impulsarse hacia delante mediante la extensión de las piernas; apoyar las manos sobre la colchoneta llevando la barbilla al pecho y las caderas en alto, apoyar la espalda , rodar sobre ella mediante una posición encorvada, al tiempo que se llevan las rodillas extendidas, seguidamente se flexionan las rodillas, continuando el impulso con el tronco hasta llegar a la posición inicial.', 'Bajo', 0, 0, "https://www.youtube.com/embed/dQw4w9WgXcQ", 'gema@remgym.es'),
(12, 'BICEPS', 'Pablo Car', 'Se requieren mancuernas. Con una postura erguida, bien de pie o bien sentado, realizar flexión del codo hacia arriba, con la palma de la mano paralela al resto del brazo.', 'Medio', 0, 0, "https://www.youtube.com/embed/dQw4w9WgXcQ", 'paul@remgym.es'),
(13, 'LEVANTAMIENTO DE PESO', 'Gema Perez Sal', 'Con una posición de pie, mirando al frente y con las rodillas levemente flexionadas, se procederá a acercar la mancuerna a los hombros doblando los codos desde un ángulo de 90 grados. Cuando la mancuerna llegue a la altura de los hombros se volverá a la posición inicial con cuidado. Es recomendable hacer 3 series de 15 repeticiones.', 'Medio', 0, 0, "https://www.youtube.com/embed/dQw4w9WgXcQ", 'gema@remgym.es'),
(14, 'CARRERA AL AIRE LIBRE', 'Manuel Especialista', 'Correr al aire libre, durante el tiempo indicado, con pausas de hidratación.', 'Medio', 1, 1, null, 'manuel_esp@remgym.es'),
(15, 'GLÚTEOS', 'Manuel Especialista', 'Realizar sentadillas bajando a media altura, con los pies paralelos y una separación de unos 30 centímetros. Mantener la espalda recta al bajar y subir para evitar cargar la zona lumbar.', 'Medio', 0, 0, "https://www.youtube.com/embed/dQw4w9WgXcQ", 'manuel_esp@remgym.es'),
(16, 'ABDOMINALES', 'Manuel Especialista', 'Desde una postura inicial tumbado, con las piernas flexionadas de manera que los talones estén en contacto con los glúteos, flexionar el tronco hacia adelante, manteniendo recta la espalda y el cuello. Se puede ayudar con las manos apoyadas tras la nuca.', 'Medio', 0,0, "https://www.youtube.com/embed/dQw4w9WgXcQ", 'manuel_esp@remgym.es'),
(17, 'GEMELOS', 'Pablo Car', 'Movimiento simple, comenzar de pie y realizar elevaciones de talón concentrando el gemelo. Para aumentar el esfuerzo, situar la parte delantera del píe en el borde de un escalón o bordillo y cuando realicéis el movimiento descendente, bajar los talones todo lo que podáis. Aguantar un par de segundos la posición tanto en la parte más elevada como en la inferior para evitar usar el rebote.', 'Alto', 0, 0, "https://www.youtube.com/embed/dQw4w9WgXcQ", 'paul@remgym.es'),
(18, 'PECTORALES', 'Gema Perez Sal', 'Recuéstate de espalda sobre un banco y sujeta 2 mancuernas al nivel del pecho, a los lados del cuerpo, con las palmas apuntando hacia tus pies.\n\nEleva las mancuernas en forma recta hacia arriba hasta que tus codos se encuentren cerca de trabarse y bájalas lentamente luego de una breve pausa.\n\nExhala al levantar las mancuernas e inhala al bajarlas.', 'Medio', 0,0, "https://www.youtube.com/embed/dQw4w9WgXcQ", 'gema@remgym.es'),
(19, 'BICICLETA SUAVE AL AIRE LIBRE', 'Manuel Especialista', 'Elegir una zona amplia y apta para realizar este ejercicio. Pedalear a ritmo suave durante 25 minutos. Parar a descansar e hidratarse cada 10 minutos aproximadamente.', 'Bajo', 1, 0, null, 'manuel_esp@remgym.es'),
(20, 'ESPALDA', 'Gema Perez Sal', 'Colócate de pie frente a la barra con los pies separados con el ancho de los hombros. Contrae los abdominales, saca pecho manteniendo la espalda recta y dobla las rodillas hasta que pueda llegar a la barra.\nAgarra la barra con un agarre prono (los pulgares uno frente al otro), siendo ligeramente más ancho que la anchura de los hombro – usa los anillos de la barra como punto de referencia, para asegurar que está equilibrado.\nSujeta la barra con fuerza, manteniendo los abdominales y la parte inferior de la espalda contraídos, la espalda recta y el pecho hacia adelante. Fija la mirada en un punto de enfrente, inhala y contén la respiración.', 'Medio', 0,0, "https://www.youtube.com/embed/dQw4w9WgXcQ", 'gema@remgym.es');
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

INSERT INTO `ejercicio_has_rutina` (`EJERCICIO_ej_id`, `RUTINA_rut_id`, `USUARIOS_Email`, `Comentarios`) VALUES
(12, 15, 'gema@remgym.es','Comentarios de prueba'),
(13, 17, 'gema@remgym.es','Comentarios de prueba 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutina`
--

CREATE TABLE IF NOT EXISTS `rutina` (
  `rut_id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(1000) NOT NULL,
  `Info_Rutina` varchar(500) NOT NULL,
  `USUARIOS_Email` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de Rutinas';

--
-- Volcado de datos para la tabla `rutina`
--

INSERT INTO `rutina` (`rut_id`, `Nombre`, `Descripcion`, `Info_Rutina`, `USUARIOS_Email`) VALUES
(15, 'PECHO', 'Rutina para entrenar el pecho', 'Gema Perez Sal', 'gema@remgym.es'),
(17, 'ESPALDA', 'Rutina para entrenamiento de espalda.', 'Gema Perez Sal', 'gema@remgym.es'),
(18, 'PIERNAS', 'Rutina para entrenamiento de piernas.', 'Pablo car', 'paul@remgym.es'),
(19, 'FULL BODY SUAVE', 'Rutina para entrenamiento del cuerpo de forma deslocalizada', 'Manuel Especialista', 'manuel_esp@remgym.es'),
(20, 'RESISTENCIA', 'Rutina para entrenar la resistencia', 'Manuel Especialista', 'manuel_esp@remgym.es'),
(21, 'BRAZOS', 'Rutina para entrenar brazos', 'Manuel Especialista', 'manuel_esp@remgym.es');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `Email` varchar(45) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Fecha_Nacimiento` date NOT NULL,
  `Telefono` varchar(9) NOT NULL,
  `Rol` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Email`, `Password`, `Nombre`,`Fecha_Nacimiento`,`Telefono`,`Rol`) VALUES
('gema@remgym.es', '$2b$10$uveRJSG68o..1k.GN/8hZuh3mxWAtRpimIEybAhFWswmqRKLHD2vi','Gema Perez Sal','1982-01-07','666555444', 'Especialista'),
('paco@remgym.es', '$2b$10$ADq1tozYv2wo1dMp8s1K/OMisdhovX56NUDmufnlTxk78XeTx2ApK', 'Paco Álvarez Ton','1980-02-28', '666777888', 'Usuario'),
('paul@remgym.es', '$2b$10$mLJlZntb5WXuCT1Bo/Amr.3jVBE1KUpt4/sS8bbpNJVsS2NKPoENi', 'Pablo Car','1993-02-03', '697550247', 'Especialista'),
('pep@remgym.es', '$2b$10$pbFHbb5brtysm/zT976PheSaphMo8dt7cCw.MbfvcMF4S5vk9byWe', 'José Francisco Alberti','1999-12-23', '654654654', 'Usuario'),
('pop@remgym.es', '$2b$10$mLJlZntb5WXuCT1Bo/Amr.3jVBE1KUpt4/sS8bbpNJVsS2NKPoENi', 'José Pérez Núñez','1998-03-03', '654321123', 'Usuario'),
('manuel_us@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Manuel de la Haba', '1995-06-26','600600600','Usuario'),
('manuel_esp@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Manuel Especialista','1995-06-26','661661661','Especialista'),
('alberto@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Alberto José Rodríguez','2000-01-01','601601601','Usuario'),
('antonio@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Antonio María García','2000-01-01','602602602','Usuario'),
('carlos@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Carlos Meléndez','2000-01-01','603603603','Usuario'),
('cristina@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Cristina Aros','2000-01-01','604604604','Usuario'),
('luis@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Luis Dídebo','2000-01-01','605605605','Usuario'),
('jesus_epd@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Jesús Granada','2000-01-01','606606606','Usuario'),
('pedro@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Pedro Bautista Martín','2000-01-01','607607607','Usuario'),
('juan@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Juan Estéban','2000-01-01','608608608','Usuario'),
('juancar@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Juan Carlos Larcos','2000-01-01','609609609','Usuario'),
('esther@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Esther Belén','2000-01-01','610610610','Usuario'),
('miriam@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Miriam Madrid Más','2000-01-01','611611611','Usuario'),
('marta@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Marta R','2000-01-01','612612612','Usuario'),
('rafael@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Rafael Comando','2000-01-01','613613613','Usuario'),
('enrique@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Enrique Baco','2000-01-01','614614614','Usuario'),
('joselu@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Jose Luís Bóvedas','2000-01-01','615615615','Usuario'),
('alv_bel@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Álvaro Bellerín','2000-01-01','616616616','Usuario'),
('jaime@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Jaime Alcázar','2000-01-01','617617617','Usuario'),
('zelda@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Zelda Williams','2000-01-01','618618618','Usuario'),
('mario@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Mario Brothers','2000-01-01','619619619','Usuario'),
('samus@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Samus Martínez','2000-01-01','620620620','Usuario'),
('jacob@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Jacob Doge','2000-01-01','621621621','Usuario'),
('koda@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Koda Blanco','2000-01-01','622622622','Usuario'),
('aceituna@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Olivia Panther','2000-01-01','623623623','Usuario'),
('zacositt@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Zacarías Almir','2000-01-01','624624624','Usuario'),
('jojo@remgym.es','$2b$10$4oe0S0xKqmUUNXfuB3o27OOpUNJ89qL0vQhMOO8Bhub7Zd4y3/Khe','Jonathan Joestar','2000-01-01','625625625','Especialista');



-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_has_ejercicio`
--

CREATE TABLE IF NOT EXISTS `usuario_has_ejercicio` (
  `usuario_email` varchar(100) NOT NULL,
  `ejercicio_id` int(11) NOT NULL,
  `especialista_email` varchar(100) NOT NULL,
  `Comentarios` varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario_has_ejercicio`
--

INSERT INTO `usuario_has_ejercicio` (`usuario_email`, `ejercicio_id`, `especialista_email`, `Comentarios`) VALUES
('paco@remgym.es', 11, 'manuel_esp@remgym.es', 'Comentarios de prueba'),
('paco@remgym.es', 12, 'manuel_esp@remgym.es', 'Comentarios de prueba'),
('paco@remgym.es', 13, 'manuel_esp@remgym.es', 'Comentarios de prueba'),
('manuel_us@remgym.es', 11, 'manuel_esp@remgym.es', 'Comentarios de prueba'),
('manuel_us@remgym.es', 12, 'manuel_esp@remgym.es', 'Comentarios de prueba'),
('manuel_us@remgym.es', 14, 'manuel_esp@remgym.es', 'Comentarios de prueba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_has_rutina`
--

CREATE TABLE IF NOT EXISTS `usuario_has_rutina` (
  `usuario_email` varchar(100) NOT NULL,
  `rutina_id` int(11) NOT NULL,
  `especialista_email` varchar(100) NOT NULL,
  `Comentarios` varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario_has_rutina`
--

INSERT INTO `usuario_has_rutina` (`usuario_email`, `rutina_id`, `especialista_email`, `Comentarios`) VALUES
('paco@remgym.es', 15, 'manuel_esp@remgym.es', 'Comentarios de prueba'),
('paco@remgym.es', 17, 'manuel_esp@remgym.es', 'Comentarios de prueba'),
('paco@remgym.es', 18, 'manuel_esp@remgym.es', 'Comentarios de prueba'),
('manuel_us@remgym.es', 15, 'manuel_esp@remgym.es', 'Comentarios de prueba'),
('manuel_us@remgym.es', 17, 'manuel_esp@remgym.es', 'Comentarios de prueba');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `historial_usuarios`
--

CREATE TABLE IF NOT EXISTS `historial_usuarios` (
  `USUARIOS_Email` varchar(100) NOT NULL,
  `EJERCICIO_ej_id` int(11) NOT NULL,
  `RUTINA_rut_id` int(11),
  `Fecha_Hora` varchar(100) NOT NULL,
  `Tiempo_ejercicio` varchar (100) NOT NULL,
  `Info_Adicional` varchar(200)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--

--
-- Indices de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD PRIMARY KEY (`ej_id`),
  ADD KEY `fk_USUARIOS_Email` (`USUARIOS_Email`);

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
-- Indices de la tabla `historial_usuarios`
-- 

ALTER TABLE `historial_usuarios`
  ADD PRIMARY KEY (`USUARIOS_Email`,`EJERCICIO_ej_id`,`Fecha_Hora`),
  ADD KEY `historial_usuarios_fk_email` (`USUARIOS_Email`),
  ADD KEY `historial_usuarios_fk_ejercicio` (`EJERCICIO_ej_id`);

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
  ADD CONSTRAINT `fk_USUARIOS_Email` FOREIGN KEY (`USUARIOS_Email`) REFERENCES `usuarios` (`Email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ejercicio_has_rutina`
--
ALTER TABLE `ejercicio_has_rutina`
  ADD CONSTRAINT `fk_EJERCICIO_has_RUTINA_EJERCICIO` FOREIGN KEY (`EJERCICIO_ej_id`) REFERENCES `ejercicio` (`ej_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_EJERCICIO_has_RUTINA_RUTINA1` FOREIGN KEY (`RUTINA_rut_id`) REFERENCES `rutina` (`rut_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_EJERCICIO_has_RUTINA_ESPECIALISTA` FOREIGN KEY (`USUARIOS_Email`) REFERENCES `usuarios` (`Email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  
--
-- Filtros para la tabla `historial_usuarios`
--
ALTER TABLE `historial_usuarios`
  ADD CONSTRAINT `historial_usuarios_ibfk_1` FOREIGN KEY (`USUARIOS_Email`) REFERENCES `usuarios` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_usuarios_ibfk_2` FOREIGN KEY (`EJERCICIO_ej_id`) REFERENCES `ejercicio` (`ej_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_usuarios_ibfk_3` FOREIGN KEY (`RUTINA_rut_id`) REFERENCES `rutina` (`rut_id`) ON DELETE SET NULL ON UPDATE CASCADE;