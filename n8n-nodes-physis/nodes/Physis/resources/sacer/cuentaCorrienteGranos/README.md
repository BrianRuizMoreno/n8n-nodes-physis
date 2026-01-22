# Recurso Cuenta Corriente Granos (SACER)

El recurso **Cuenta Corriente Granos** permite consultar el saldo físico de los productores. A diferencia de la cuenta corriente contable (dinero), esta herramienta gestiona **Kilos**.

Permite responder preguntas como:
* ¿Cuántas toneladas entregó el productor en esta campaña?
* ¿Qué cantidad de grano tiene "A Fijar"?
* ¿Cuánto stock físico queda pendiente de certificar o liquidar?

## 📋 Filtros de Consulta

Al ser un recurso de solo lectura (Consultas), no se envían objetos JSON para crear datos. En su lugar, se utilizan parámetros de filtrado para afinar la búsqueda.

| Parámetro | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idAuxi` | Int | Código del Productor/Tercero. | Sí |
| `idCtaAuxi` | String | Cuenta auxiliar (ej: "1"). | Sí |
| `fechaDesde` | Date | Inicio del período a consultar. | No |
| `fechaHasta` | Date | Fin del período. | No |
| `codCampania` | Int | Filtrar por ciclo agrícola (ej: 24). | No |
| `codCereal` | Int | Filtrar por grano (ej: 1-Trigo). | No |
| `codPlanta` | Int | Filtrar entregas en una planta específica. | No |
| `nroContrato` | String | Filtrar movimientos de un contrato puntual. | No |

---

## 🛠 Operaciones Disponibles

### 1. Consultar Movimientos (Detalle)
* **Operación**: `getMovimientos` (o ruta raíz `/cta-cte-granos`).
* **Descripción**: Devuelve el "Libro Mayor" físico. Lista cada carta de porte, certificación, liquidación y ajuste que compone el saldo.
* **Uso**: Auditoría detallada de operaciones.

### 2. Consultar Totales (Resumen)
* **Operación**: `getTotales`.
* **Descripción**: Devuelve un objeto sumarizado con los saldos acumulados.
* **Datos típicos**: Kilos Entregados, Kilos a Fijar, Kilos Pendientes de Liquidar.
* **Uso**: Ideal para mostrar en tableros (dashboards) o enviar resúmenes rápidos por WhatsApp/Email al productor.

### 3. Informe de Totales
* **Operación**: `getInformeTotales`.
* **Descripción**: Reporte avanzado que permite agrupar y visualizar saldos con opciones extra como `conDetallePlanta` o `conSaldo`.

---

## 💡 Ejemplos de Uso

### 1. Obtener el "Estado de Silo" de un Productor
Para saber cuánto maíz de la campaña actual tiene entregado el cliente.
* **Operación**: `Consultar Totales`
* **Parámetros**:
    * `idAuxi`: `1050`
    * `codCereal`: `2` (Maíz)
    * `codCampania`: `24`

### 2. Auditar un Contrato Específico
Ver todos los movimientos (entregas y aplicaciones) relacionados con el contrato "0001-555".
* **Operación**: `Consultar Movimientos`
* **Parámetros**:
    * `nroContrato`: `0001-555`
    * `idAuxi`: `1050`

---

## ⚠️ Notas Técnicas

* **Diferencia con SIGES**: Este recurso devuelve **KILOS**, no importes monetarios. Para deuda en pesos/dólares, utilizar el módulo `SIGES > Cuenta Corriente`.
* **Fechas**: Si no se especifican `fechaDesde` y `fechaHasta`, el sistema suele traer el histórico completo o el rango por defecto de la campaña activa (dependiendo de la configuración del servidor).
* **Interpretación de Signos**: Generalmente, los ingresos de mercadería (Cartas de Porte) suman, y las salidas (Ventas/Liquidaciones/Retiros) restan.