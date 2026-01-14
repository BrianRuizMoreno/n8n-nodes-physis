# Recurso Comprador Remate (SACH)

El recurso **Comprador Remate** permite administrar la nómina de compradores que participan o están autorizados en un Remate Feria específico. Su función es vincular a los clientes (Terceros) con un evento de remate particular, facilitando la gestión de la pista y la facturación posterior.

Permite listar los compradores habilitados, agregar nuevos participantes y depurar la lista (eliminar uno o todos).

## 📋 Campos Principales

A diferencia de otros recursos que envían un objeto complejo en el cuerpo, este recurso trabaja principalmente mediante **Parámetros** que identifican el remate y el comprador.

| Parámetro | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `IdPuestoCarga` | Int | Código del puesto o lugar físico del remate. | Sí |
| `IdRemateFeria` | Int | Identificador único del evento de remate. | Sí |
| `idCtaAuxi` | String | Código de cuenta auxiliar del cliente comprador. | Sí* |

*\* El campo `idCtaAuxi` es obligatorio solo para agregar o eliminar un comprador específico.*

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Compradores** (`getAll`): Devuelve la lista de compradores asociados a un remate.
    * *Requiere*: `IdPuestoCarga` y `IdRemateFeria`.

### Gestión (Escritura)
* **Agregar Comprador** (`create`): Vincula un cliente a un remate existente.
* **Eliminar Comprador** (`delete`): Quita a un cliente específico de la lista del remate.
* **Eliminar Todos** (`deleteAll`): Borra la nómina completa de compradores para ese remate (limpieza).

---

## 💡 Ejemplos de Uso

### 1. Agregar un Comprador al Remate
Vincular al cliente "C001" al Remate 500 realizado en el Puesto 1.

**Recurso**: `Comprador Remate`

 **Operación**: `Agregar Comprador`

**JSON Body / Parámetros**:
```json
{
  "IdPuestoCarga": 1,
  "IdRemateFeria": 500,
  "idCtaAuxi": "C001"
}
```

### 2. Listar Participantes
Ver quiénes están anotados en el remate actual.

**Recurso**: ``Comprador Remate``

**Operación**: ``Listar Compradores`` 

**Parámetros**:

* IdPuestoCarga: ``1``

* IdRemateFeria: ``500``

---

## ⚠️ Notas Técnicas
* **Parámetros Query**: Según la especificación, estas operaciones reciben los datos principalmente como parámetros de consulta (Query String), incluso en la operación POST. Asegúrese de enviar los IDs correctos.

* **Depuración**: La operación ``deleteAll`` es destructiva y elimina todas las asignaciones del remate indicado sin pedir confirmación por cada comprador. Úsela con precaución.