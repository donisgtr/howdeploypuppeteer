const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
    try {
        const browser = await puppeteer.launch({ headless: true }); // Define se o browser será exibido ou não
        const page = await browser.newPage();
        await page.goto("https://cliente.apdata.com.br/dicon/", {
          waitUntil: "networkidle2",
        });
    
        // Clicando no botão de aceitar os cookies
        await page.waitForSelector("#button-1020");
        await page.click("#button-1020");
        
        /*

        // Preenchendo o usuário de LOGIN
        await page.waitForSelector("#ext-156");
        await page.click("#ext-156");
        await page.type("#ext-156", "2738045");
        // Preenchendo a senha
        await page.waitForSelector("#ext-155");
        await page.click("#ext-155");
        await page.type("#ext-155", "Public@99");
        // Clicando no botão de login
        await page.waitForSelector("#ext-151");
        await page.click("#ext-151");
    
        // Clicando no botão de login
        await page.waitForSelector("#ext-151");
        await page.click("#ext-151");

        // Esperando a navegação completar
        try {
          await page.waitForNavigation({ timeout: 90000, waitUntil: "networkidle2" });
        } catch (error) {
          console.error("Erro de navegação:", error.message);
        }

        */

        // Preenchendo o usuário de BATER PONTO
        await page.waitForSelector("#ext-135");
        await page.click("#ext-135");
        await page.type("#ext-135", "2738045");
        // Preenchendo a senha de BATER PONTO
        await page.waitForSelector("#ext-137");
        await page.click("#ext-137");
        await page.type("#ext-137", "Public@99");

        
        // Clicando no botão de login
        await page.waitForSelector("#ext-139");
        await page.click("#ext-139");


        // Capturando o screenshot
        const screenshotBuffer = await page.screenshot();
    
        await browser.close();

    
        // Definindo o tipo de conteúdo da resposta como imagem
        res.setHeader("Content-Type", "image/png");
    
        // Enviando a imagem como resposta binária
        res.end(screenshotBuffer, "binary");
      } catch (error) {
        console.error("Erro na automação:", error.message);
        res.status(500).json({ error: "Erro ao realizar a automação." });
      }
      
};

module.exports = { scrapeLogic };