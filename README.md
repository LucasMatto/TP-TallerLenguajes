# TP-TallerLenguajes

Este es un proyecto para el **Taller de Lenguajes** donde se implementa un script de **web scraping** que extrae datos de los índices 
de lenguajes de programación más populares (PYPL y TIOBE) y guarda los resultados en un archivo Excel.

## Descripción

El script utiliza **Puppeteer** para realizar scraping de las páginas web de **PYPL** (PopularitY of Programming Language) y **TIOBE**,
 dos índices populares que miden la popularidad de los lenguajes de programación en función de diversas métricas. Los datos extraídos incluyen el **ranking** y el **lenguaje de programación**.

Los resultados se guardan en un archivo Excel que contiene dos hojas:
- **lenguajes populares TIOBE**
- **lenguajes populares PYPL**

## Requisitos

- **Node.js** (versión 14 o superior)
- **NPM** (gestor de paquetes de Node)

## Instalación

1. Clona este repositorio en tu máquina local:
  - Ejecutar desde bash
    git clone https://github.com/LucasMatto/TP-TallerLenguajes.git

2 - instalar las dependencias del proyecto
   - Ejecutar desde bash
     npm install puppeteer xlsx

## Uso
 - Ejecuta el script para realizar el web scraping y generar el archivo Excel:
 - Ejecutar desde bash
   node index.js

 - El script descargará los datos de los rankings de lenguajes de programación desde las páginas de PYPL y TIOBE, y los guardará en un archivo llamado Ranking_Languages.xlsx.

 - El archivo Excel generado tendrá dos hojas con los datos de los 10 lenguajes más populares según cada índice.

 ## Estructura del Proyecto

   ├── index.js          # Script principal para realizar scraping
   ├── package.json      # Archivo de configuración de NPM
   ├── package-lock.json # Bloqueo de dependencias
   └── README.md         # Este archivo

 ## Tecnologías Utilizadas

 - Puppeteer: Librería para realizar scraping web de forma automatizada.
 - xlsx: Librería para crear y manipular archivos Excel.
