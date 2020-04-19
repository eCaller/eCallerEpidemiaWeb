![cabecera_readme](/docs/img/cabecera_readme.png)

[![logo](/docs/img/logo.png)](https://www.ingenia.es)

> [Versión en **inglés**](https://github.com/eCaller/eCallerEpidemiaWeb/blob/master/README-EN.md)

## Introducción

eCaller Epidemias es una solución software desarrollada por Ingenia (https://www.ingenia.es), al margen de su línea de productos eCaller Emergencias (https://www.ingenia.es/productos/ecaller-emergencias/) y eCaller Ambulancias (https://www.ingenia.es/productos/ecaller-ambulancias/), que ha sido liberada como solución Open Source y licencia GNU GPL v3.0 (https://www.gnu.org/licenses/gpl-3.0.html).

## ¿A quién va dirigida esta solución?

Esta solución ha sido concebida para aquellas empresas, organizaciones, entidades o instituciones públicas y privadas del ámbito sanitario que necesiten disponer de herramientas orientadas a conocer la magnitud y el grado de evolución de los brotes epidémicos de COVID-19 e implementar las acciones necesarias para su contención en una región determinada. En este sentido, la solución suministra un esquema de trabajo basado en los siguientes procesos:

* Detección e identificación de casos sospechosos.
* Gestión, coordinación y seguimiento de las acciones a realizar para cada uno de los casos sospechosos.
* Representación, monitorización y cuantificación del grado de evolución de los brotes epidémicos sobre una región determinada.

## Beneficios

Una implementación coordinada de estos tres procesos permitirá a las distintas organizaciones sanitarias obtener una visión macro y micro de la magnitud de los brotes, conocer individualmente el estado de cada uno de los casos detectados, así como servir de base para orientar los esfuerzos a la implementación de medidas de contención y erradicación de los focos de transmisión.

## Componentes de la solución software

eCaller Epidemias está constituida por dos componentes software:

* **`App móvil`**. Es una herramienta cuyo uso está destinado a los ciudadanos. Los objetivos que se persiguen con su utilización son los siguientes:
    1. Descargar de un elevado volumen de llamadas a los centros de coordinación de las organizaciones sanitarias.
    2. Facilitar al ciudadano un mecanismo sencillo de auto-evaluación para conocer si presenta algún síntoma compatible con el desarrollo de la enfermedad vírica.
    3. Suministrar a cualquier ciudadano una herramienta ágil para comunicar a las organizaciones sanitarias de la posibilidad real de haber contraído el virus.
    4. Dar a conocer a las organizaciones sanitarias los ciudadanos que manifiestan síntomas compatibles con el desarrollo de la enfermedad virica.


* **`Aplicación web`**. Esta herramienta, que es utilizada por personal de la organización sanitaria, ha sido diseñada para cumplir los siguientes objetivos:
    1. Proporcionar un entorno de trabajo para registrar los casos sospechosos notificados por los ciudadanos desde la app móvil.
    2. Disponer de una herramienta centralizada para organizar las citas con los usuarios sospechosos, que deben ser sometidos al test clínico de detección de la enfermedad.
    3. Facilitar un entorno de trabajo con el propósito de registrar información de seguimiento sobre la evolución de cada uno de los casos.
    4. Medición cualitativa y cuantitativamente del grado de evolución de la enfermedad.
    5. Identificación de las zonas de riesgo.

## Instalación
1. Clonar el repositorio en una carpeta local

    * `git clone  https://github.com/eCaller/eCallerEpidemiaWeb.git`
  
    * `cd eCallerEpidemiasWeb`
  
2. Instalación librería
  
    * `npm install`

3. Configuración entorno
    * cp src/config.js.example src/config.js
    * Editar el fichero src/config.js con los valores correctos para el entorno de ejecución

## Ejecución en local
Como requerimiento antes de ejecutar la aplicación debe instalarse y configurarse el proyecto: [eCallerEpidemiaBackEnd](https://github.com/eCaller/eCallerEpidemiaBackEnd/)

1. Ejecución en modo desarrollo

    * `npm run dev`
    
## Ejecución en NGINX mediante contendor Docker

La ejecución de la aplicación en NGINX, mediante contenerdor Docker, se puede hacer de dos formas:

* Creando y ejecutando una imagen creada del proyecto

* Ejecución directamente desde una imagen de NGINX ya existente previamente

### Creación y ejecución de un contenedor Docker

Como pasos previos se deberán realizar los pasos del apartado [Instalación](README.md#Instalación) y seguidamente realizar los siguientes pasos:

1. Creación de la imagen Docker

    `docker build -t ecaller-epidemias/ecaller-epidemias-web .`

2. Ejecución de la imagen Docker

    `docker run -d -p 80:80 --rm --name ecaller-epidemas-web-1 ecaller-epidemias/ecaller-epidemias-web`

## Ejecución directa desde imagen Docker de NGINX-alpine
Como pasos previos se deberán realizar los pasos del apartado [Instalación](README.md#Instalación) y seguidamente realizar los siguientes pasos:

  1. Compilación del proyecto

      `npm run build`
    
  2. Ejecución del contenedor Docker
  
    * En sistemas Windows
  
```        
   docker run -p 80:80 --rm --name ecaller-epidemas-web-1 -v %cd%/dist/:/usr/share/nginx/html/ -d nginx:stable-alpine
       
```

    * En sistemas Linux
```        
   docker run -p 80:80 --rm --name ecaller-epidemas-web-1 -v $PWD/dist:/usr/share/nginx/html -d nginx:stable-alpine
        
```

## Repositorios

* **`App móvil`**.
    - [eCallerEpidemiaMovil](https://github.com/eCaller/eCallerEpidemiaMovil/)

* **`Aplicación web`**.
    - [eCallerEpidemiaWeb](https://github.com/eCaller/eCallerEpidemiaWeb/)
    - [eCallerEpidemiaBackEnd](https://github.com/eCaller/eCallerEpidemiaBackEnd/)

## Descripción funcional

La documentación funcional de la solución software se encuentra disponible en el enlace [Wiki-ReferenciaFuncional](https://github.com/eCaller/eCallerEpidemiaWeb/wiki/documentación-funcional).

## Descripción técnica

La documentación técnica de la solución software se encuentra disponible en el enlace [Wiki-ReferenciaTecnica](https://github.com/eCaller/eCallerEpidemiaWeb/wiki/documentación-técnica).

## Licencia

GNU GPL v3.0 (https://www.gnu.org/licenses/gpl-3.0.html).
