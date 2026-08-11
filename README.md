# 🎓 Eduino

> Plataforma web educativa gamificada para niños, con control parental integrado.

**Trabajo de Fin de Grado**  
Yassin Oulad Mohand · Ismael Akapo

---

## 📖 Descripción

Eduino es una plataforma web educativa dirigida a niños pequeños que combina aprendizaje y entretenimiento mediante juegos y actividades interactivas. Los niños pueden practicar distintas materias —matemáticas, lengua, inglés y geografía— a través de tests, ejercicios y actividades para completar palabras o frases.

Para mantener la motivación, el sistema incorpora **elementos de gamificación**: puntos, logros, rankings y mascotas virtuales que se desbloquean con los puntos obtenidos. Los padres disponen de un **panel de control parental** desde el que pueden registrar a sus hijos, limitar el tiempo de uso y hacer seguimiento de su progreso.

---

## 👥 Usuarios del sistema

### 👨‍👩‍👧 Padres
- Registrar la cuenta del niño.
- Configurar el tiempo máximo de uso de la plataforma.
- Consultar el progreso y las actividades realizadas.

### 🧒 Niños
- Realizar actividades educativas.
- Obtener puntos al completar ejercicios.
- Desbloquear logros y mascotas virtuales.

---

## ⚙️ Funcionalidades principales

| Funcionalidad | Descripción |
|---|---|
| 🔐 Autenticación | Registro e inicio de sesión para padres e hijos |
| 📚 Actividades educativas | Tests, completar palabras/frases y ejercicios interactivos |
| 🏆 Sistema de puntos | Recompensas por completar actividades |
| 🐾 Mascotas virtuales | Se desbloquean y mantienen con los puntos ganados |
| 🥇 Logros y ranking | Sistema de logros y tabla de clasificación de usuarios |
| 📊 Panel parental | Seguimiento del progreso y gestión del tiempo de uso |

---

## 🛠️ Tecnologías utilizadas

| Capa | Tecnología |
|---|---|
| Frontend | React |
| Backend | PHP (API REST) |
| Base de datos | MySQL |

---

## 🗂️ Estructura de la aplicación

```
Eduino/
├── 🏠  Página principal       → Información sobre la plataforma (dirigida a padres)
├── 🔐  Autenticación          → Registro e inicio de sesión
├── 🎮  Plataforma educativa   → Actividades, puntos y recompensas
└── 📊  Panel parental         → Progreso del niño y gestión del tiempo de uso
```

---

## 🎯 Objetivo del proyecto

Desarrollar una aplicación web que **combine educación y gamificación**, permitiendo que los niños aprendan mientras juegan y proporcionando a los padres herramientas para supervisar y acompañar su aprendizaje.

---

## 🚀 Cómo ejecutar el proyecto

Todo el entorno está en Docker, así que **no hace falta instalar PHP, MySQL ni Node**.

### Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y arrancado
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/IsmaelAkapo/Eduino.git
cd Eduino
```

### 2. Crear el archivo de configuración

El repositorio no incluye el archivo `.env` (contiene contraseñas). Hay que crearlo a partir del ejemplo:

```bash
cp .env.example .env
```

Y rellenar los valores vacíos. Para probar en local sirve cualquier cosa:

```env
DB_HOST=db_eduino
DB_NAME=eduino_db
DB_USER=eduino
DB_PASS=eduino
MYSQL_ROOT_PASSWORD=root
```

### 3. Levantar la aplicación

```bash
docker compose up
```

La primera vez tarda unos minutos: descarga las imágenes, instala las dependencias de React y carga la base de datos con `baseDatos/init.sql`.

### 4. Abrir en el navegador

| Servicio | URL |
|---|---|
| 🎮 Aplicación (React) | http://localhost:5173 |
| 🔌 API (PHP) | http://localhost:8081/api.php |
| 🗄️ MySQL | `localhost:3309` |

---

## 🔑 Cuentas de demostración

La base de datos se crea ya con estas cuentas, listas para entrar:

| | Padre / Tutor | Niño |
|---|---|---|
| **Usuario** | `admin@eduino.com` | `nene` |
| **Contraseña** | `demo1234` | `demo1234` |

> La contraseña es la misma para los dos: el login del niño valida contra el hash de su tutor.

---

## 🧰 Comandos útiles

```bash
# Parar la aplicación
docker compose down

# Parar Y borrar la base de datos (para volver a cargar init.sql desde cero)
docker compose down -v

# Ver los logs de un servicio
docker compose logs -f app-eduino-api
```

> ⚠️ `baseDatos/init.sql` **solo se ejecuta la primera vez**, cuando el volumen de MySQL está vacío.
> Si modificas el SQL y quieres que se aplique, hay que hacer `docker compose down -v` antes de volver a levantar.

---

© 2026 AfroTek - Eduino

## 


