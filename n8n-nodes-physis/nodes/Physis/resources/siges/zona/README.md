# Recurso Zonas (SIGES)

El recurso **Zonas** administra la estructura geográfica utilizada en el sistema para definir:
1.  **Domicilios**: De clientes, proveedores y empresas.
2.  **Jurisdicciones Fiscales**: Para el cálculo de Ingresos Brutos (Convenio Multilateral).
3.  **Logística**: Procedencia y destino de mercaderías (Cartas de Porte).

Permite consultar la jerarquía estándar: **País > Provincia > Partido/Departamento**.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idPais` | Int | Identificador de País (ej: 1=Argentina). |
| `idProvincia` | Int | Identificador de Provincia dentro del país (ej: 21=Santa Fe). |
| `nombre` | String | Nombre descriptivo de la ubicación. |
| `jurisdiccion` | String | Código fiscal asociado a la provincia (ej: 921). |

---

## 🛠 Operaciones Disponibles

### Consultas Jerárquicas
* **Listar Países** (`getPaises`): Obtiene el catálogo de nivel superior.
* **Listar Provincias** (`getProvincias`): Dado un `idPais`, devuelve sus jurisdicciones internas.
* **Listar Árbol de Zonas** (`getZonasTree`): Endpoint versátil que devuelve estructuras combinadas según un parámetro de "Opción". Útil para llenar selectores en cascada en una sola llamada.
    * *Opciones*:
        * `1`: Solo Países y Provincias.
        * `2`: Solo Provincias Argentinas (Atajo común).
        * `3`: Árbol completo con Partidos.

### Búsqueda
* **Buscar Lugares** (`searchLugares`): Permite buscar localidades o zonas por nombre (texto libre), filtrando por tipo (País, Provincia o Partido).

### Detalle
* **Obtener País/Provincia** (`getPais`, `getProvincia`): Recupera el dato individual.

---

## 💡 Ejemplos de Uso

### 1. Llenar Combo de Provincias
El usuario seleccionó "Argentina" (ID 1). Cargar las provincias disponibles.

**Recurso**: `Zonas` 

**Operación**: `Listar Provincias`

**Parámetro**: 

* idPais: `1`

### 2. Buscar Localidad
Encontrar el ID del partido de "Rosario".

**Recurso**: `Zonas` 

**Operación**: `Buscar Lugares`

**Parámetros**:

* texto: `Rosario`
* tipoZona: `Partido / Localidad` (Valor 2)

### 3. Obtener Estructura Completa
Obtener todo el árbol geográfico de Argentina para cachear en el cliente.

**Recurso**: `Zonas` 

**Operación**: `Listar Árbol de Zonas`

**Parámetro**: 

*opcionZona: `3` (Países, Provincias y Partidos).

---

## ⚠️ Notas Técnicas

* **Clave Compuesta**: La identificación de una Provincia **siempre** requiere el par `IdPais` + `IdProvincia`. El ID de provincia 1 en Argentina no es el mismo que el ID 1 en Brasil.
* **Códigos Fiscales**: Es común que los objetos devueltos por `getProvincias` incluyan códigos de AFIP o Rentas necesarios para la facturación electrónica.