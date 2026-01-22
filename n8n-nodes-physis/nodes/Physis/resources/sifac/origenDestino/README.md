# Recurso Origen Destino (SIFAC)

El recurso **Origen Destino** es un servicio de asistencia lógica para el módulo de transportes y comprobantes.

Su función principal es **sugerir automáticamente** las direcciones de origen y destino para un traslado de mercadería (Objeto `viaje`), basándose en la naturaleza de la operación (Compra vs Venta), el depósito seleccionado y el tercero involucrado. Esto evita la carga manual de domicilios en Remitos y Cartas de Porte.

## 📋 Lógica de Sugerencia

El endpoint determina la dirección del flujo de la mercadería según el `idTipoComprobante`:

1.  **Ventas / Salidas (ej: Remito Venta, Pedido)**:
    * **Origen**: Domicilio del Depósito (La mercadería sale de nuestra empresa).
    * **Destino**: Domicilio del Cliente (La mercadería va al comprador).

2.  **Compras / Entradas (ej: Orden de Compra, Devolución)**:
    * **Origen**: Domicilio del Proveedor/Cliente (La mercadería viene del tercero).
    * **Destino**: Domicilio del Depósito (La mercadería entra a nuestra empresa).

## 🛠 Operaciones Disponibles

### Consultas
* **Obtener Sugerencia** (`getOrigenDestinoSugeridos`): Calcula y devuelve un objeto de estructura `Viaje` con los campos de domicilio precargados.

---

## 💡 Ejemplos de Uso

### 1. Sugerencia para una Venta (Remito)
Estamos haciendo un remito ("REM") desde el depósito "CENTRAL" para el cliente "C001". El sistema debe sugerir que sale de nuestro depósito y va al cliente.

**Recurso**: `Origen Destino` 

**Operación**: `Obtener Sugerencia`

**Parámetros (Query)**:
* idTipoComprobante: `REM`
* deposito: `CENTRAL`
* idCtaAuxi: `C001`

**Respuesta JSON (Simplificada)**:
```json
{
  "calleOrigen": "Av. Nuestra Empresa 1234",
  "localidadOrigen": "Rosario",
  "denominacionOrigen": "Depósito Central",
  
  "calleDestino": "Calle del Cliente 555",
  "localidadDestino": "Córdoba",
  "denominacionDestino": "Cliente Mostrador S.A."
}
```

### 2. Sugerencia para una Orden de Compra
Estamos generando una OC ("OCC") al proveedor "PROV-99". El proveedor nos enviará la mercadería a nuestra sucursal "NORTE".

**Recurso**: ``Origen Destino`` 

**Operación**: ``Obtener Sugerencia``

**Parámetros (Query)**:

* idTipoComprobante: ``OCC``

* deposito: ``NORTE``

* idCtaAuxi: ``PROV-99``

**Respuesta Esperada**:

* **Origen**: Domicilio cargado en la ficha del Proveedor "PROV-99".

* **Destino**: Domicilio configurado en el Depósito "NORTE".

---

## ⚠️ Notas Técnicas
* **Estructura de Respuesta**: Aunque es una sugerencia, retorna un objeto con la estructura completa de ``Viaje`` (similar a la usada en ``Comprobantes`` o ``Ordenes de Compra``). Esto permite mapear la respuesta directamente dentro del body **POST** de esos recursos.

* **Clientes Eventuales**: Si la operación es con un cliente ocasional que no tiene ficha maestra (``idCtaAuxi`` vacío), se puede utilizar el parámetro ``idClienteEventual`` para que el sistema busque el domicilio cargado temporalmente para esa transacción.