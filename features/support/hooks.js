const {Before, After} = require('@cucumber/cucumber')
const { chromium, firefox, webkit, devices } = require('playwright');

// Increases the default timeout to 1 min, default is 30 sec
var {setDefaultTimeout} = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);


Before(async function () {
    //browser = await chromium.launch({headless: false})
    browser = await chromium.launch({headless: false, channel: 'chrome'}) //-- Launches installed Chrome browser
    const context = await browser.newContext();
    page = await context.newPage();
})


After(async function () {
    await new Promise(r => setTimeout(() => r(), 3000))
    await browser.close()
})