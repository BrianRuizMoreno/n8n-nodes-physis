# Módulo SACH (Hacienda y Campos)

El módulo **SACH** administra la gestión integral de la comercialización de hacienda y la administración de campos. A diferencia de SAVEC (centrado en granos), SACH se focaliza en el **Ciclo Ganadero**, gestionando desde la recepción de animales en ferias hasta su venta en pista y posterior liquidación.

Gestiona el circuito completo de **Remates Feria**, negocios particulares, movimientos de tropas y la facturación compleja del sector (Liquidación de Compra/Venta).

Este módulo expone recursos clave para el equipo de hacienda, consignatarios y administración.

---

## 🔨 1. Operatoria de Remates y Lotes
Recursos dedicados al corazón transaccional del negocio: la gestión de la feria y la venta.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Remate** | Gestión del ciclo completo del evento: **Descarga** (Recepción), **Embrete** (Corrales) y **Venta** (Martillo). | [Ver detalle](./remate/README.md) |
| **Lote** | Administración de la unidad de venta. Vincula cabezas, kilos, precios y las partes (Comprador/Vendedor). | [Ver detalle](./lote/README.md) |
| **Comprador Remate** | Gestión de la nómina de compradores habilitados y presentes en un remate específico. | [Ver detalle](./compradorRemate/README.md) |

## 💰 2. Facturación y Liquidación
Procesos de cierre administrativo, generación de comprobantes y cuenta corriente.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Liquidación** | Generación del documento "Cuenta de Venta y Líquido Producto". Detalla el negocio financiero y fiscal. | [Ver detalle](./liquidacion/README.md) |
| **Emisión** | Motor de facturación electrónica. Convierte lotes y liquidaciones en comprobantes fiscales válidos. | [Ver detalle](./emision/README.md) |
| **Ajuste** | Gestión de Notas de Débito y Crédito por diferencias de precio, peso o errores de facturación. | [Ver detalle](./ajuste/README.md) |
| **Informe** | Reportes de control de comisiones devengadas y resumen de operaciones del período. | [Ver detalle](./informe/README.md) |

## 🐄 3. Maestros Ganaderos y Entidades
Datos base que clasifican la mercadería y definen a los actores del sistema.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Especie / Raza** | Catálogo zootécnico (Bovinos, Porcinos / Angus, Hereford) y sus códigos oficiales. | [Ver Especie](./especie/README.md) <br> [Ver Raza](./raza/README.md) |
| **Categoría** | Clasificación comercial por edad y sexo (Novillo, Ternero, Vaca conserva). | [Ver detalle](./categoria/README.md) |
| **Tipo Hacienda** | Define el tipo de negocio (Invernada, Faena, Cría) y sus reglas fiscales (IVA, RENSPA). | [Ver detalle](./tipoHacienda/README.md) |
| **Marca** | Diseños y hierros registrados por cliente para acreditar la propiedad del ganado. | [Ver detalle](./marca/README.md) |
| **Cliente** | Gestión de Compradores y Vendedores (Cuentas, RFOCB, Subcuentas). | [Ver detalle](./cliente/README.md) |
| **Establecimiento** | Lugares físicos de origen (Campos/RENSPA) y destino (Frigoríficos/ONCCA). | [Ver detalle](./establecimiento/README.md) |

## ⚙️ 4. Configuraciones y Reglas de Negocio
Definiciones estructurales que regulan el comportamiento del sistema.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Tipo Operación** | Reglas de negocio (ej: "Remate Feria", "Directo") que habilitan validaciones (Corrales, Guías). | [Ver detalle](./tipoOperacion/README.md) |
| **Plazo** | Condiciones de financiación y pago (ej: "30 y 60 días", "Contado"). | [Ver detalle](./plazo/README.md) |
| **Gasto** | Maestro de conceptos facturables (Comisiones, Fletes, Pista) con su configuración impositiva. | [Ver detalle](./gasto/README.md) |
| **Lugar** | Predios feriales o mercados donde se realizan las operaciones. | [Ver detalle](./lugar/README.md) |
| **Tablas LSP** | Consulta de códigos oficiales de AFIP para la Liquidación Pecuaria Electrónica. | [Ver detalle](./tablaLsp/README.md) |

---

### ¿Por dónde empezar?

* Si estás desarrollando una **App para Pista** (carga móvil), comienza por **[Remate](./remate/README.md)** (específicamente Descarga y Embrete) y **[Lote](./lote/README.md)**.
* Si necesitas automatizar la **Facturación**, revisa los flujos de **[Liquidación](./liquidacion/README.md)** y **[Emisión](./emision/README.md)**.
* Si estás configurando una nueva instalación, define primero los **[Lugares](./lugar/README.md)**, **[Tipos de Operación](./tipoOperacion/README.md)** y **[Gastos](./gasto/README.md)**.