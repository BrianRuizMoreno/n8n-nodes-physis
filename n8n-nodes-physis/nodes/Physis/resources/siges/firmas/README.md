# Recurso Firmas (SIGES)

El recurso **Firmas** permite la gestión de evidencia digital y conformidad de operaciones.

Es fundamental para procesos de **Logística** (Prueba de Entrega) y **Atención al Cliente** (Consentimiento informado), ya que permite vincular una transacción con hasta 3 elementos gráficos probatorios:
1.  **Firma**: El trazo manuscrito digitalizado.
2.  **Imagen 2**: Generalmente usada para el **Anverso del DNI** o una foto de la fachada de entrega.
3.  **Imagen 3**: Generalmente usada para el **Reverso del DNI**.

## 🛠 Operaciones Disponibles

### Consulta
* **Obtener Firma** (`get`): Recupera las imágenes almacenadas asociadas a un ID de firma.

### Alta (Digitalización)
* **Guardar Firma** (`create`): Sube las imágenes y los metadatos de contexto (GPS, Fecha, Identidad del firmante).

---

## 💡 Ejemplos de Uso

### 1. Registrar Entrega de Mercadería
El repartidor entrega el pedido y captura la firma del cliente en una tablet, además de sacarle una foto al DNI.

**Recurso**: `Firmas` 

**Operación**: `Guardar Firma`

**Configuración**:

* Nombre: `"Juan"`
* Apellido: `"Perez"`
* Propiedad Binaria Firma: `data_firma` (Imagen SVG/PNG de la firma).
* Propiedad Binaria Extra 1: `data_foto_dni` (Foto JPG).

**JSON Adicional**:
```json
{
  "NumeroDocumento": "20123456",
  "CoordenadaX": -34.6037, // Latitud GPS
  "CoordenadaY": -58.3816  // Longitud GPS
}
```

### 2. Auditoría de Operación
Recuperar la firma del remito 500 para verificar quién recibió la carga.

Recurso: `Firmas` 

**Operación**: `Obtener Firma`

**Parámetro**: 

* codFirma: `500`

---

## ⚠️ Notas Técnicas

* **Binarios Múltiples**: Para subir las 3 imágenes en un solo paso, el nodo de entrada en n8n debe tener múltiples propiedades binarias (ej: usar un nodo Merge o HTTP Request previo que acumule los binarios en `data`, `img2`, `img3`).

* **Coordenadas**: Los campos `CoordenadaX` e `Y` se utilizan para georreferenciar el lugar exacto donde se perfeccionó el acto de la firma (útil para disputas logísticas).