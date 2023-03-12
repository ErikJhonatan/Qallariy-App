# Qallariy · Distribución de utilidades

Aplicación JavaScript para distribuir la utilidad de una inversión entre socios según su aporte y guardar resultados en el navegador.

## Qué resuelve

Permite registrar una actividad, el capital inicial y final y los aportes de los socios. Calcula la utilidad total como capital final menos capital inicial y reparte esa utilidad de forma proporcional al aporte de cada socio.

El código guarda resultados en `localStorage` para consultarlos posteriormente desde el mismo navegador.

## Organización

- `script/app.js`: cálculo de participación y utilidad por socio.
- `script/resultsApp.js`: creación, persistencia y eliminación de resultados.
- `script/main.js`: flujo de captura de datos.
- `script/showResult.js`: presentación de resultados.
- `index.html`, `css/` y `assets/`: interfaz y recursos.

## Uso local

Sirve la carpeta con un servidor estático y abre `index.html`. La aplicación utiliza módulos JavaScript del navegador. No requiere un backend propio ni tiene un archivo de dependencias npm.

## Estado

Proyecto académico. Utiliza números de JavaScript y redondeo a dos decimales; no debe presentarse como un motor contable de dinero exacto. Esta revisión no ejecutó pruebas ni verificó un despliegue.

## Licencia

Consulta `LICENSE.md`. La página de presentación del proyecto está en [landing-page-qallary](https://github.com/ErikJhonatan/landing-page-qallary).

## Cambios de comportamiento

La distribución exige capital positivo y aportes positivos que sumen el capital inicial. Se calcula en céntimos y los céntimos restantes se asignan a los mayores restos proporcionales para conservar la utilidad total. Un historial dañado se omite al leerlo; los nombres se presentan como texto.
