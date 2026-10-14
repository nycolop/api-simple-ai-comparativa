# Guía de Context Engineering & Specs Engineering

Esta guía define el estándar para estructurar especificaciones (`specs`) optimizadas para desarrollo asistido por agentes de IA e ingenieros de software. Combina **Context Engineering** (definición precisa de entorno, límites y restricciones) con **Specs Engineering** (contratos funcionales, arquitectónicos y de prueba sin ambigüedad).

---

## 1. Context Engineering (El Entorno y los Límites)

El objetivo de Context Engineering es darle al agente o desarrollador el marco de referencia exacto para que tome decisiones correctas sin sobrecargar su ventana de contexto ni permitir alucinaciones.

### Principios Clave:
1. **Límites de Alcance Estrictos (Scope Boundaries):**
   - Delimitar con precisión el directorio de trabajo y prohibir la inspección o modificación de carpetas externas.
   - Definir qué está **Dentro del Alcance (In Scope)** y qué está **Fuera del Alcance (Out of Scope)**.

2. **Restricción Tecnológica y de Dependencias:**
   - Lista blanca de dependencias (`whitelist`).
   - Regla de "cero dependencias adicionales sin aprobación expresa".
   - Especificación del runtime y sistema operativo (ej. Windows con PowerShell 5.1 vs Bash para evitar errores de sintaxis en comandos como `&&`).

3. **Arquitectura y Convenciones Estructurales:**
   - Definir la responsabilidad de cada capa (`routes`, `controllers`, `services`, `models`, `repositories`).
   - Indicar explícitamente cuándo **no** forzar capas innecesarias (principio de simplicidad).
   - Separación estricta de arranque (`server.js`) y configuración (`app.js`) para garantizar testeabilidad.

---

## 2. Specs Engineering (El Contrato y la Verificación)

El objetivo de Specs Engineering es definir qué se debe construir con suficiente precisión matemática y lógica para que la implementación y las pruebas sean inequívocas.

### Principios Clave:
1. **Contrato de Interfaz (API Contract):**
   - Método HTTP, ruta exacta, parámetros (query, params, body, headers) y sus tipos de datos.
   - Esquema JSON exacto de respuesta exitosa (con códigos de estado HTTP).
   - Esquema JSON exacto de respuesta de error.

2. **Reglas de Validación y Casos Límite (Edge Cases):**
   - ¿Qué ocurre si el parámetro falta?
   - ¿Qué ocurre si viene vacío o sólo con espacios?
   - ¿Qué ocurre si tiene un tipo de dato inesperado?

3. **Criterios de Aceptación Verificables (Given-When-Then):**
   - Casos de prueba explícitos para testing automatizado (Mocha + Supertest).
   - No asumir comportamientos no especificados.

---

## 3. Estructura de la Carpeta `/specs`

```text
specs/
├── README.md                          # Este documento (principios y guía)
├── templates/
│   └── feature-spec.template.md      # Plantilla base para nuevas funcionalidades
└── examples/
    └── get-hello.spec.md              # Ejemplo real aplicado a la funcionalidad GET /hello
```
