# Recurso Tablas LSP (SACH)

El recurso **Tablas LSP** proporciona acceso a las tablas maestras y de referencia utilizadas por la **AFIP** para la **Liquidación Pecuaria Electrónica (LSP)**.

Este recurso es de solo lectura y su función es permitir la consulta de los códigos oficiales (Motivos, Especies, Razas, Categorías, Tributos) que deben utilizarse al generar liquidaciones electrónicas para asegurar su validación fiscal.

## 📋 Parámetros de Consulta

Al tratarse de tablas de referencia, la mayoría de las operaciones no requieren parámetros, salvo aquellas que tienen dependencia jerárquica (como Razas y Categorías, que dependen de la Especie).

| Parámetro | Tipo | Descripción | Operaciones donde aplica |
| :--- | :--- | :--- | :--- |
| `idEspecie` | Int | Código de la especie (ej: 1 = Bovinos). | `getRazas`, `getCategorias` |

---

## 🛠 Operaciones Disponibles

### Consultas de Referencia
* **Listar Motivos** (`getMotivos`): Devuelve los códigos de motivos de liquidación aceptados por AFIP.
* **Listar Especies** (`getEspecies`): Obtiene el catálogo de especies animales homologadas.
* **Listar Razas** (`getRazas`): Devuelve las razas oficiales asociadas a una especie.
    * *Requiere*: `idEspecie`.
* **Listar Categorías** (`getCategorias`): Obtiene las categorías de hacienda válidas para una especie.
    * *Requiere*: `idEspecie`.
* **Listar Tipos de Tributo** (`getTipoTributo`): Catálogo de impuestos y tributos aplicables en la liquidación.
* **Listar Gastos** (`getGastos`): Códigos de conceptos de gastos homologados por AFIP.

---

## 💡 Ejemplos de Uso

### 1. Consultar Razas de Bovinos
Obtener la lista de razas válidas para la especie "Bovinos" (Código 1) para poblar un selector.

**Recurso**: `Tablas LSP`

**Operación**: `Listar Razas`

**Parámetros**:
* idEspecie: `1`

### 2. Consultar Categorías de Porcinos
Ver las categorías fiscales disponibles para porcinos (Código 2).

**Recurso**: `Tablas LSP`

**Operación**: `Listar Categorías`

**Parámetros**:
* idEspecie: `2`

### 3. Obtener Tipos de Tributo
Recuperar todos los códigos de impuestos para configurar las imputaciones contables.

**Recurso**: `Tablas LSP`

**Operación**: `Listar Tipos de Tributo`

---

## ⚠️ Notas Técnicas

* **Datos Oficiales**: Los datos devueltos por este recurso provienen directamente de la normativa de AFIP/ARCA para el régimen de **LSP (Liquidación Sector Pecuario)**. Se recomienda cachear estos resultados y actualizarlos periódicamente, ya que no cambian con frecuencia diaria.
* **Validación**: Utilice estos códigos (IDs) al construir los objetos de `Liquidación` o `Lote` para evitar rechazos por "Código inexistente" o "Valor fuera de rango" al momento de facturar.