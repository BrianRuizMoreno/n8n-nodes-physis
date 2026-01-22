# Recurso Historia (Historia Clínica) (SIGES)

El recurso **Historia** permite el acceso a expedientes médicos o veterinarios dentro del ecosistema SIGES.

Es utilizado para recuperar la ficha clínica completa de un paciente, generalmente integrándose con sistemas de frontend específicos (como visores web de historias clínicas).

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codigohistoria` | String | ID del expediente. |
| `key` | String | Llave de acceso para validar la sesión o el permiso sobre ese expediente específico. |
| `servidor` | String | Parámetro de enrutamiento en infraestructuras con múltiples nodos de base de datos. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Obtener Historia Clínica** (`get`): Devuelve la estructura de datos del paciente, incluyendo antecedentes, evoluciones y datos filiatorios.

---

## 💡 Ejemplos de Uso

### 1. Consultar Ficha de Paciente
Recuperar la historia clínica "HC-9922" utilizando una llave de sesión temporal.

**Recurso**: `Historia` 

**Operación**: `Obtener Historia Clínica`

**Parámetros**:

* codigohistoria: `HC-9922`
* key: `abc-123-token-seguro`

---

## ⚠️ Notas Técnicas

* **Seguridad**: Dado que se trata de información sensible (datos de salud), el parámetro `key` suele ser obligatorio o rotativo dependiendo de la configuración de seguridad del servidor Physis.