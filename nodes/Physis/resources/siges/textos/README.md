# Recurso Textos (SIGES)

El recurso **Textos** administra la biblioteca de frases, cláusulas y plantillas del sistema.

Su objetivo es estandarizar comunicaciones y reducir la carga manual. En lugar de escribir manualmente una observación legal en cada factura o el cuerpo de un email de reclamo, el usuario selecciona un código de texto predefinido.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idTexto` | Int | Identificador único. |
| `tipoTexto` | Int | Categoría lógica (ej: 1=Observaciones, 2=Leyendas Legales, 3=Plantillas Email). |
| `descripcion` | String | Título corto para identificarlo en un combo (ej: "Cláusula Dólar"). |
| `texto` | String | El contenido extenso (puede ser multilínea). |
| `porDefecto` | Boolean | Indica si este texto debe sugerirse automáticamente al crear un nuevo registro de su tipo. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Textos** (`getAll`): Recupera las plantillas disponibles. Se recomienda filtrar por `TipoTexto` para obtener solo las relevantes para el contexto actual (ej: solo textos para Facturas).
* **Obtener Texto** (`get`): Recupera el contenido completo de una plantilla específica.

### Gestión
* **Crear / Modificar** (`create`, `update`): Permite a los administradores definir nuevas plantillas o corregir la redacción de las existentes.
* **Eliminar** (`delete`): Borra una plantilla obsoleta.

---

## 💡 Ejemplos de Uso

### 1. Obtener Leyendas para Facturas
Llenar un selector en la pantalla de facturación con las observaciones disponibles (asumiendo que el Tipo 5 corresponde a "Observaciones de Factura").

**Recurso**: `Textos` 

**Operación**: `Listar Textos`

**Parámetro**: 

* Tipo de Texto: `5`

### 2. Crear Plantilla de Email de Mora
Guardar un texto estándar para enviar a clientes con deuda vencida.

**Recurso**: `Textos` 

**Operación**: `Crear Texto`

**JSON Body**:
```json
{
  "tipoTexto": 10, // Supongamos 10 = Emails
  "descripcion": "Reclamo 1er Aviso",
  "texto": "Estimado cliente, le recordamos que posee facturas vencidas. Por favor regularice su situación.",
  "porDefecto": true
}
```

---
## ⚠️ Notas Técnicas
* **Uso en Reportes**: Muchos reportes del sistema (impresión de facturas, remitos) pueden configurarse para incrustar automáticamente el contenido de estos textos basándose en su ID.

* **Delete por Query**: La operación de borrado utiliza Query String (**DELETE** `/textos?idTexto=...`) en lugar de Path parameter.