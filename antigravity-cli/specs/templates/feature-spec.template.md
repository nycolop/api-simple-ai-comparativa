# [SPEC-ID]: [Nombre de la Funcionalidad]

## 1. Context Engineering (Marco y Restricciones)

### 1.1 Entorno de Ejecución
- **Runtime:** Node.js v`[versión]`
- **OS / Shell:** `[Windows PowerShell 5.1 / Linux Bash]` (Nota: evitar operadores no compatibles como `&&` en PowerShell 5.1).
- **Directorio Raíz Autorizado:** `.` (Trabajar estrictamente dentro del workspace actual; no acceder a rutas padre ni directorios vecinos).

### 1.2 Dependencias Autorizadas (Whitelist)
- **Producción:** `[ej. express]`
- **Desarrollo:** `[ej. mocha, supertest]`
- **Regla Estricta:** No instalar librerías adicionales sin aprobación previa explícita. Usar módulos nativos de Node.js (ej. `node:assert`).

### 1.3 Arquitectura y Ubicación de Archivos
- **Capa de Rutas (`routes/`):** Define endpoints y vincula con controladores.
- **Capa de Controladores (`controllers/`):** Manejo de req/res HTTP, extracción de datos y control de códigos de estado.
- **Capa de Servicios (`services/`):** Lógica pura de negocio independiente de HTTP.
- **Capas Opcionales (`models/`, `repositories/`):** Usar sólo si existe persistencia o entidades de dominio. No forzar capas vacías.
- **Arranque:** `app.js` (configuración) y `server.js` (listen) deben permanecer desacoplados.

---

## 2. Specs Engineering (Contrato Funcional)

### 2.1 Definición del Endpoint
- **Método HTTP:** `[GET / POST / PUT / DELETE]`
- **Ruta:** `[/ruta]`
- **Headers:** `Content-Type: application/json`

### 2.2 Parámetros y Entradas
| Parámetro | Ubicación | Tipo | Requerido | Restricciones / Reglas |
|-----------|-----------|------|-----------|------------------------|
| `param1`  | `query`   | String | Sí      | Longitud > 0, no sólo espacios |

### 2.3 Contratos de Respuesta

#### Respuesta Exitosa (`200 OK`)
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "propiedad": "valor"
}
```

#### Respuestas de Error
- **Formato Estándar de Error:**
```json
{
  "error": "Descripción precisa del error"
}
```
| Código HTTP | Condición | Mensaje de Error Exacto |
|-------------|-----------|-------------------------|
| `400 Bad Request` | Falta `param1` o está vacío | `"El parámetro 'param1' es requerido"` |

---

## 3. Criterios de Aceptación y Pruebas (Test Scenarios)

### 3.1 Casos Válidos (Happy Path)
```gherkin
Scenario: Solicitud con parámetros válidos
  Given el servidor está en ejecución
  When se realiza una petición GET a "/ruta?param1=Valor"
  Then el status code debe ser 200
  And el header "Content-Type" debe contener "application/json"
  And el cuerpo JSON debe ser exactamente:
    """
    { "propiedad": "resultado" }
    """
```

### 3.2 Casos Inválidos (Negative Path / Edge Cases)
```gherkin
Scenario: Solicitud sin el parámetro requerido
  Given el servidor está en ejecución
  When se realiza una petición GET a "/ruta" sin "param1"
  Then el status code debe ser 400
  And el cuerpo JSON debe contener la propiedad "error"
```

---

## 4. Fuera del Alcance (Anti-Requirements / Out of Scope)
- No implementar autenticación o autorización.
- No conectar bases de datos o mocks de persistencia innecesarios.
- No agregar middlewares de logging externos a menos que se soliciten expresamente.
