const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  // Función para extraer datos de PYPL
  const getPYPLData = async () => {
    const page = await browser.newPage();
    try {
      await page.goto('https://pypl.github.io/PYPL.html', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('table', { timeout: 60000 }); // Ajusta el selector según el DOM actual

      const data = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table tbody tr'));
        return rows.map((row) => {
          const cols = row.querySelectorAll('td');
          if (cols.length >= 2) {
            return {
              ranking: cols[0].innerText.trim(),
              language: cols[2].innerText.trim(),
            };
          }
        }).filter(item => item !== undefined);
      });

      await page.close();
      return data.slice(0, 10);//limito a que muestre los primeros 10 resultados
    } catch (error) {
      console.error('Error al extraer datos de PYPL:', error);
      await page.close();
      return [];
    }
  };

  // Función para extraer datos de TIOBE
  const getTIOBEData = async () => {
    const page = await browser.newPage();
    try {
      await page.goto('https://www.tiobe.com/tiobe-index/', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.table.table-striped.table-top20', { timeout: 60000 });

      const data = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('.table-top20 tbody tr'));
        return rows.map((row) => {
          const cols = row.querySelectorAll('td');
          if (cols.length >= 6) {
            return {
              ranking: cols[0].innerText.trim(),
              language: cols[4].innerText.trim(),
            };
          }
        }).filter(item => item !== undefined);
      });

      await page.close();
      return data.slice(0, 10); //limito a que muestre los primeros 10 resultados
    } catch (error) {
      console.error('Error al extraer datos de TIOBE:', error);
      await page.close();
      return [];
    }
  };

  // Obtener datos de ambos sitios en paralelo
  const [pyplData, tiobeData] = await Promise.all([getPYPLData(), getTIOBEData()]);

  // Crear y guardar el archivo Excel
  const workbook = xlsx.utils.book_new();

  const tiobeWorksheet = xlsx.utils.json_to_sheet(tiobeData);
  xlsx.utils.book_append_sheet(workbook, tiobeWorksheet, 'lenguajes populares TIOBE');

  const pyplWorksheet = xlsx.utils.json_to_sheet(pyplData);
  xlsx.utils.book_append_sheet(workbook, pyplWorksheet, 'lenguajes populares PYPL');

  xlsx.writeFile(workbook, 'Ranking_Languages.xlsx');
  console.log('Archivo Excel generado: Ranking_Languages.xlsx');

  await browser.close();
})();