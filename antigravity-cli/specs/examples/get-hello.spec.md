# SPEC-001: Endpoint GET /hello

## 1. Context Engineering (Marco Operativo y Restricciones)

### 1.1 Entorno y Ejecución
- **Plataforma:** Node.js `>= 18.x`
- **Sistema Operativo / Shell:** Windows (PowerShell 5.1).
  - *Restricción de comandos:* No encadenar comandos usando `&&`; usar `;` en scripts de PowerShell.
- **Espacio de Trabajo (Workspace Boundary):**
  - Todo el trabajo debe ejecutarse estrictamente dentro del directorio del proyecto (`antigravity-cli`).
  - Prohibido inspeccionar, leer o modificar carpetas padre o hermanas (`../`).

### 1.2 Dependencias Autorizadas (Whitelist)
- **Producción:**
  - `express` (`^5.0.0` o `^4.x`)
- **Desarrollo:**
  - `mocha`
  - `supertest`
- **Aserciones:** Utilizar el módulo nativo `node:assert` (no instalar `chai`, `jest` u otras librerías).

### 1.3 Arquitectura en Capas
- `routes/hello.routes.js`: Define la ruta `GET /hello` y la asocia al controlador.
- `controllers/hello.controller.js`: Extrae y valida `req.query.name`, gestiona códigos HTTP (`200`, `400`).
- `services/hello.service.js`: Contiene la lógica de negocio pura para componer el saludo `Hello, <name>`.
- `app.js`: Configuración de Express, middlewares y montaje de rutas.
- `server.js`: Entrada principal encargada de escuchar peticiones en el puerto asignado. Debe mantenerse separado de `app.js` para facilitar las pruebas con Supertest.
- *Capas omitidas:* `repositories/` y `models/` no deben crearse ya que este endpoint no involucra persistencia ni entidades de dominio.

---

## 2. Specs Engineering (Especificación de la Funcionalidad)

### 2.1 Definición de la Interfaz
- **Método:** `GET`
- **Ruta:** `/hello`
- **Content-Type producido:** `application/json`

### 2.2 Parámetros de Entrada
| Parámetro | Ubicación | Tipo | Requerido | Validación |
|-----------|-----------|------|-----------|------------|
| `name`    | `query`   | String | Sí      | Debe existir, ser de tipo `string` y contener al menos un carácter que no sea espacio en blanco (`name.trim() !== ''`). |

### 2.3 Contratos de Respuesta

#### Caso Exitoso (`200 OK`)
- **Condición:** Parámetro `name` presente y válido.
- **Payload:**
```json
{
  "message": "Hello, <name>"
}
```
- **Ejemplo:** `GET /hello?name=Juan`
```json
{
  "message": "Hello, Juan"
}
```

#### Caso Error de Validación (`400 Bad Request`)
- **Condición:** Falta el parámetro `name`, es un tipo inválido o está vacío.
- **Payload:**
```json
{
  "error": "El parámetro 'name' es requerido"
}
```

---

## 3. Criterios de Aceptación y Pruebas Automatizadas

Archivo de prueba: `test/hello.test.js`

### 3.1 Escenario 1: Saludo Exitoso (Happy Path)
```gherkin
Scenario: Solicitud con nombre válido
  Given la aplicación Express exportada en "app.js"
  When se realiza una petición GET a "/hello?name=Juan"
  Then el status code HTTP debe ser 200
  And el header "Content-Type" debe coincidir con /json/
  And el cuerpo JSON debe ser exactamente:
    """
    { "message": "Hello, Juan" }
    """
```

### 3.2 Escenario 2: Parámetro ausente (Negative Path)
```gherkin
Scenario: Solicitud sin parámetro name
  Given la aplicación Express exportada en "app.js"
  When se realiza una petición GET a "/hello"
  Then el status code HTTP debe ser 400
  And el header "Content-Type" debe coincidir con /json/
  And el cuerpo JSON debe contener la propiedad "error" de tipo string
```

---

## 4. Fuera de Alcance (Out of Scope / Anti-Patterns)
- No añadir capas de persistencia (bases de datos, repositorios en memoria o modelos ORM).
- No añadir librerías adicionales de aserciones (`chai`, `sinon`, etc.).
- No crear endpoints adicionales no documentados en esta especificación.
- No alterar la respuesta de error estándar `{ "error": string }` con metadatos extra no aprobados (como timestamps, trace IDs, etc.).
