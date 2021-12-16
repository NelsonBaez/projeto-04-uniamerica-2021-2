const {Builder, By, Key, util} = require('selenium-webdriver');

async function example(){
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000");
  await driver.findElement(By.id("link-suppliers")).click();
  await driver.findElement(By.id("supplier-new")).click();
  await driver.findElement(By.name("name")).sendKeys("amazon");
  await driver.findElement(By.id("cadastrar")).click();
  await driver.findElement(By.id("link-suppliers")).click();
}

example();