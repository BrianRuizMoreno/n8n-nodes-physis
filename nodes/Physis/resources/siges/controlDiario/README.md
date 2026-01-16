# Recurso Control Diario (Conciliación) (SIGES)

El recurso **Control Diario** permite realizar la conciliación masiva entre los movimientos registrados en el ERP (Physis) y los informados por la entidad financiera (Billetera Virtual / Banco).

El proceso consta de dos pasos obligatorios:
1.  **Subida (Upload)**: Se envía el archivo físico (.txt, .csv, .xls) provisto por el banco al servidor. El servidor lo almacena temporalmente y devuelve un identificador (Path).
2.  **Procesamiento (Report)**: Se solicita al servidor que lea ese archivo (usando el Path) y devuelva el resultado del cruce de datos.

## 🛠 Operaciones Disponibles

### Conciliación
* **Subir Archivo Bancario** (`uploadFile`): Envía el archivo binario. Retorna un `filePath` que actúa como ID de sesión de conciliación.
* **Obtener Informe de Control** (`getReport`): Ejecuta la lógica de comparación y devuelve el detalle de:
    * Movimientos coincidentes.
    * Movimientos en Physis no en Banco.
    * Movimientos en Banco no en Physis.

---

## 💡 Ejemplos de Uso

### Flujo Típico de Conciliación

Este proceso suele ejecutarse secuencialmente en un workflow.

**Paso 1: Subir el archivo**
El usuario recibe un email con el adjunto `rendicion_20260115.txt`.
**Recurso**: `ControlDiario` 

**Operación**: `Subir Archivo Bancario`

**Parámetro**: 

* binaryPropertyName: `data`

> *Salida*: `{ "result": "C:\\Temp\\rendicion_20260115.txt" }` (Guardamos esto como `filePath`).

**Paso 2: Obtener Resultados**
Usar el path del paso anterior para ver las diferencias.
**Recurso**: `ControlDiario` 

**Operación**: `Obtener Informe de Control`

**Parámetro**: 

* filePath: `C:\\Temp\\rendicion_20260115.txt`

> *Salida*:
> ```json
> {
>   "totalConciliado": 150000,
>   "diferencias": [
>     { "idMovimiento": 55, "estado": "No existe en Banco" }
>   ]
> }
> ```

---

## ⚠️ Notas Técnicas

* **Manejo de Binarios**: Este nodo requiere que el archivo exista previamente en el flujo de n8n (leído por un nodo *Read Binary File*, *Email Trigger*, o *HTTP Request*).
* **Persistencia**: Los archivos subidos suelen ser temporales. Se recomienda ejecutar el paso de reporte inmediatamente después de la subida.