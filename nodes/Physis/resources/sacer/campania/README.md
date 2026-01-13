# Recurso Campaña (SACER)

La **Campaña** actúa como la dimensión temporal principal en el sistema de acopio. Agrupa todas las operaciones (contratos, descargas, fijaciones) bajo un ciclo agrícola específico (ej: "Trigo 2023/2024").

Este recurso permite administrar el ciclo de vida de estas campañas, desde su apertura hasta el cierre administrativo.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la siguiente estructura.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codCampania` | Int | ID de la campaña. Enviar `0` para crear una nueva. |
| `descripcion`* | String | Nombre visible (ej: "Soja 24/25"). |
| `fechaInicio`* | Date | Fecha de apertura (ISO 8601). |
| `fechaCierre`* | Date | Fecha de cierre estimada/real. |
| `cerrada` | Bool | `true` si la campaña ya no admite operaciones. |
| `anioCicloAgricola` | Int | Año del ciclo fiscal asociado (ej: 2024). |
| `usaEtapas` | Bool | Indica si la campaña se divide en etapas productivas. |
| `observaciones` | String | Comentarios internos. |
| `fechasCierre...` | Date | *Opcionales*. Fechas administrativas (`CierreIntermedio`, `UltimaDC`, `UltimoREI`). |

---

## 🛠 Operaciones Disponibles

### Gestión Global (Administración)
Estas operaciones afectan al maestro general de campañas del sistema.
* **Listar Todas** (`getAll`): Obtiene el listado completo de campañas históricas y vigentes.
* **Crear** (`create`): Da de alta un nuevo ciclo agrícola.
* **Actualizar** (`update`): Modifica fechas, descripción o estado de cierre.
* **Eliminar** (`delete`): Borra una campaña (solo si no tiene movimientos vinculados).

### Contexto de Usuario
Permite filtrar campañas según los permisos o la configuración de un usuario específico (útil para portales o apps externas).
* **Campañas de Usuario** (`getByUser`): Lista las campañas habilitadas para un `idUsuario`.
* **Detalle por Usuario** (`getDetailByUser`): Devuelve datos de una campaña específica y valida si es la "Campaña Actual/Predeterminada" para ese usuario.

---

## 💡 Ejemplos de Uso

### 1. Crear una Nueva Campaña
Para dar de alta el ciclo de Maíz del próximo año.
* **Operación**: `Crear`
* **JSON Body**:
```json
{
  "codCampania": 0,
  "descripcion": "Maíz 2024/2025",
  "observaciones": "Ciclo productivo estándar",
  "fechaInicio": "2024-03-01T00:00:00.000Z",
  "fechaCierre": "2025-02-28T00:00:00.000Z",
  "cerrada": false,
  "usaEtapas": false,
  "anioCicloAgricola": 2024
}
```

### 2. Cerrar una Campaña (Update)

Para marcar una campaña como finalizada y prevenir nuevas cargas.

* **Operación**: Actualizar
* **JSON Body**:
```json
{
  "codCampania": 15,
  "descripcion": "Trigo 2022/2023",
  "fechaInicio": "2022-12-01T00:00:00.000Z",
  "fechaCierre": "2023-11-30T00:00:00.000Z",
  "cerrada": true
}
```

### 3. Consultar Campañas de un Productor/Usuario
Si estás integrando un portal de autogestión y necesitas mostrar solo lo relevante para el usuario logueado.

* **Operación**: Campañas de Usuario
* **Parámetro idUsuario**: 45 (ID interno del usuario en Physis).

## ⚠️ Notas Técnicas
* Formato de Fecha: El sistema espera fechas en formato ISO completo, idealmente UTC (ej: YYYY-MM-DDTHH:mm:ss.sssZ).

* Validación de Cierre: Una vez cerrada (cerrada: true), el sistema bloqueará la creación de nuevos contratos o cartas de porte asociados a ese codCampania.