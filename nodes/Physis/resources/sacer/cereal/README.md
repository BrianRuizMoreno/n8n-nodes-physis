# Recurso Cereal (SACER)

El recurso **Cereal** administra el maestro de especies granarias (ej: Trigo, Maíz, Soja, Girasol).

Es un registro fundamental para el módulo SACER, ya que define las reglas de negocio para cada grano: códigos oficiales (ONCCA/AFIP), mermas por volatilidad, alícuotas de IVA y sus variedades asociadas.

## 📋 Estructura de Datos (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la siguiente estructura.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codCereal` | Int | **0** para crear nuevo. ID existente para actualizar. |
| `descripcion`* | String | Nombre del cereal (ej: "Soja"). |
| `codONCCA` | Int | Código oficial para reportes ONCCA. |
| `codigoAFIP` | Int | Código oficial para Cartas de Porte (CTG). |
| `mermaVolatil` | Decimal | Porcentaje de merma automática (volátil). |
| `idIva` | Int | ID de la alícuota de IVA aplicable. |
| `informaGrado` | Bool | Si requiere informar grado en la carta de porte. |
| `variedades` | Array | Lista de sub-tipos (ver abajo). |

### Sub-objeto: Variedades
Un cereal puede contener múltiples variedades (ej: Trigo Duro, Trigo Candeal).
```json
{
  "codigo": 0,
  "descripcion": "Variedad Específica",
  "rindePotencial": 0
}
```


## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos (getAll)**: Devuelve el listado completo de cereales.

* **Obtener por ID (get)**: Recupera los datos de un cereal específico.

* **Consulta Avanzada (tableSearch)**: Búsqueda con filtros SQL-like (paginado y ordenamiento).

***Útil para***: Buscar cereales por nombre o código AFIP.

#### Sub-recursos
* **Obtener Variedades (getVariedades)**: Lista las variedades asociadas a un cereal.

* **Obtener Productos (getProductos)**: Lista los productos de stock/facturación vinculados a este grano.

### ABM (Escritura)
* **Crear (create)**: Da de alta una nueva especie.

* **Actualizar (update)**: Modifica configuraciones (ej: cambiar el código AFIP).

* **Eliminar (delete)**: Borra un cereal (solo si no tiene movimientos históricos).

* **Vincular Producto (addProduct)**: Asocia un producto del sistema de gestión al cereal.

## 💡 Ejemplos de Uso
**1. Crear Cereal (Maíz)**
* **Operación**: Crear JSON Body:

```json
{
  "codCereal": 0,
  "descripcion": "Maíz Flint",
  "codigoAFIP": 2,
  "codONCCA": 2,
  "mermaVolatil": 0.5,
  "informaGrado": true,
  "idIva": 4,
  "variedades": [
    {
      "codigo": 0,
      "descripcion": "Colorada",
      "observaciones": "Para exportación"
    }
  ]
}
```
**2. Buscar Cereal por Nombre**
* **Operación**: Consulta Avanzada JSON Body:

```json
{
  "Paginado": { "PaginaActual": 1, "RegistrosPorPagina": 10 },
  "Filtros": [ 
    { 
      "Campo": "Descripcion", 
      "Valor": "Trigo", 
      "Operador": 8 // 8 = CONTIENE
    } 
  ]
}
```

## ⚠️ Notas Técnicas
* **Códigos Oficiales**: Es crítico que codigoAFIP y codONCCA coincidan con las tablas oficiales del gobierno para que la solicitud de CTG y los libros legales funcionen correctamente.

* **Relación con Variedades**: Al crear un cereal, puedes enviar el array variedades para crearlas en la misma transacción. Si el cereal ya existe, usa el endpoint de actualización.