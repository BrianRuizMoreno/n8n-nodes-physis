# Recurso CRM (SAVEC)

El recurso **CRM** centraliza la gestión de oportunidades comerciales (Negocios) y el seguimiento de la relación con los clientes. Permite registrar y auditar todo el ciclo de vida de una venta, desde el contacto inicial hasta el cierre del contrato.

Sus funciones principales incluyen:
* **Gestión de Negocios**: Crear oportunidades de venta definiendo cereal, campaña, precio y volumen estimado.
* **Seguimiento (Actividades)**: Registrar llamadas, reuniones o correos asociados a cada negocio.
* **Agenda de Contactos**: Administrar la base de datos de personas de contacto y clientes.
* **Gestión Documental**: Adjuntar archivos (PDFs, imágenes) a los negocios para mantener toda la documentación organizada.

## 📋 Campos Principales (Schema)

Al utilizar la operación **Crear Negocio**, el sistema espera un objeto JSON que representa la oportunidad comercial y, opcionalmente, su actividad inicial.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idEvento` | Int | ID del negocio (0 para crear uno nuevo). | Sí |
| `asunto` | String | Título o descripción breve del negocio. | Sí |
| `idAuxi` | Int | ID del Cliente/Tercero (Cuenta Auxiliar). | Sí |
| `idCtaAuxi` | String | Código de cuenta auxiliar del cliente. | Sí |
| `codCereal` | Int | Grano relacionado (ej: 1-Trigo). | No |
| `codCampania` | Int | Campaña agrícola (ej: 24). | No |
| `precio` | Decimal | Precio estimado u ofertado. | No |
| `tonelada` | Decimal | Volumen estimado en toneladas. | No |
| `eventoEstado` | Int | Estado del negocio (ej: Pendiente, Ganado). | No |
| `actividad` | Array | Lista de actividades iniciales (ver ejemplo). | No |

---

## 🛠 Operaciones Disponibles

### 1. Gestión de Negocios (Oportunidades)
* **Listar Negocios** (`getDeals`): Búsqueda avanzada de negocios con múltiples filtros.
    * *Filtros*: `fechaDesde`, `fechaHasta`, `codCereal`, `idAuxi`, `eventoEstado`, `asunto`.
* **Detalle Negocio** (`getDealDetail`): Obtiene la información completa de un negocio específico junto con su historial de actividades.
* **Crear Negocio** (`createDeal`): Da de alta una nueva oportunidad comercial.
* **Actualizar Negocio** (`updateDeal`): Modifica los datos de cabecera de un negocio existente.
* **Eliminar Negocio** (`deleteDeal`): Borra un negocio y sus datos asociados.

### 2. Actividades (Seguimiento)
Permite registrar la bitácora de interacciones dentro de un negocio.
* **Listar Actividades** (`getActivities`): Consulta el historial de un evento/negocio.
* **ABM Actividades**: `createActivity`, `updateActivity`, `deleteActivity`.

### 3. Contactos y Clientes
* **Listar Contactos** (`getContacts`): Agenda general de contactos.
* **Crear/Actualizar Contacto** (`upsertContact`): Gestión de la libreta de contactos.
* **Listar Clientes** (`getClients`): Obtiene la nómina de clientes disponibles para asociar a negocios.
* **Negocios por Cliente** (`getDealsByClient`): Vista rápida del historial de un cliente específico.

### 4. Archivos Adjuntos
Gestión documental asociada a los negocios.
* **Operaciones**: `getDocuments`, `uploadDocuments`, `downloadDocument`, `deleteDocument`.

---

## 💡 Ejemplos de Uso

### 1. Registrar un Nuevo Negocio con Actividad Inicial
Crear una oportunidad de venta de Soja para la campaña 24, registrando la llamada inicial.
* **Operación**: `Crear Negocio` (`createDeal`)
* **JSON Body**:
    ```json
    {
      "idEvento": 0,
      "asunto": "Venta Soja Campaña 24",
      "codCereal": 2,
      "codCampania": 24,
      "precio": 310.5,
      "tonelada": 500,
      "idAuxi": 1050,
      "idCtaAuxi": "1",
      "observaciones": "Cliente interesado, volver a llamar el lunes.",
      "actividad": [
        {
          "eventoTipo": "Llamada Saliente",
          "fechaInicial": "2024-05-20T10:00:00.000Z",
          "observaciones": "Contacto inicial positivo."
        }
      ]
    }
    ```

### 2. Consultar Negocios Pendientes
Buscar todos los negocios de Trigo (Cereal 1) que estén en un estado específico.
* **Operación**: `Listar Negocios` (`getDeals`)
* **JSON Body (Filtros)**:
    ```json
    {
      "codCereal": 1,
      "eventoEstado": 1
    }
    ```

---

## ⚠️ Notas Técnicas

* **Jerarquía**: El objeto principal es el **Negocio** (o Evento). Las **Actividades** y **Documentos** son hijos que dependen siempre de un `idNegocio` padre.
* **Fechas**: Para las actividades (`fechaInicial`, `fechaFin`) y filtros, utilizar formato ISO 8601.
* **Archivos**: La subida de documentos (`uploadDocuments`) utiliza `multipart/form-data`, mientras que el resto de las operaciones utiliza JSON estándar.