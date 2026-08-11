DROP DATABASE IF EXISTS eduino_db;

CREATE DATABASE eduino_db;

USE eduino_db;

SET NAMES utf8mb4;

CREATE TABLE operaciones_matematicas (
    id_test INT AUTO_INCREMENT PRIMARY KEY,
    primer_operador INT NOT NULL,
    segundo_operador INT NOT NULL,
    operacion VARCHAR(250) NOT NULL,
    opcion_a VARCHAR(255) NOT NULL,
    opcion_b VARCHAR(255) NOT NULL,
    opcion_c VARCHAR(255) NOT NULL,
    opcion_d VARCHAR(255) NOT NULL,
    respuesta CHAR(1) NOT NULL COMMENT 'A, B, C o D',
    dificultad INT NOT NULL,
    recompensa INT NOT NULL DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE problemas_matematicas (
    id_problema_matematicas INT AUTO_INCREMENT PRIMARY KEY,
    enunciado VARCHAR(250) NOT NULL,
    respuesta_numero INT NOT NULL,
    respuesta_palabra VARCHAR(255) NOT NULL,
    dificultad INT NOT NULL,
    recompensa INT NOT NULL DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE palabras_lengua (
    id_palabras_lengua INT AUTO_INCREMENT PRIMARY KEY,
    palabra VARCHAR(255) NOT NULL,
    dificultad INT NOT NULL,
    respuesta INT NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE test_geografia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta VARCHAR(255) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    opcion_a VARCHAR(100) NOT NULL,
    opcion_b VARCHAR(100) NOT NULL,
    opcion_c VARCHAR(100) NOT NULL,
    opcion_d VARCHAR(100) NOT NULL,
    respuesta CHAR(1) NOT NULL,
    recompensa INT DEFAULT 5
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE test_historia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta VARCHAR(255) NOT NULL,
    personaje VARCHAR(100) NOT NULL,
    opcion_a VARCHAR(100) NOT NULL,
    opcion_b VARCHAR(100) NOT NULL,
    opcion_c VARCHAR(100) NOT NULL,
    opcion_d VARCHAR(100) NOT NULL,
    respuesta CHAR(1) NOT NULL,
    recompensa INT DEFAULT 5
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE tutores (
    id_tutor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE eduinos (
    id_eduino INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    imagen_perfil VARCHAR(150) NOT NULL,
    imagen_eduino VARCHAR(150) NOT NULL,
    descripcion VARCHAR(150) NOT NULL,
    tipo VARCHAR(150) NOT NULL,
    vida INT NOT NULL,
    fuerza INT NOT NULL,
    ataque1 VARCHAR(150) NOT NULL,
    ataque2 VARCHAR(150) NOT NULL,
    ataque3 VARCHAR(150) NOT NULL,
    ataque4 VARCHAR(150) NOT NULL,
    super_ataque VARCHAR(150) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE comida (
    id_comida INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    imagen_perfil VARCHAR(150) NOT NULL,
    descripcion VARCHAR(150) NOT NULL,
    precio INT NOT NULL,
    alimentacion INT NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE educapsulas (
    id_educapsulas INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    imagen VARCHAR(150) NOT NULL,
    descripcion VARCHAR(150) NOT NULL,
    numero_giros INT NOT NULL,
    precio INT NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE nenes (
    id_nene INT AUTO_INCREMENT PRIMARY KEY,
    id_tutor INT NOT NULL,
    -- Datos personales
    nombre VARCHAR(150) NOT NULL,
    apodo VARCHAR(150) NOT NULL,
    foto VARCHAR(500),
    fecha_nac DATE NOT NULL,
    nivel ENUM(
        'Infantil',
        'Junior',
        'Pre-adolescente'
    ) NOT NULL DEFAULT 'Infantil',
    dias_de_sesion INT UNSIGNED NOT NULL DEFAULT 0,
    -- Datos de control parental
    dias_permitidos SET(
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
        'Domingo'
    ) NOT NULL,
    tiempo_pantalla SMALLINT UNSIGNED NOT NULL DEFAULT 120,
    horario_inicio TIME NOT NULL,
    horario_fin TIME NOT NULL,
    -- Datos sobre las monedas
    monedas_total INT UNSIGNED NOT NULL DEFAULT 1000,
    monedas_actual INT UNSIGNED NOT NULL DEFAULT 1000,
    -- DAtos sobre los trofeos
    -- Datos sobre las monedas
    trofeos_total INT UNSIGNED NOT NULL DEFAULT 0,
    trofeos_actual INT UNSIGNED NOT NULL DEFAULT 0,
    -- Datos sobre los eduinos
    numero_capsulas_total INT UNSIGNED NOT NULL DEFAULT 0,
    numero_eduinos_total INT UNSIGNED NOT NULL DEFAULT 0,
    -- Datos sobre los estudios
    -- //Lengua
    numero_ejercicios_lengua INT UNSIGNED NOT NULL DEFAULT 0,
    numero_de_sopas INT UNSIGNED NOT NULL DEFAULT 0,
    numero_de_palabras_encontradas INT UNSIGNED NOT NULL DEFAULT 0,
    -- //Mates
    numero_ejercicios_matematicas INT UNSIGNED NOT NULL DEFAULT 0,
    numero_de_operaciones INT UNSIGNED NOT NULL DEFAULT 0,
    numero_de_problemas INT UNSIGNED NOT NULL DEFAULT 0,
    -- //Geografia
    numero_ejercicios_geografia INT UNSIGNED NOT NULL DEFAULT 0,
    numero_capitales_adivinadas INT UNSIGNED NOT NULL DEFAULT 0,
    -- //Historia
    numero_ejercicios_historia INT UNSIGNED NOT NULL DEFAULT 0,
    numero_test_historia INT UNSIGNED NOT NULL DEFAULT 0,
    -- Datos sobre los gastos
    monedas_gastadas_comida INT UNSIGNED NOT NULL DEFAULT 0,
    monedas_gastadas_capsulas INT UNSIGNED NOT NULL DEFAULT 0,
    monedas_gastadas_eduinos INT UNSIGNED NOT NULL DEFAULT 0,
    -- Datos sobre los logros
    logros_conseguidos INT UNSIGNED NOT NULL DEFAULT 0,
    FOREIGN KEY (id_tutor) REFERENCES tutores (id_tutor) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- COLECCIONES

CREATE TABLE coleccionEduinos (
    id_eduino_unico INT NOT NULL AUTO_INCREMENT,
    id_nene INT NOT NULL,
    id_eduino INT NOT NULL,
    nivel INT NOT NULL,
    porcentaje DECIMAL(5, 2) NOT NULL DEFAULT 0,
    vida_actual INT NOT NULL DEFAULT 0,
    fuerza_actual INT NOT NULL DEFAULT 0,
    PRIMARY KEY (
        id_eduino_unico,
        id_nene,
        id_eduino
    ),
    FOREIGN KEY (id_nene) REFERENCES nenes (id_nene) ON DELETE CASCADE,
    FOREIGN KEY (id_eduino) REFERENCES eduinos (id_eduino) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE coleccionComida (
    id_nene INT NOT NULL,
    id_comida INT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (id_nene, id_comida),
    FOREIGN KEY (id_nene) REFERENCES nenes (id_nene) ON DELETE CASCADE,
    FOREIGN KEY (id_comida) REFERENCES comida (id_comida) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE mercado (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_nene INT NOT NULL,
    id_eduino INT NOT NULL,
    id_eduino_unico INT NOT NULL,
    nivel INT NOT NULL,
    precio INT NOT NULL,
    FOREIGN KEY (id_nene) REFERENCES nenes (id_nene) ON DELETE CASCADE,
    FOREIGN KEY (id_eduino) REFERENCES eduinos (id_eduino) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------

INSERT INTO
    tutores (
        nombre,
        telefono,
        email,
        password_hash
    )
VALUES (
        'Admin',
        '600000000',
        'admin@eduino.com',
        '$2y$10$zaLzGz44Gza5XPn5q6Os0u9QsCNj3H2ietUhppIICQYcwKLn6FlqG'
    );

INSERT INTO
    eduinos (
        nombre,
        imagen_perfil,
        imagen_eduino,
        descripcion,
        tipo,
        vida,
        fuerza,
        ataque1,
        ataque2,
        ataque3,
        ataque4,
        super_ataque
    )
VALUES (
        'Antor',
        'imagenes/eduinos/eduino_icono/Antor.png',
        'imagenes/eduinos/eduino_foto/Antor.png',
        '???',
        'Insecto',
        85,
        90,
        'Zarpazo Cristal',
        'Aguijón Carmesí',
        'Cornada Gema',
        'Lluvia de Esquirlas',
        'Tormenta de Cristal'
    ),
    -- (
    --     'Arka',
    --     'imagenes/eduinos/eduino_icono/Arka.png',
    --     'imagenes/eduinos/eduino_foto/Arka.png',
    --     '???',
    --     'Magia',
    --     75, 95,
    --     'Bastón Arcano',
    --     'Llama Mística',
    --     'Ola de Conjuros',
    --     'Toque Maldito',
    --     'Apocalipsis Mágico'
    -- ),
    (
        'Auton',
        'imagenes/eduinos/eduino_icono/Auton.png',
        'imagenes/eduinos/eduino_foto/Auton.png',
        '???',
        'Hierro',
        100,
        85,
        'Spray Tóxico',
        'Cohete Urbano',
        'Puño de Acero',
        'Estrella Metálica',
        'Bombardeo Graffiti'
    ),
    (
        'Cashor',
        'imagenes/eduinos/eduino_icono/Cashor.png',
        'imagenes/eduinos/eduino_foto/Cashor.png',
        '???',
        'Hierro',
        90,
        80,
        'Lluvia de Monedas',
        'Maletín Demoledor',
        'Contrato Maldito',
        'Inversión Explosiva',
        'Quiebra Total'
    ),
    (
        'DOOM',
        'imagenes/eduinos/eduino_icono/DOOM.png',
        'imagenes/eduinos/eduino_foto/DOOM.png',
        '???',
        'Hierro',
        110,
        100,
        'Puño de Hierro',
        'Mirada Dorada',
        'Manto Oscuro',
        'Golpe del Destino',
        'Sentencia Final'
    ),
    (
        'Drilax',
        'imagenes/eduinos/eduino_icono/Drilax.png',
        'imagenes/eduinos/eduino_foto/Drilax.png',
        '???',
        'Agua',
        80,
        85,
        'Torbellino Marino',
        'Aletazo Acuático',
        'Brújula del Caos',
        'Corriente Submarina',
        'Maelstrom Profundo'
    ),
    (
        'Faryn',
        'imagenes/eduinos/eduino_icono/Faryn.png',
        'imagenes/eduinos/eduino_foto/Faryn.png',
        '???',
        'Ada',
        70,
        65,
        'Patada Suave',
        'Pestañeo Hipnótico',
        'Salto Esmeralda',
        'Cola de Terciopelo',
        'Tormenta de Ternura'
    ),
    (
        'Fayra',
        'imagenes/eduinos/eduino_icono/Fayra.png',
        'imagenes/eduinos/eduino_foto/Fayra.png',
        '???',
        'Hierro',
        95,
        80,
        'Láser Azul',
        'Puño Robótico',
        'Escudo de Datos',
        'Señal de Bloqueo',
        'Protocolo Extremo'
    ),
    (
        'Felinor',
        'imagenes/eduinos/eduino_icono/Felinor.png',
        'imagenes/eduinos/eduino_foto/Felinor.png',
        '???',
        'Hierro',
        90,
        88,
        'Barrilazo',
        'Zarpazo Felino',
        'Explosión Enlatada',
        'Rugido Metálico',
        'Cañonazo Gatuno'
    ),
    (
        'Glayro',
        'imagenes/eduinos/eduino_icono/Glayro.png',
        'imagenes/eduinos/eduino_foto/Glayro.png',
        '???',
        'Hielo',
        80,
        85,
        'Mirada Hipnótica',
        'Cristal Helado',
        'Aura de Hielo',
        'Golpe Congelante',
        'Glaciar Celestial'
    ),
    (
        'Glimi',
        'imagenes/eduinos/eduino_icono/Glimi.png',
        'imagenes/eduinos/eduino_foto/Glimi.png',
        '???',
        'Ada',
        70,
        70,
        'Abanico Arcoíris',
        'Paso de Kimono',
        'Lluvia de Estrellas',
        'Magia Pop',
        'Explosión Kawaii'
    ),
    (
        'KANYE',
        'imagenes/eduinos/eduino_icono/KANYE.png',
        'imagenes/eduinos/eduino_foto/KANYE.png',
        '???',
        'Ada',
        85,
        75,
        'Collar Dorado',
        'Zapatilla Voladora',
        'Mirada Psicodélica',
        'Drop del Oso',
        'Golpe Legendario'
    ),
    (
        'Kuro',
        'imagenes/eduinos/eduino_icono/Kuro.png',
        'imagenes/eduinos/eduino_foto/Kuro.png',
        '???',
        'Siniestro',
        80,
        85,
        'Saqueo Ninja',
        'Manotazo Siniestro',
        'Espiral Maldita',
        'Trampa del Dinero',
        'Robo Supremo'
    ),
    (
        'Luma',
        'imagenes/eduinos/eduino_icono/Luma.png',
        'imagenes/eduinos/eduino_foto/Luma.png',
        '???',
        'Ada',
        75,
        72,
        'Campana del Trueno',
        'Golpe de Manga',
        'Ola Dorada',
        'Danza del Kimono',
        'Ritual Sagrado'
    ),
    (
        'Lumer',
        'imagenes/eduinos/eduino_icono/Lumer.png',
        'imagenes/eduinos/eduino_foto/Lumer.png',
        '???',
        'Agua',
        85,
        75,
        'Lengüetazo',
        'Aleteo Mojado',
        'Antena Eléctrica',
        'Salpicón',
        'Diluvio Peludo'
    ),
    (
        'Lumis',
        'imagenes/eduinos/eduino_icono/Lumis.png',
        'imagenes/eduinos/eduino_foto/Lumis.png',
        '???',
        'Oscuridad',
        80,
        82,
        'Carta Holográfica',
        'Zarpazo Neón',
        'Destello Digital',
        'Patada Cyber',
        'Glitch Total'
    ),
    (
        'Lunox',
        'imagenes/eduinos/eduino_icono/Lunox.png',
        'imagenes/eduinos/eduino_foto/Lunox.png',
        '???',
        'Oscuridad',
        85,
        80,
        'Patada Estelar',
        'Oreja Afilada',
        'Oscuridad Estelar',
        'Salto Lunar',
        'Nova Oscura'
    ),
    (
        'Miril',
        'imagenes/eduinos/eduino_icono/Miril.png',
        'imagenes/eduinos/eduino_foto/Miril.png',
        '???',
        'Ada',
        65,
        75,
        'Polvo de Hada',
        'Aleteo Mágico',
        'Espiral Dorada',
        'Danza de Patrones',
        'Transformación Etérea'
    ),
    (
        'Miruki',
        'imagenes/eduinos/eduino_icono/Miruki.png',
        'imagenes/eduinos/eduino_foto/Miruki.png',
        '???',
        'Fuego',
        80,
        90,
        'Espadazo Flamante',
        'Picotazo Ardiente',
        'Cresta de Fuego',
        'Corte del Polluelo',
        'Tajo del Fénix'
    ),
    (
        'Nexor',
        'imagenes/eduinos/eduino_icono/Nexor.png',
        'imagenes/eduinos/eduino_foto/Nexor.png',
        '???',
        'Hierro',
        95,
        92,
        'Garra Cibernética',
        'Cohete Felino',
        'Escáner de Combate',
        'Zarpado Mecánico',
        'Protocolo Bestia'
    ),
    (
        'Nira',
        'imagenes/eduinos/eduino_icono/Nira.png',
        'imagenes/eduinos/eduino_foto/Nira.png',
        '???',
        'Ada',
        70,
        68,
        'Arcoíris Explosivo',
        'Llama Rosa',
        'Ratón Volador',
        'Patada de Colores',
        'Tormenta Arcoíris'
    ),
    (
        'Noctra',
        'imagenes/eduinos/eduino_icono/Noctra.png',
        'imagenes/eduinos/eduino_foto/Noctra.png',
        '???',
        'Oscuridad',
        95,
        95,
        'Llama Verde Maldita',
        'Zarpa de las Sombras',
        'Manto Demoníaco',
        'Rugido del Abismo',
        'Extinción Oscura'
    ),
    (
        'Noxir',
        'imagenes/eduinos/eduino_icono/Noxir.png',
        'imagenes/eduinos/eduino_foto/Noxir.png',
        '???',
        'Ada',
        78,
        85,
        'Lanzada de Rayo',
        'Gancho del Osito',
        'Trueno Aventurero',
        'Escudo Eléctrico',
        'Tormenta del Guerrero'
    ),
    (
        'Oualid',
        'imagenes/eduinos/eduino_icono/Oualid.png',
        'imagenes/eduinos/eduino_foto/Oualid.png',
        '???',
        'Hielo',
        115,
        90,
        'Abrazo del Yeti',
        'Cornada Helada',
        'Rugido Ártico',
        'Pisotón de Nieve',
        'Ventisca del Himalaya'
    ),
    -- (
    --     'Phasor',
    --     'imagenes/eduinos/eduino_icono/Phasor.png',
    --     'imagenes/eduinos/eduino_foto/Phasor.png',
    --     '???',
    --     'Fantasma',
    --     65, 70,
    --     'Trompa Fantasmal',
    --     'Vapor Espectral',
    --     'Sorbo Maldito',
    --     'Tazazo',
    --     'Vertido del Más Allá'
    -- ),
    (
        'Pixi',
        'imagenes/eduinos/eduino_icono/Pixi.png',
        'imagenes/eduinos/eduino_foto/Pixi.png',
        '???',
        'Hierro',
        88,
        87,
        'Cañonazo Azul',
        'Lazo Robótico',
        'Tiro de Precisión',
        'Patada Mecánica',
        'Explosión de Píxeles'
    ),
    (
        'Rexil',
        'imagenes/eduinos/eduino_icono/Rexil.png',
        'imagenes/eduinos/eduino_foto/Rexil.png',
        '???',
        'Dinosaurio',
        120,
        105,
        'Mordisco Descosido',
        'Zarpazo Rosado',
        'Cremallera Mortal',
        'Pisotón Prehistórico',
        'Rugido del Caos'
    ),
    (
        'Rocor',
        'imagenes/eduinos/eduino_icono/Rocor.png',
        'imagenes/eduinos/eduino_foto/Rocor.png',
        '???',
        'Tierra',
        125,
        95,
        'Puño de Tótem',
        'Bloque Aplastante',
        'Cornada Triple',
        'Avalancha de Piedras',
        'Derrumbe Total'
    ),
    (
        'Rygor',
        'imagenes/eduinos/eduino_icono/Rygor.png',
        'imagenes/eduinos/eduino_foto/Rygor.png',
        '???',
        'Dragon',
        130,
        110,
        'Aliento de Dragón',
        'Zarpazo Escamoso',
        'Cola Demoledora',
        'Cornada Roja',
        'Furia del Dragón Antiguo'
    ),
    -- (
    --     'Saito',
    --     'imagenes/eduinos/eduino_icono/Saito.png',
    --     'imagenes/eduinos/eduino_foto/Saito.png',
    --     '???',
    --     'Fuego',
    --     95, 100,
    --     'Corte Lunar',
    --     'Tajo Samurái',
    --     'Escudo de Llamas',
    --     'Puño del Guerrero Rojo',
    --     'Mil Cortes de Fuego'
    -- ),
    (
        'Shadeo',
        'imagenes/eduinos/eduino_icono/Shadeo.png',
        'imagenes/eduinos/eduino_foto/Shadeo.png',
        '???',
        'Fantasma',
        70,
        75,
        'Ojo Espía',
        'Toque Helado',
        'Risa del Fantasma',
        'Baba Espectral',
        'Lluvia de Globos Oculares'
    ),
    -- (
    --     'Specto',
    --     'imagenes/eduinos/eduino_icono/Specto.png',
    --     'imagenes/eduinos/eduino_foto/Specto.png',
    --     '???',
    --     'Fantasma',
    --     68, 72,
    --     'Mirada Espiral',
    --     'Envoltorio Mortal',
    --     'Susurro del Más Allá',
    --     'Flotada Aterradora',
    --     'Posesión Total'
    -- ),
    (
        'Spina',
        'imagenes/eduinos/eduino_icono/Spina.png',
        'imagenes/eduinos/eduino_foto/Spina.png',
        '???',
        'Planta',
        90,
        78,
        'Pinchazo de Cactus',
        'Pétalos Cortantes',
        'Raíz Enredadora',
        'Polen Tóxico',
        'Espinas Infinitas'
    ),
    (
        'Stono',
        'imagenes/eduinos/eduino_icono/Stono.png',
        'imagenes/eduinos/eduino_foto/Stono.png',
        '???',
        'Fuego',
        105,
        88,
        'Roca Incandescente',
        'Caparazón Volcánico',
        'Pisotón de Lava',
        'Mordisco Ardiente',
        'Erupción del Titán'
    ),
    (
        'Tekro',
        'imagenes/eduinos/eduino_icono/Tekro.png',
        'imagenes/eduinos/eduino_foto/Tekro.png',
        '???',
        'Oscuridad',
        88,
        98,
        'Tajo de Energía',
        'Paso del Ninja',
        'Escudo Digital',
        'Golpe Oscuro',
        'Corte del Vacío'
    ),
    (
        'Vayro',
        'imagenes/eduinos/eduino_icono/Vayro.png',
        'imagenes/eduinos/eduino_foto/Vayro.png',
        '???',
        'Volador',
        72,
        78,
        'Picotazo Nocturno',
        'Aletazo del Búho',
        'Giro Rasante',
        'Visión Cruzada',
        'Ataque en Picado'
    ),
    (
        'Velix',
        'imagenes/eduinos/eduino_icono/Velix.png',
        'imagenes/eduinos/eduino_foto/Velix.png',
        '???',
        'Oscuridad',
        82,
        83,
        'Puñetazo de Guante',
        'Zarpazo Violeta',
        'Sonrisa Maldita',
        'Cola Demoníaca',
        'Golpe de la Oscuridad Felina'
    ),
    (
        'Vorn',
        'imagenes/eduinos/eduino_icono/Vorn.png',
        'imagenes/eduinos/eduino_foto/Vorn.png',
        '???',
        'Oscuridad',
        78,
        76,
        'Truco del Bufón',
        'Confeti Maldito',
        'Cabezazo de Payaso',
        'Risa del Caos',
        'Gran Espectáculo Oscuro'
    )
    -- ,
    -- (
    --     'Zark',
    --     'imagenes/eduinos/eduino_icono/Zark.png',
    --     'imagenes/eduinos/eduino_foto/Zark.png',
    --     '???',
    --     'Oscuridad',
    --     88, 90,
    --     'Puño del Coraje',
    --     'Kanji Aplastante',
    --     'Abrazo Oscuro',
    --     'Explosión Púrpura',
    --     'Fuerza del Kanji Sagrado'
    -- )
;

INSERT INTO
    eduinos (
        nombre,
        imagen_perfil,
        imagen_eduino,
        descripcion,
        tipo,
        vida,
        fuerza,
        ataque1,
        ataque2,
        ataque3,
        ataque4,
        super_ataque
    )
VALUES (
        'Blix',
        'imagenes/eduinos/eduino_icono/Blix.png',
        'imagenes/eduinos/eduino_foto/Blix.png',
        '???',
        'Fuego',
        95,
        100,
        'Jab Explosivo',
        'Cabezazo de Bomba',
        'Gancho Incendiario',
        'Detonación en Cadena',
        'Explosión Brutal'
    ),
    (
        'Brea',
        'imagenes/eduinos/eduino_icono/Brea.png',
        'imagenes/eduinos/eduino_foto/Brea.png',
        '???',
        'Magia',
        75,
        88,
        'Palmada Mística',
        'Llama Espiritual',
        'Aura Coral',
        'Bendición Ardiente',
        'Ritual Primordial'
    ),
    (
        'Bubi',
        'imagenes/eduinos/eduino_icono/Bubi.png',
        'imagenes/eduinos/eduino_foto/Bubi.png',
        '???',
        'Hielo',
        100,
        95,
        'Mordisco Glacial',
        'Zarpazo Azul',
        'Espina de Hielo',
        'Aliento Helado',
        'Tormenta de Cristal'
    ),
    (
        'Clank',
        'imagenes/eduinos/eduino_icono/Clank.png',
        'imagenes/eduinos/eduino_foto/Clank.png',
        '???',
        'Hierro',
        120,
        105,
        'Cañonazo Doble',
        'Escudo Blindado',
        'Disparo de Mortero',
        'Rueda Aplastante',
        'Bombardeo Masivo'
    ),
    (
        'Eko',
        'imagenes/eduinos/eduino_icono/Eko.png',
        'imagenes/eduinos/eduino_foto/Eko.png',
        '???',
        'Oscuridad',
        78,
        87,
        'Cubo Maldito',
        'Zarpa Digital',
        'Glitch Oscuro',
        'Pulso de Sombra',
        'Colapso del Sistema'
    ),
    (
        'Hex',
        'imagenes/eduinos/eduino_icono/Hex.png',
        'imagenes/eduinos/eduino_foto/Hex.png',
        '???',
        'Siniestro',
        85,
        92,
        'Zarpazo Silencioso',
        'Tajo de la Sombra',
        'Capa de Invisibilidad',
        'Ojo Neón',
        'Golpe del Vacío'
    ),
    (
        'Kora',
        'imagenes/eduinos/eduino_icono/Kora.png',
        'imagenes/eduinos/eduino_foto/Kora.png',
        '???',
        'Agua',
        105,
        98,
        'Mordisco de Tiburón',
        'Aletazo Oceánico',
        'Apertura de Cremallera',
        'Corriente del Abismo',
        'Furia del Tiburón'
    ),
    (
        'Liri',
        'imagenes/eduinos/eduino_icono/Liri.png',
        'imagenes/eduinos/eduino_foto/Liri.png',
        '???',
        'Ada',
        65,
        65,
        'Bofetada de Conejita',
        'Lazo Mágico',
        'Salto Rosado',
        'Abrazo Explosivo',
        'Tormenta de Lazos'
    ),
    (
        'Mori',
        'imagenes/eduinos/eduino_icono/Mori.png',
        'imagenes/eduinos/eduino_foto/Mori.png',
        '???',
        'Siniestro',
        80,
        78,
        'Tiro de Dado',
        'Golpe del Azar',
        'Manto Demoniaco',
        'Apuesta del Destino',
        'Gran Lotería Oscura'
    ),
    (
        'Moss',
        'imagenes/eduinos/eduino_icono/Moss.png',
        'imagenes/eduinos/eduino_foto/Moss.png',
        '???',
        'Fantasma',
        82,
        80,
        'Remolino Oscuro',
        'Zarpa de Raíz',
        'Risa Espectral',
        'Espíritu del Bosque',
        'Tormenta Maldita'
    ),
    (
        'Nexo',
        'imagenes/eduinos/eduino_icono/Nexo.png',
        'imagenes/eduinos/eduino_foto/Nexo.png',
        '???',
        'Hierro',
        95,
        98,
        'Puño de Plasma',
        'Cañón de Energía',
        'Escudo Meca',
        'Vuelo de Asalto',
        'Protocolo Nexo'
    ),
    (
        'Nox',
        'imagenes/eduinos/eduino_icono/Nox.png',
        'imagenes/eduinos/eduino_foto/Nox.png',
        '???',
        'Fantasma',
        70,
        72,
        'Pócima Espectral',
        'Maullido Helado',
        'Burbuja de Caldero',
        'Veneno Fantasmal',
        'Explosión de Caldero'
    ),
    (
        'Nyx',
        'imagenes/eduinos/eduino_icono/Nyx.png',
        'imagenes/eduinos/eduino_foto/Nyx.png',
        '???',
        'Oscuridad',
        72,
        80,
        'Varita Nocturna',
        'Mariposa Maldita',
        'Salto de Sombra',
        'Toque Oscuro',
        'Noche Eterna'
    ),
    (
        'Pixora',
        'imagenes/eduinos/eduino_icono/Pixora.png',
        'imagenes/eduinos/eduino_foto/Pixora.png',
        '???',
        'Ada',
        68,
        70,
        'Estrella Violeta',
        'Patada Brillante',
        'Magia de Gatita',
        'Arcoíris Lila',
        'Lluvia de Estrellas'
    ),
    (
        'Sear',
        'imagenes/eduinos/eduino_icono/Sear.png',
        'imagenes/eduinos/eduino_foto/Sear.png',
        '???',
        'Fuego',
        90,
        95,
        'Puñetazo Rojo',
        'Capa Ardiente',
        'Visera Láser',
        'Gancho Héroe',
        'Explosión de Héroe'
    ),
    (
        'Skye',
        'imagenes/eduinos/eduino_icono/Skye.png',
        'imagenes/eduinos/eduino_foto/Skye.png',
        '???',
        'Hierro',
        88,
        85,
        'Cohete de Bota',
        'Puñetazo Azul',
        'Escudo Robótico',
        'Disparo de Tobillo',
        'Misión Orbital'
    ),
    (
        'Sora',
        'imagenes/eduinos/eduino_icono/Sora.png',
        'imagenes/eduinos/eduino_foto/Sora.png',
        '???',
        'Siniestro',
        75,
        82,
        'Abrazo Maldito',
        'Puntada Mortal',
        'Cremallera del Silencio',
        'Relleno Oscuro',
        'Muñeca Infinita'
    ),
    (
        'Tox',
        'imagenes/eduinos/eduino_icono/Tox.png',
        'imagenes/eduinos/eduino_foto/Tox.png',
        '???',
        'Siniestro',
        78,
        85,
        'Nube Tóxica',
        'Mirada Triple',
        'Garra del Alquimista',
        'Veneno Oscuro',
        'Plaga Total'
    ),
    (
        'Trix',
        'imagenes/eduinos/eduino_icono/Trix.png',
        'imagenes/eduinos/eduino_foto/Trix.png',
        '???',
        'Alien',
        80,
        75,
        'Señal Alienígena',
        'Manotazo Verde',
        'Comunicado Galáctico',
        'Onda Cósmica',
        'Invasión Estelar'
    ),
    (
        'Tron',
        'imagenes/eduinos/eduino_icono/Tron.png',
        'imagenes/eduinos/eduino_foto/Tron.png',
        '???',
        'Hierro',
        92,
        96,
        'Disparo Estelar',
        'Puño Robótico',
        'Escudo de Estrella',
        'Patada Mecánica',
        'Bombardeo Estelar'
    ),
    (
        'Umbra',
        'imagenes/eduinos/eduino_icono/Umbra.png',
        'imagenes/eduinos/eduino_foto/Umbra.png',
        '???',
        'Magia',
        80,
        75,
        'Llama Rosada',
        'Ojo Mágico',
        'Concha Protectora',
        'Toque Encantado',
        'Destello Divino'
    ),
    (
        'Vant',
        'imagenes/eduinos/eduino_icono/Vant.png',
        'imagenes/eduinos/eduino_foto/Vant.png',
        '???',
        'Oscuridad',
        88,
        90,
        'Mirada del Único Ojo',
        'Golpe de Abrigo',
        'Susurro Oscuro',
        'Marca de la Sombra',
        'Visión Total'
    ),
    (
        'Velox',
        'imagenes/eduinos/eduino_icono/Velox.png',
        'imagenes/eduinos/eduino_foto/Velox.png',
        '???',
        'Hierro',
        110,
        102,
        'Lanza de Caballero',
        'Carga de Cornada',
        'Escudo Mecánico',
        'Espadazo Blanco',
        'Tormenta de Acero'
    ),
    (
        'Veno',
        'imagenes/eduinos/eduino_icono/Veno.png',
        'imagenes/eduinos/eduino_foto/Veno.png',
        '???',
        'Planta',
        75,
        72,
        'Tentáculo Baboso',
        'Mirada de Slime',
        'Charco Tóxico',
        'Ataque de Algas',
        'Inundación Verde'
    ),
    (
        'Volt',
        'imagenes/eduinos/eduino_icono/Volt.png',
        'imagenes/eduinos/eduino_foto/Volt.png',
        '???',
        'Hierro',
        100,
        108,
        'Puñetazo de Hierro',
        'Espina Metálica',
        'Carga de Energía',
        'Combo Rojo',
        'Explosión Roja'
    ),
    (
        'Vulk',
        'imagenes/eduinos/eduino_icono/Vulk.png',
        'imagenes/eduinos/eduino_foto/Vulk.png',
        '???',
        'Fuego',
        95,
        95,
        'Pantalla de Fuego',
        'Puño Incendiario',
        'Señal de Lava',
        'Onda de Calor',
        'Erupción de Datos'
    ),
    (
        'Wiwi',
        'imagenes/eduinos/eduino_icono/Wiwi.png',
        'imagenes/eduinos/eduino_foto/Wiwi.png',
        '???',
        'Oscuridad',
        85,
        88,
        'Zarpa Vampírica',
        'Mirada Carmesí',
        'Capa del Abismo',
        'Toque Oscuro',
        'Noche del Vampiro'
    ),
    (
        'Zeni',
        'imagenes/eduinos/eduino_icono/Zeni.png',
        'imagenes/eduinos/eduino_foto/Zeni.png',
        '???',
        'Siniestro',
        90,
        95,
        'Golpe de Shinai',
        'Zarpa del Samurái',
        'Máscara del Guerrero',
        'Patada de Dojo',
        'Corte del Clan'
    ),
    (
        'Zyn',
        'imagenes/eduinos/eduino_icono/Zyn.png',
        'imagenes/eduinos/eduino_foto/Zyn.png',
        '???',
        'Alien',
        78,
        75,
        'Onda Sónica',
        'Manotazo Alien',
        'Señal Extraterrestre',
        'Ritmo del Cosmos',
        'Transmisión Final'
    ),
    (
        'Tug Tug Tug',
        'imagenes/eduinos/eduino_icono/Tug Tug Tug.png',
        'imagenes/eduinos/eduino_foto/Tug Tug Tug.png',
        '???',
        'Planta',
        110,
        85,
        'Golpe de Tronco',
        'Sacudida de Leño',
        'Madera Aplastante',
        'Raíz Profunda',
        'Avalancha de Madera'
    ),
    (
        'Crag',
        'imagenes/eduinos/eduino_icono/Crag.png',
        'imagenes/eduinos/eduino_foto/Crag.png',
        '???',
        'Fuego',
        120,
        90,
        'Puño de fuego',
        'Cornada Pétrea',
        'Aplastamiento',
        'Escombros Voladores',
        'Terremoto Total'
    ),
    (
        'Ferrash',
        'imagenes/eduinos/eduino_icono/Ferrash.png',
        'imagenes/eduinos/eduino_foto/Ferrash.png',
        '???',
        'Tierra',
        95,
        95,
        'Filo Metálico',
        'Escudo de Acero',
        'Carga Ferrosa',
        'Golpe Blindado',
        'Tempestad de roca'
    ),
    (
        'Kaid',
        'imagenes/eduinos/eduino_icono/Kaid.png',
        'imagenes/eduinos/eduino_foto/Kaid.png',
        '???',
        'Siniestro',
        85,
        92,
        'Estrategia Oscura',
        'Golpe Preciso',
        'Trampa Mortal',
        'Puño del Líder',
        'Maniobra Suprema'
    ),
    (
        'Mord',
        'imagenes/eduinos/eduino_icono/Mord.png',
        'imagenes/eduinos/eduino_foto/Mord.png',
        '???',
        'Fuego',
        88,
        95,
        'Garra fuego',
        'Mordida Siniestra',
        'Sombra Afilada',
        'Aullido del Abismo',
        'Devastación ardiente'
    ),
    (
        'Nelt',
        'imagenes/eduinos/eduino_icono/Nelt.png',
        'imagenes/eduinos/eduino_foto/Nelt.png',
        '???',
        'Ada',
        72,
        78,
        'Destello Etéreo',
        'Toque Suave',
        'Onda Arcana',
        'Aleteo Mágico',
        'Tormenta Etérea'
    ),
    (
        'Orv',
        'imagenes/eduinos/eduino_icono/Orv.png',
        'imagenes/eduinos/eduino_foto/Orv.png',
        '???',
        'Siniestro',
        80,
        88,
        'Zarpada Siniestra',
        'Golpe Sorpresa',
        'Veneno Oculto',
        'Tajo Rápido',
        'Golpe del Traidor'
    ),
    (
        'Stellix',
        'imagenes/eduinos/eduino_icono/Stellix.png',
        'imagenes/eduinos/eduino_foto/Stellix.png',
        '???',
        'Alien',
        82,
        80,
        'Rayo Estelar',
        'Onda Cósmica',
        'Señal Galáctica',
        'Manotazo Alienígena',
        'Colapso Estelar'
    ),
    (
        'TEYLOR',
        'imagenes/eduinos/eduino_icono/TEYLOR.png',
        'imagenes/eduinos/eduino_foto/TEYLOR.png',
        '???',
        'Ada',
        80,
        72,
        'Nota Explosiva',
        'Micrófono Volador',
        'Hit del Año',
        'Gira Mundial',
        'Concierto del Fin del Mundo'
    ),
    (
        'UZI',
        'imagenes/eduinos/eduino_icono/UZI.png',
        'imagenes/eduinos/eduino_foto/UZI.png',
        '???',
        'Hierro',
        78,
        100,
        'Ráfaga Metálica',
        'Disparo Rápido',
        'Cargador Infinito',
        'Rebote de Bala',
        'Diluvio de Proyectiles'
    ),
    (
        'Zek',
        'imagenes/eduinos/eduino_icono/Zek.png',
        'imagenes/eduinos/eduino_foto/Zek.png',
        '???',
        'Oscuridad',
        85,
        90,
        'Zarpa Oscura',
        'Mordida del Abismo',
        'Giro Maldito',
        'Golpe Sombrío',
        'Furia del Vacío'
    ),
    (
        'Brion',
        'imagenes/eduinos/eduino_icono/Brion.png',
        'imagenes/eduinos/eduino_foto/Brion.png',
        '???',
        'Oscuridad',
        105,
        95,
        'Golpe del Bruto',
        'Carga Blindada',
        'Puño Pétreo',
        'Escudo Roto',
        'Tormenta del Guerrero'
    ),
    (
        'Cyrik',
        'imagenes/eduinos/eduino_icono/Cyrik.png',
        'imagenes/eduinos/eduino_foto/Cyrik.png',
        '???',
        'Hierro',
        88,
        92,
        'Corte Cibernético',
        'Pulso Digital',
        'Escáner Oscuro',
        'Zarpada de Datos',
        'Protocolo Cyrik'
    ),
    (
        'Helor',
        'imagenes/eduinos/eduino_icono/Helor.png',
        'imagenes/eduinos/eduino_foto/Helor.png',
        '???',
        'Ada',
        80,
        78,
        'Destello Solar',
        'Onda de Luz',
        'Rayo Dorado',
        'Golpe Brillante',
        'Explosión Estelar'
    ),
    (
        'Kelmi',
        'imagenes/eduinos/eduino_icono/Kelmi.png',
        'imagenes/eduinos/eduino_foto/Kelmi.png',
        '???',
        'Siniestro',
        70,
        72,
        'Mordisquito Rápido',
        'Patadita Ágil',
        'Salto Acrobático',
        'Giro Veloz',
        'Torbellino Relámpago'
    ),
    (
        'Kelon',
        'imagenes/eduinos/eduino_icono/Kelon.png',
        'imagenes/eduinos/eduino_foto/Kelon.png',
        '???',
        'Dragon',
        95,
        88,
        'Golpe de Volcán',
        'Escudo de Roca',
        'Puñetazo Sísmico',
        'Cornada Dura',
        'Erupción del Titán'
    ),
    (
        'Kelos',
        'imagenes/eduinos/eduino_icono/Kelos.png',
        'imagenes/eduinos/eduino_foto/Kelos.png',
        '???',
        'Tierra',
        90,
        85,
        'Zarpazo Oscuro',
        'Tajo Nocturno',
        'Escudo de Sombra',
        'Ataque Veloz',
        'Golpe del Abismo'
    ),
    (
        'Kiki',
        'imagenes/eduinos/eduino_icono/Kiki.png',
        'imagenes/eduinos/eduino_foto/Kiki.png',
        '???',
        'Ada',
        65,
        68,
        'Abrazo Eléctrico',
        'Patadita Chispeante',
        'Salto Adorable',
        'Picadura Rápida',
        'Tormenta de Ternura'
    ),
    (
        'Lunek',
        'imagenes/eduinos/eduino_icono/Lunek.png',
        'imagenes/eduinos/eduino_foto/Lunek.png',
        '???',
        'Oscuridad',
        75,
        80,
        'Rayo Lunar',
        'Patada Nocturna',
        'Aura de Luna',
        'Golpe Estelar',
        'Eclipse Total'
    ),
    (
        'Lurix',
        'imagenes/eduinos/eduino_icono/Lurix.png',
        'imagenes/eduinos/eduino_foto/Lurix.png',
        '???',
        'Fuego',
        78,
        82,
        'Corte de Luna',
        'Zarpa Plateada',
        'Salto Lunar',
        'Onda de Plata',
        'Tormenta Lunar'
    ),
    (
        'Narek',
        'imagenes/eduinos/eduino_icono/Narek.png',
        'imagenes/eduinos/eduino_foto/Narek.png',
        '???',
        'Ada',
        100,
        98,
        'Puño del Norte',
        'Carga Ártica',
        'Cornada Helada',
        'Golpe del Glaciar',
        'Tormenta del Norte'
    ),
    (
        'Nixu',
        'imagenes/eduinos/eduino_icono/Nixu.png',
        'imagenes/eduinos/eduino_foto/Nixu.png',
        '???',
        'Agua',
        80,
        85,
        'Tajo Digital',
        'Pulso Oscuro',
        'Ataque de Sombra',
        'Zarpa Neón',
        'Colapso del Sistema'
    ),
    (
        'Noro',
        'imagenes/eduinos/eduino_icono/Noro.png',
        'imagenes/eduinos/eduino_foto/Noro.png',
        '???',
        'Magia',
        82,
        80,
        'Golpe Arcano',
        'Destello Mágico',
        'Onda Espiritual',
        'Toque Encantado',
        'Explosión Arcana'
    ),
    (
        'Noryx',
        'imagenes/eduinos/eduino_icono/Noryx.png',
        'imagenes/eduinos/eduino_foto/Noryx.png',
        '???',
        'Oscuridad',
        85,
        88,
        'Zarpa Sombría',
        'Tajo Oscuro',
        'Golpe del Abismo',
        'Onda Maldita',
        'Oscuridad Total'
    ),
    (
        'Ralor',
        'imagenes/eduinos/eduino_icono/Ralor.png',
        'imagenes/eduinos/eduino_foto/Ralor.png',
        '???',
        'Dragon',
        90,
        92,
        'Llama Furiosa',
        'Golpe Incendiario',
        'Carga Ardiente',
        'Puño de Fuego',
        'Inferno Total'
    ),
    (
        'Rovik',
        'imagenes/eduinos/eduino_icono/Rovik.png',
        'imagenes/eduinos/eduino_foto/Rovik.png',
        '???',
        'Dragon',
        98,
        95,
        'Disparo Mecánico',
        'Puño de Acero',
        'Cañonazo',
        'Escudo Blindado',
        'Protocolo de Asalto'
    ),
    (
        'Ryno',
        'imagenes/eduinos/eduino_icono/Ryno.png',
        'imagenes/eduinos/eduino_foto/Ryno.png',
        '???',
        'Fantasma',
        120,
        100,
        'Carga del Rinoceronte',
        'Cornada Brutal',
        'Pisotón Devastador',
        'Golpe de Cuerno',
        'Estampida Total'
    ),
    (
        'Tavik',
        'imagenes/eduinos/eduino_icono/Tavik.png',
        'imagenes/eduinos/eduino_foto/Tavik.png',
        '???',
        'Hierro',
        85,
        90,
        'Estrategia Ofensiva',
        'Golpe Calculado',
        'Trampa Táctica',
        'Puñetazo Preciso',
        'Operación Final'
    ),
    (
        'Valto',
        'imagenes/eduinos/eduino_icono/Valto.png',
        'imagenes/eduinos/eduino_foto/Valto.png',
        '???',
        'Siniestro',
        100,
        92,
        'Espadazo Noble',
        'Escudo Real',
        'Carga del Paladín',
        'Golpe Sagrado',
        'Sentencia del Héroe'
    ),
    (
        'Veyra',
        'imagenes/eduinos/eduino_icono/Veyra.png',
        'imagenes/eduinos/eduino_foto/Veyra.png',
        '???',
        'Planta',
        72,
        75,
        'Aleteo Mágico',
        'Destello Rosado',
        'Patada de Hada',
        'Onda Encantada',
        'Tormenta de Magia'
    ),
    (
        'Vinta',
        'imagenes/eduinos/eduino_icono/Vinta.png',
        'imagenes/eduinos/eduino_foto/Vinta.png',
        '???',
        'Hierro',
        85,
        78,
        'Enredadera Venenosa',
        'Espina Afilada',
        'Zarpa de Hiedra',
        'Polen Tóxico',
        'Jungla Desatada'
    ),
    (
        'Viro',
        'imagenes/eduinos/eduino_icono/Viro.png',
        'imagenes/eduinos/eduino_foto/Viro.png',
        '???',
        'Hierro',
        75,
        88,
        'Zarpa Veloz',
        'Tajo Rápido',
        'Golpe Viral',
        'Patada Ágil',
        'Explosión Vírica'
    ),
    (
        'Volen',
        'imagenes/eduinos/eduino_icono/Volen.png',
        'imagenes/eduinos/eduino_foto/Volen.png',
        '???',
        'Fantasma',
        95,
        98,
        'Descarga Eléctrica',
        'Rayo Poderoso',
        'Puño de Voltios',
        'Carga Eléctrica',
        'Tormenta de Rayos'
    ),
    (
        'Wissal',
        'imagenes/eduinos/eduino_icono/Wissal.png',
        'imagenes/eduinos/eduino_foto/Wissal.png',
        '???',
        'Ada',
        78,
        80,
        'Golpe Sereno',
        'Patada Elegante',
        'Aura Tranquila',
        'Toque Preciso',
        'Armonía Total'
    ),
    (
        'Yumi',
        'imagenes/eduinos/eduino_icono/Yumi.png',
        'imagenes/eduinos/eduino_foto/Yumi.png',
        '???',
        'Fantasma',
        68,
        70,
        'Flechazo Ágil',
        'Salto Arcoíris',
        'Tiro Preciso',
        'Danza del Arco',
        'Lluvia de Flechas'
    ),
    (
        'Zorin',
        'imagenes/eduinos/eduino_icono/Zorin.png',
        'imagenes/eduinos/eduino_foto/Zorin.png',
        '???',
        'Oscuridad',
        90,
        95,
        'Zarpa del Caos',
        'Golpe Sombrío',
        'Onda Oscura',
        'Tajo Maldito',
        'Apocalipsis Oscuro'
    ),
    (
        'Zumi',
        'imagenes/eduinos/eduino_icono/Zumi.png',
        'imagenes/eduinos/eduino_foto/Zumi.png',
        '???',
        'Fantasma',
        70,
        75,
        'Mordisco Rápido',
        'Golpe Veloz',
        'Esquiva Ágil',
        'Zarpa Pequeña',
        'Torbellino Caótico'
    ),
    (
        'Zylo',
        'imagenes/eduinos/eduino_icono/Zylo.png',
        'imagenes/eduinos/eduino_foto/Zylo.png',
        '???',
        'Hierro',
        82,
        86,
        'Rayo Eléctrico',
        'Chispa de Energía',
        'Giro Electrizado',
        'Patada de Voltaje',
        'Tormenta Eléctrica'
    );

INSERT INTO
    comida (
        nombre,
        imagen_perfil,
        descripcion,
        precio,
        alimentacion
    )
VALUES (
        'EduChuche',
        'imagenes/eduinos/eduino_objetos/EduFood/EduChuche.png',
        'Una bolsita de chuches dulces. Llena un poquito el estómago de tu Eduino.',
        10,
        10
    ),
    (
        'EduFresa',
        'imagenes/eduinos/eduino_objetos/EduFood/EduFresa.png',
        'Una fresa fresquita y jugosa. Pequeño pero sabroso tentempié.',
        15,
        18
    ),
    (
        'EduBaya',
        'imagenes/eduinos/eduino_objetos/EduFood/EduBaya.png',
        'Un puñado de bayas silvestres llenas de energía natural.',
        20,
        25
    ),
    (
        'EduMandarina',
        'imagenes/eduinos/eduino_objetos/EduFood/EduMandarina.png',
        'Una mandarina bien madura. Vitaminas para aguantar el día de estudio.',
        25,
        32
    ),
    (
        'EduPiña',
        'imagenes/eduinos/eduino_objetos/EduFood/EduPiña.png',
        'Una rodaja de piña tropical. Refrescante y muy nutritiva.',
        35,
        45
    ),
    (
        'EduRay',
        'imagenes/eduinos/eduino_objetos/EduFood/EduRay.png',
        'Un rayo de energía pura. Carga a tu Eduino al instante.',
        50,
        60
    ),
    (
        'EduPoti',
        'imagenes/eduinos/eduino_objetos/EduFood/EduPoti.png',
        'Una poción especial llena de nutrientes mágicos. Muy sustanciosa.',
        65,
        80
    ),
    (
        'EduTaco',
        'imagenes/eduinos/eduino_objetos/EduFood/EduTaco.png',
        'Un taco bien relleno de ingredientes deliciosos. Alimenta de verdad.',
        80,
        100
    ),
    (
        'EduCake',
        'imagenes/eduinos/eduino_objetos/EduFood/EduCake.png',
        'Una tarta entera solo para tu Eduino. El festín definitivo.',
        120,
        150
    );

INSERT INTO
    educapsulas (
        nombre,
        imagen,
        descripcion,
        numero_giros,
        precio
    )
VALUES (
        'EduCapsula',
        '/imagenes/eduinos/eduino_objetos/1_educapsula.png',
        '???',
        1,
        200
    ),
    (
        '3 EduCapsulas',
        '/imagenes/eduinos/eduino_objetos/3_educapsulas.png',
        '???',
        3,
        500
    ),
    (
        '5 EduCapsulas',
        '/imagenes/eduinos/eduino_objetos/5_educapsulas.png',
        '???',
        5,
        800
    );

INSERT INTO
    nenes (
        id_tutor,
        nombre,
        apodo,
        foto,
        fecha_nac,
        nivel,
        dias_permitidos,
        tiempo_pantalla,
        horario_inicio,
        horario_fin,
        monedas_total,
        monedas_actual,
        trofeos_total,
        trofeos_actual,
        numero_capsulas_total,
        numero_eduinos_total,
        numero_ejercicios_lengua,
        numero_de_sopas,
        numero_de_palabras_encontradas,
        numero_ejercicios_matematicas,
        numero_de_operaciones,
        monedas_gastadas_comida,
        monedas_gastadas_capsulas,
        monedas_gastadas_eduinos,
        logros_conseguidos
    )
VALUES (
        1,
        'Admin Nene',
        'nene',
        '',
        '2015-01-01',
        'Infantil',
        'Lunes,Martes,Miercoles,Jueves,Viernes,Sabado,Domingo',
        120,
        '09:00:00',
        '21:00:00',
        1000000,
        1000000,
        100,
        100,
        0,
        101,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    );

INSERT INTO
    coleccionEduinos (
        id_nene,
        id_eduino,
        nivel,
        porcentaje
    )
VALUES (1, 1, 1, 0),
    (1, 2, 1, 0),
    (1, 3, 1, 0),
    (1, 4, 1, 0),
    (1, 5, 1, 0),
    (1, 6, 1, 0),
    (1, 7, 1, 0),
    (1, 8, 1, 0),
    (1, 9, 1, 0),
    (1, 10, 1, 0),
    (1, 11, 1, 0),
    (1, 12, 1, 0),
    (1, 13, 1, 0),
    (1, 14, 1, 0),
    (1, 15, 1, 0),
    (1, 16, 1, 0),
    (1, 17, 1, 0),
    (1, 18, 1, 0),
    (1, 19, 1, 0),
    (1, 20, 1, 0),
    (1, 21, 1, 0),
    (1, 22, 1, 0),
    (1, 23, 1, 0),
    (1, 24, 1, 0),
    (1, 25, 1, 0),
    (1, 26, 1, 0),
    (1, 27, 1, 0),
    (1, 28, 1, 0),
    (1, 29, 1, 0),
    (1, 30, 1, 0),
    (1, 31, 1, 0),
    (1, 32, 1, 0),
    (1, 33, 1, 0),
    (1, 34, 1, 0),
    (1, 35, 1, 0),
    (1, 36, 1, 0),
    (1, 37, 1, 0),
    (1, 38, 1, 0),
    (1, 39, 1, 0),
    (1, 40, 1, 0),
    (1, 41, 1, 0),
    (1, 42, 1, 0),
    (1, 43, 1, 0),
    (1, 44, 1, 0),
    (1, 45, 1, 0),
    (1, 46, 1, 0),
    (1, 47, 1, 0),
    (1, 48, 1, 0),
    (1, 49, 1, 0),
    (1, 50, 1, 0),
    (1, 51, 1, 0),
    (1, 52, 1, 0),
    (1, 53, 1, 0),
    (1, 54, 1, 0),
    (1, 55, 1, 0),
    (1, 56, 1, 0),
    (1, 57, 1, 0),
    (1, 58, 1, 0),
    (1, 59, 1, 0),
    (1, 60, 1, 0),
    (1, 61, 1, 0),
    (1, 62, 1, 0),
    (1, 63, 1, 0),
    (1, 64, 1, 0),
    (1, 65, 1, 0),
    (1, 66, 1, 0),
    (1, 67, 1, 0),
    (1, 68, 1, 0),
    (1, 69, 1, 0),
    (1, 70, 1, 0),
    (1, 71, 1, 0),
    (1, 72, 1, 0),
    (1, 73, 1, 0),
    (1, 74, 1, 0),
    (1, 75, 1, 0),
    (1, 76, 1, 0),
    (1, 77, 1, 0),
    (1, 78, 1, 0),
    (1, 79, 1, 0),
    (1, 80, 1, 0),
    (1, 81, 1, 0),
    (1, 82, 1, 0),
    (1, 83, 1, 0),
    (1, 84, 1, 0),
    (1, 85, 1, 0),
    (1, 86, 1, 0),
    (1, 87, 1, 0),
    (1, 88, 1, 0),
    (1, 89, 1, 0),
    (1, 90, 1, 0),
    (1, 91, 1, 0),
    (1, 92, 1, 0),
    (1, 93, 1, 0),
    (1, 94, 1, 0),
    (1, 95, 1, 0),
    (1, 96, 1, 0),
    (1, 97, 1, 0),
    (1, 98, 1, 0),
    (1, 99, 1, 0),
    (1, 100, 1, 0),
    (1, 101, 1, 0);

INSERT INTO
    operaciones_matematicas (
        primer_operador,
        segundo_operador,
        operacion,
        opcion_a,
        opcion_b,
        opcion_c,
        opcion_d,
        respuesta,
        dificultad,
        recompensa
    )
VALUES
    -- Sumas 1 dígito sin llevada (dif 1)
    (
        3,
        4,
        '+',
        '7',
        '6',
        '8',
        '9',
        'A',
        1,
        5
    ),
    (
        5,
        2,
        '+',
        '8',
        '6',
        '7',
        '9',
        'C',
        1,
        5
    ),
    (
        2,
        6,
        '+',
        '7',
        '8',
        '9',
        '6',
        'B',
        1,
        5
    ),
    (
        1,
        7,
        '+',
        '9',
        '6',
        '7',
        '8',
        'D',
        1,
        5
    ),
    (
        4,
        3,
        '+',
        '7',
        '8',
        '6',
        '9',
        'A',
        1,
        5
    ),

-- Restas 1 dígito sin llevada (dif 1)
(
    7,
    2,
    '-',
    '5',
    '6',
    '4',
    '3',
    'A',
    1,
    5
),
(
    8,
    3,
    '-',
    '4',
    '5',
    '6',
    '3',
    'B',
    1,
    5
),
(
    9,
    4,
    '-',
    '6',
    '4',
    '5',
    '3',
    'C',
    1,
    5
),
(
    6,
    1,
    '-',
    '4',
    '6',
    '3',
    '5',
    'D',
    1,
    5
),
(
    9,
    5,
    '-',
    '3',
    '4',
    '5',
    '6',
    'B',
    1,
    5
),

-- Sumas con llevada o 2 cifras (dif 2)
(
    7,
    5,
    '+',
    '12',
    '11',
    '13',
    '14',
    'A',
    2,
    15
),
(
    8,
    6,
    '+',
    '13',
    '14',
    '15',
    '12',
    'B',
    2,
    15
),
(
    12,
    7,
    '+',
    '18',
    '20',
    '19',
    '21',
    'C',
    2,
    15
),
(
    6,
    9,
    '+',
    '16',
    '13',
    '17',
    '15',
    'D',
    2,
    15
),
(
    15,
    8,
    '+',
    '23',
    '24',
    '22',
    '21',
    'A',
    2,
    15
),
(
    11,
    6,
    '+',
    '16',
    '17',
    '18',
    '19',
    'B',
    2,
    15
),

-- Restas con llevada o 2 cifras (dif 2)
(
    15,
    7,
    '-',
    '7',
    '9',
    '6',
    '8',
    'D',
    2,
    15
),
(
    20,
    11,
    '-',
    '9',
    '10',
    '8',
    '7',
    'A',
    2,
    15
),
(
    13,
    6,
    '-',
    '8',
    '7',
    '6',
    '5',
    'B',
    2,
    15
),
(
    11,
    5,
    '-',
    '5',
    '7',
    '6',
    '8',
    'C',
    2,
    15
),
(
    25,
    9,
    '-',
    '14',
    '17',
    '15',
    '16',
    'D',
    2,
    15
),
(
    18,
    4,
    '-',
    '14',
    '13',
    '15',
    '12',
    'A',
    2,
    15
),

-- Multiplicaciones de 1 dígito (dif 2)
(
    3,
    4,
    '×',
    '12',
    '10',
    '15',
    '9',
    'A',
    2,
    15
),
(
    6,
    7,
    '×',
    '36',
    '42',
    '48',
    '45',
    'B',
    2,
    15
),
(
    5,
    8,
    '×',
    '35',
    '45',
    '40',
    '30',
    'C',
    2,
    15
),
(
    9,
    3,
    '×',
    '24',
    '30',
    '21',
    '27',
    'D',
    2,
    15
),
(
    7,
    6,
    '×',
    '42',
    '36',
    '49',
    '54',
    'A',
    2,
    15
),
(
    4,
    8,
    '×',
    '28',
    '32',
    '36',
    '40',
    'B',
    2,
    15
),

-- Multiplicaciones con decena redonda (dif 2)
(
    20,
    3,
    '×',
    '60',
    '50',
    '70',
    '40',
    'A',
    2,
    15
),
(
    30,
    4,
    '×',
    '100',
    '120',
    '110',
    '90',
    'B',
    2,
    15
),
(
    20,
    5,
    '×',
    '90',
    '80',
    '100',
    '110',
    'C',
    2,
    15
),
(
    40,
    2,
    '×',
    '60',
    '70',
    '90',
    '80',
    'D',
    2,
    15
),
(
    10,
    7,
    '×',
    '70',
    '60',
    '80',
    '50',
    'A',
    2,
    15
),

-- Multiplicaciones con 2 cifras no redondas (dif 3)
(
    12,
    3,
    '×',
    '36',
    '33',
    '39',
    '30',
    'A',
    3,
    25
),
(
    15,
    4,
    '×',
    '55',
    '60',
    '65',
    '50',
    'B',
    3,
    25
),
(
    11,
    5,
    '×',
    '50',
    '60',
    '55',
    '45',
    'C',
    3,
    25
),
(
    13,
    2,
    '×',
    '24',
    '28',
    '22',
    '26',
    'D',
    3,
    25
),
(
    14,
    3,
    '×',
    '42',
    '39',
    '45',
    '48',
    'A',
    3,
    25
),
(
    21,
    4,
    '×',
    '80',
    '84',
    '88',
    '76',
    'B',
    3,
    25
),

-- Divisiones (dif 3)
(
    12,
    4,
    '÷',
    '4',
    '2',
    '3',
    '6',
    'C',
    3,
    25
),
(
    20,
    5,
    '÷',
    '3',
    '5',
    '6',
    '4',
    'D',
    3,
    25
),
(
    36,
    6,
    '÷',
    '6',
    '7',
    '5',
    '8',
    'A',
    3,
    25
),
(
    24,
    8,
    '÷',
    '4',
    '3',
    '2',
    '6',
    'B',
    3,
    25
),
(
    45,
    9,
    '÷',
    '4',
    '6',
    '5',
    '7',
    'C',
    3,
    25
),
(
    56,
    7,
    '÷',
    '7',
    '9',
    '6',
    '8',
    'D',
    3,
    25
);

INSERT INTO
    problemas_matematicas (
        enunciado,
        respuesta_numero,
        respuesta_palabra,
        dificultad,
        recompensa
    )
VALUES

-- ── Dificultad 1 · Suma sencilla ──────────────────────────────────────────
(
    'María tiene 5 manzanas y su amiga le da 3 más. ¿Cuántas manzanas tiene ahora?',
    8,
    'ocho',
    1,
    5
),
(
    'María tiene 7 manzanas y su amiga le da 2 más. ¿Cuántas manzanas tiene ahora?',
    9,
    'nueve',
    1,
    5
),
(
    'María tiene 4 manzanas y su amiga le da 6 más. ¿Cuántas manzanas tiene ahora?',
    10,
    'diez',
    1,
    5
),
(
    'En el corral hay 4 gallinas y 5 conejos. ¿Cuántos animales hay en total?',
    9,
    'nueve',
    1,
    5
),
(
    'En el corral hay 6 gallinas y 7 conejos. ¿Cuántos animales hay en total?',
    13,
    'trece',
    1,
    5
),
(
    'Carlos tiene 6 años. Su hermana tiene 3 años más. ¿Cuántos años tiene su hermana?',
    9,
    'nueve',
    1,
    5
),
(
    'Carlos tiene 8 años. Su hermana tiene 5 años más. ¿Cuántos años tiene su hermana?',
    13,
    'trece',
    1,
    5
),
(
    'En una bolsa hay 6 canicas y en otra hay 7. ¿Cuántas canicas hay en total?',
    13,
    'trece',
    1,
    5
),

-- ── Dificultad 1 · Resta sencilla ────────────────────────────────────────
(
    'Juan tenía 10 cromos y se le perdieron 4. ¿Cuántos cromos le quedan?',
    6,
    'seis',
    1,
    5
),
(
    'Juan tenía 8 cromos y se le perdieron 3. ¿Cuántos cromos le quedan?',
    5,
    'cinco',
    1,
    5
),
(
    'Ana tiene 9 euros y gasta 5 en la tienda. ¿Cuántos euros le quedan?',
    4,
    'cuatro',
    1,
    5
),
(
    'Ana tiene 12 euros y gasta 7 en la tienda. ¿Cuántos euros le quedan?',
    5,
    'cinco',
    1,
    5
),
(
    'Había 15 pájaros en el árbol y volaron 6. ¿Cuántos pájaros quedaron?',
    9,
    'nueve',
    1,
    5
),
(
    'Hay 11 niños en el parque y se van 4 a casa. ¿Cuántos niños quedan?',
    7,
    'siete',
    1,
    5
),

-- ── Dificultad 2 · Suma con números mayores ───────────────────────────────
(
    'Un libro tiene 24 páginas y otro tiene 18. ¿Cuántas páginas tienen los dos juntos?',
    42,
    'cuarenta y dos',
    2,
    10
),
(
    'María tiene 17 cromos y su primo le regala 15. ¿Cuántos cromos tiene ahora?',
    32,
    'treinta y dos',
    2,
    10
),
(
    'En el autobús viajaban 28 personas y subieron 13 más. ¿Cuántas personas hay ahora?',
    41,
    'cuarenta y uno',
    2,
    10
),
(
    'En el colegio hay 35 niños y 27 niñas. ¿Cuántos alumnos hay en total?',
    62,
    'sesenta y dos',
    2,
    10
),

-- ── Dificultad 2 · Resta con números mayores ─────────────────────────────
(
    'En una tienda había 50 manzanas y se vendieron 23. ¿Cuántas manzanas quedan?',
    27,
    'veintisiete',
    2,
    10
),
(
    'Un tren tenía 80 asientos y hay 55 pasajeros. ¿Cuántos asientos libres hay?',
    25,
    'veinticinco',
    2,
    10
),
(
    'Pedro tenía 46 cromos y le dio 19 a su amigo. ¿Cuántos cromos le quedan a Pedro?',
    27,
    'veintisiete',
    2,
    10
),
(
    'En un teatro hay 100 sillas y están ocupadas 67. ¿Cuántas sillas libres hay?',
    33,
    'treinta y tres',
    2,
    10
),

-- ── Dificultad 2 · Multiplicación ────────────────────────────────────────
(
    'En una caja hay 6 chocolatinas. ¿Cuántas chocolatinas hay en 4 cajas?',
    24,
    'veinticuatro',
    2,
    10
),
(
    'En una caja hay 5 chocolatinas. ¿Cuántas chocolatinas hay en 6 cajas?',
    30,
    'treinta',
    2,
    10
),
(
    'Un paquete tiene 8 galletas. ¿Cuántas galletas hay en 7 paquetes?',
    56,
    'cincuenta y seis',
    2,
    10
),
(
    'Hay 9 filas de sillas y en cada fila hay 8. ¿Cuántas sillas hay en total?',
    72,
    'setenta y dos',
    2,
    10
),
(
    'Un pulpo tiene 8 brazos. ¿Cuántos brazos tienen 5 pulpos?',
    40,
    'cuarenta',
    2,
    10
),
(
    'Un insecto tiene 6 patas. ¿Cuántas patas tienen 9 insectos?',
    54,
    'cincuenta y cuatro',
    2,
    10
),

-- ── Dificultad 3 · División ──────────────────────────────────────────────
(
    'Repartimos 24 caramelos entre 6 amigos. ¿Cuántos caramelos toca a cada uno?',
    4,
    'cuatro',
    3,
    15
),
(
    'Repartimos 35 cromos entre 7 niños. ¿Cuántos cromos le tocan a cada niño?',
    5,
    'cinco',
    3,
    15
),
(
    'Hay 48 naranjas y las metemos en bolsas de 8. ¿Cuántas bolsas necesitamos?',
    6,
    'seis',
    3,
    15
),
(
    'Una granja produce 63 huevos y los empaquetan de 9 en 9. ¿Cuántos paquetes hay?',
    7,
    'siete',
    3,
    15
),
(
    'Tenemos 56 galletas para repartir en 8 grupos iguales. ¿Cuántas galletas por grupo?',
    7,
    'siete',
    3,
    15
),

-- ── Dificultad 3 · Varios pasos ──────────────────────────────────────────
(
    'Laura compra 3 paquetes de 8 lápices y regala 6. ¿Cuántos lápices le quedan?',
    18,
    'dieciocho',
    3,
    15
),
(
    'Un cine tiene 9 filas de 12 butacas. Si 45 están ocupadas, ¿cuántas están libres?',
    63,
    'sesenta y tres',
    3,
    15
),
(
    'Pedro tiene el doble de cromos que Ana. Ana tiene 17. ¿Cuántos cromos tiene Pedro?',
    34,
    'treinta y cuatro',
    3,
    15
),
(
    'Una tienda vende 25 helados el lunes y el triple el martes. ¿Cuántos vendió en total?',
    100,
    'cien',
    3,
    15
),
(
    'En una granja hay 4 grupos de 9 ovejas y 12 cabras. ¿Cuántos animales hay en total?',
    48,
    'cuarenta y ocho',
    3,
    15
);

INSERT INTO
    palabras_lengua (
        palabra,
        dificultad,
        respuesta
    )
VALUES
    -- Fácil (5 monedas) — palabras cortas y comunes
    ('casa', 1, 5),
    ('luna', 1, 5),
    ('mesa', 1, 5),
    ('agua', 1, 5),
    ('gato', 1, 5),
    ('perro', 1, 5),
    ('niño', 1, 5),
    ('libro', 1, 5),
    ('árbol', 1, 5),
    ('flor', 1, 5),
    -- Media (10 monedas) — palabras más largas o con tildes
    ('colegio', 2, 10),
    ('familia', 2, 10),
    ('ventana', 2, 10),
    ('montaña', 2, 10),
    ('camino', 2, 10),
    ('jardín', 2, 10),
    ('pájaro', 2, 10),
    ('silencio', 2, 10),
    ('naranja', 2, 10),
    ('caballo', 2, 10),
    -- Difícil (15 monedas) — palabras largas o complejas
    ('bicicleta', 3, 15),
    ('mariposa', 3, 15),
    ('murciélago', 3, 15),
    ('paraguas', 3, 15),
    ('estrella', 3, 15),
    ('aventura', 3, 15),
    ('chocolate', 3, 15),
    ('dinosaurio', 3, 15),
    ('ferrocarril', 3, 15),
    ('universo', 3, 15);

INSERT INTO
    test_geografia (
        pregunta,
        pais,
        opcion_a,
        opcion_b,
        opcion_c,
        opcion_d,
        respuesta,
        recompensa
    )
VALUES (
        '¿Cuál es la capital de Francia?',
        'Francia',
        'Madrid',
        'París',
        'Roma',
        'Berlín',
        'B',
        5
    ),
    (
        '¿Cuál es la capital de España?',
        'España',
        'Barcelona',
        'Valencia',
        'Madrid',
        'Sevilla',
        'C',
        5
    ),
    (
        '¿Cuál es la capital de Alemania?',
        'Alemania',
        'Viena',
        'Zúrich',
        'Bruselas',
        'Berlín',
        'D',
        5
    ),
    (
        '¿Cuál es la capital de Italia?',
        'Italia',
        'Milán',
        'Roma',
        'Nápoles',
        'Turín',
        'B',
        5
    ),
    (
        '¿Cuál es la capital de Portugal?',
        'Portugal',
        'Porto',
        'Faro',
        'Lisboa',
        'Coímbra',
        'C',
        5
    ),
    (
        '¿Cuál es la capital de Reino Unido?',
        'Reino Unido',
        'Edimburgo',
        'Manchester',
        'Cardiff',
        'Londres',
        'D',
        5
    ),
    (
        '¿Cuál es la capital de Japón?',
        'Japón',
        'Osaka',
        'Tokio',
        'Kioto',
        'Hiroshima',
        'B',
        5
    ),
    (
        '¿Cuál es la capital de China?',
        'China',
        'Shanghái',
        'Pekín',
        'Cantón',
        'Nankín',
        'B',
        5
    ),
    (
        '¿Cuál es la capital de Brasil?',
        'Brasil',
        'Río de Janeiro',
        'São Paulo',
        'Brasilia',
        'Salvador',
        'C',
        5
    ),
    (
        '¿Cuál es la capital de Argentina?',
        'Argentina',
        'Córdoba',
        'Rosario',
        'Buenos Aires',
        'Mendoza',
        'C',
        5
    ),
    (
        '¿Cuál es la capital de México?',
        'México',
        'Guadalajara',
        'Monterrey',
        'Ciudad de México',
        'Puebla',
        'C',
        5
    ),
    (
        '¿Cuál es la capital de Rusia?',
        'Rusia',
        'San Petersburgo',
        'Moscú',
        'Novosibirsk',
        'Kazán',
        'B',
        5
    ),
    (
        '¿Cuál es la capital de Australia?',
        'Australia',
        'Sídney',
        'Melbourne',
        'Canberra',
        'Brisbane',
        'C',
        5
    ),
    (
        '¿Cuál es la capital de Canadá?',
        'Canadá',
        'Toronto',
        'Vancouver',
        'Ottawa',
        'Montreal',
        'C',
        5
    ),
    (
        '¿Cuál es la capital de Egipto?',
        'Egipto',
        'Alejandría',
        'Luxor',
        'El Cairo',
        'Asuán',
        'C',
        5
    );

INSERT INTO
    test_historia (
        pregunta,
        personaje,
        opcion_a,
        opcion_b,
        opcion_c,
        opcion_d,
        respuesta,
        recompensa
    )
VALUES (
        '¿Quién descubrió América?',
        'Cristóbal Colón',
        'Cristóbal Colón',
        'Magallanes',
        'Vasco de Gama',
        'Cook',
        'A',
        5
    ),
    (
        '¿Quién fue el primer presidente de EE.UU.?',
        'George Washington',
        'Abraham Lincoln',
        'Thomas Jefferson',
        'George Washington',
        'Franklin Roosevelt',
        'C',
        5
    ),
    (
        '¿Quién pintó la Capilla Sixtina?',
        'Miguel Ángel',
        'Leonardo da Vinci',
        'Rafael',
        'Miguel Ángel',
        'Donatello',
        'C',
        5
    ),
    (
        '¿En qué año comenzó la Primera Guerra Mundial?',
        '1914',
        '1905',
        '1910',
        '1914',
        '1918',
        'C',
        5
    ),
    (
        '¿Quién fue Napoleón Bonaparte?',
        'Emperador de Francia',
        'Rey de España',
        'Zar de Rusia',
        'Emperador de Francia',
        'Kaiser de Alemania',
        'C',
        5
    ),
    (
        '¿Dónde nació Simón Bolívar?',
        'Venezuela',
        'Colombia',
        'Perú',
        'Venezuela',
        'Argentina',
        'A',
        5
    ),
    (
        '¿Qué civilización construyó las pirámides de Guiza?',
        'Egipcios',
        'Romanos',
        'Griegos',
        'Mayas',
        'Egipcios',
        'D',
        5
    ),
    (
        '¿En qué año cayó el Muro de Berlín?',
        '1989',
        '1975',
        '1989',
        '1991',
        '2001',
        'B',
        5
    ),
    (
        '¿Quién fue la primera mujer en ganar un Nobel?',
        'Marie Curie',
        'Marie Curie',
        'Florence Nightingale',
        'Ada Lovelace',
        'Simone de Beauvoir',
        'A',
        5
    ),
    (
        '¿Qué imperio construyó el Coliseo Romano?',
        'Imperio Romano',
        'Imperio Griego',
        'Imperio Romano',
        'Imperio Persa',
        'Imperio Otomano',
        'B',
        5
    );

-- ── LOGROS ────────────────────────────────────────────────────────────────────

CREATE TABLE logros (
    id_logro INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    recompensa_monedas INT UNSIGNED NOT NULL DEFAULT 0,
    tipo VARCHAR(50) NOT NULL COMMENT 'login, lengua, matematicas, geografia, historia, eduinos',
    meta INT UNSIGNED NOT NULL,
    campo_seguimiento VARCHAR(100) NOT NULL COMMENT 'columna de nenes que se usa para calcular el progreso'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE coleccion_logros (
    id_nene INT NOT NULL,
    id_logro INT NOT NULL,
    reclamado TINYINT(1) NOT NULL DEFAULT 0,
    fecha_reclamado TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id_nene, id_logro),
    FOREIGN KEY (id_nene) REFERENCES nenes(id_nene) ON DELETE CASCADE,
    FOREIGN KEY (id_logro) REFERENCES logros(id_logro) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO logros (nombre, descripcion, imagen, recompensa_monedas, tipo, meta, campo_seguimiento) VALUES
    -- Login
    ('Bienvenido',        'Inicia sesión por primera vez.',              '/imagenes/logros/bienvenido.png',        50,   'login',       1,  'dias_de_sesion'),
    ('Constante',         'Inicia sesión 5 veces.',                      '/imagenes/logros/constante.png',         100,  'login',       5,  'dias_de_sesion'),
    ('Dedicado',          'Inicia sesión 10 veces.',                     '/imagenes/logros/dedicado.png',          200,  'login',       10, 'dias_de_sesion'),
    ('Perseverante',      'Inicia sesión 30 veces.',                     '/imagenes/logros/perseverante.png',      500,  'login',       30, 'dias_de_sesion'),
    -- Lengua
    ('Lector Novato',     'Completa 10 ejercicios de Lengua.',           '/imagenes/logros/lector_novato.png',     100,  'lengua',      10, 'numero_ejercicios_lengua'),
    ('Lector Avanzado',   'Completa 25 ejercicios de Lengua.',           '/imagenes/logros/lector_avanzado.png',   200,  'lengua',      25, 'numero_ejercicios_lengua'),
    ('Lector Experto',    'Completa 50 ejercicios de Lengua.',           '/imagenes/logros/lector_experto.png',    400,  'lengua',      50, 'numero_ejercicios_lengua'),
    -- Matemáticas
    ('Calculador Novato', 'Completa 10 ejercicios de Matemáticas.',      '/imagenes/logros/calculador_novato.png', 100,  'matematicas', 10, 'numero_ejercicios_matematicas'),
    ('Calculador Avanzado','Completa 25 ejercicios de Matemáticas.',     '/imagenes/logros/calculador_avanzado.png',200, 'matematicas', 25, 'numero_ejercicios_matematicas'),
    ('Calculador Experto','Completa 50 ejercicios de Matemáticas.',      '/imagenes/logros/calculador_experto.png',400,  'matematicas', 50, 'numero_ejercicios_matematicas'),
    -- Geografía
    ('Explorador Novato', 'Responde 10 preguntas de Geografía.',         '/imagenes/logros/explorador_novato.png', 100,  'geografia',   10, 'numero_ejercicios_geografia'),
    ('Explorador Experto','Responde 25 preguntas de Geografía.',         '/imagenes/logros/explorador_experto.png',250,  'geografia',   25, 'numero_ejercicios_geografia'),
    -- Historia
    ('Historiador Novato','Responde 10 preguntas de Historia.',          '/imagenes/logros/historiador_novato.png',100,  'historia',    10, 'numero_ejercicios_historia'),
    ('Historiador Experto','Responde 25 preguntas de Historia.',         '/imagenes/logros/historiador_experto.png',250, 'historia',    25, 'numero_ejercicios_historia'),
    -- Eduinos
    ('Primer Compañero',  'Consigue tu primer Eduino.',                  '/imagenes/logros/primer_companero.png',  50,   'eduinos',     1,  'numero_eduinos_total'),
    ('Coleccionista',     'Consigue 5 Eduinos.',                         '/imagenes/logros/coleccionista.png',     150,  'eduinos',     5,  'numero_eduinos_total'),
    ('Gran Coleccionista','Consigue 10 Eduinos.',                        '/imagenes/logros/gran_coleccionista.png',300,  'eduinos',     10, 'numero_eduinos_total'),
    ('Maestro Eduino',    'Consigue 25 Eduinos.',                        '/imagenes/logros/maestro_eduino.png',    600,  'eduinos',     25, 'numero_eduinos_total'),
    ('Leyenda Eduino',    'Consigue 50 Eduinos.',                        '/imagenes/logros/leyenda_eduino.png',    1200, 'eduinos',     50, 'numero_eduinos_total');