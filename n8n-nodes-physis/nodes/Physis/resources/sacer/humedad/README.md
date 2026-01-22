# Recurso Humedad (SACER)

El recurso **Humedad** administra las tablas de conversión de merma por humedad para cada cereal.

En el acopio de granos, si la mercadería supera el estándar de humedad base, se aplica un descuento de peso (merma) y gastos de secado. Este nodo permite configurar la relación exacta: **% Humedad = % Merma**.

## 📋 Estructura de Datos (Schema)

A diferencia de otros recursos, la creación suele admitir una **lista** de valores para cargar la tabla de una sola vez.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codCereal`* | Int | Código del cereal al que aplica la tabla. |
| `porcHumedad`* | Decimal | El valor de humedad medido (ej: 14.5). |
| `merma`* | Decimal | El porcentaje a descontar de los kilos (ej: 1.2). |
| `idHumedad` | Int | Identificador único interno (para eliminación). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar por Cereal** (`getAll`): Devuelve la tabla de mermas completa para un cereal específico.
    * *Parámetro*: `codCereal` (Obligatorio).
* **Obtener Valor** (`get`): Consulta la merma para una humedad específica en un cereal.
    * *Ruta*: `/api/sacer/humedades/{codCereal}/{porcHumedad}`

### ABM (Escritura)
* **Crear / Cargar Tabla** (`create`): Permite insertar uno o varios registros de merma.
* **Actualizar** (`update`): Modifica el porcentaje de merma para una humedad dada.
* **Eliminar** (`delete`): Borra una entrada de la tabla.

---

## 💡 Ejemplos de Uso

### 1. Cargar Tabla de Merma para Maíz
Definir que para 14.5% de humedad corresponde 1.5% de merma, y para 15% corresponde 2%.
**Operación**: `Crear`
**JSON Body** (Array):
```json
[
  {
    "codCereal": 2,
    "porcHumedad": 14.5,
    "merma": 1.5
  },
  {
    "codCereal": 2,
    "porcHumedad": 15.0,
    "merma": 2.0
  }
]
```

### 2. Consultar Tabla de Soja
Ver toda la escala de descuentos vigente para Soja. 

**Operación**: Listar por Cereal 
**Parámetro codCereal**: 1 (Soja).

---

## ⚠️ Notas Técnicas
* **Carga Masiva**: La operación POST está diseñada para recibir un Array de objetos. Esto es ideal para inicializar un nuevo cereal importando la tabla estándar de la cámara arbitral.

* **Precisión**: Los campos porcHumedad y merma soportan decimales (Double). Asegúrate de usar punto . como separador decimal.

* **Uso en Carta de Porte**: El sistema usa estos datos automáticamente al ingresar una Carta de Porte. Si la humedad ingresada no existe en la tabla, el sistema podría interpolar o rechazar el cálculo dependiendo de la configuración global.