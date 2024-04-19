const {Before, After} = require('@cucumber/cucumber')
const { chromium, firefox, webkit, devices } = require('playwright');
const fs = require('fs');

// Increases the default timeout to 1 min, default is 30 sec
var {setDefaultTimeout} = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);


Before(async function () {
    //browser = await chromium.launch({headless: false})
    browser = await chromium.launch({headless: false, channel: 'chrome'}) //-- Launches installed Chrome browser
    const context = await browser.newContext();
    page = await context.newPage();
})


After(async function (scenario) {

    await new Promise(r => setTimeout(() => r(), 3000))

    if (scenario.result.status === "FAILED") {

        const scenarioName = (scenario.pickle.name).replace("Visual test", "").replaceAll(" ", "")

        var world = this
    
        const base64BaseImage = fs.readFileSync('./features/images/base_images/'+scenarioName+'_BaseImage.png')
        const base64TestImage = fs.readFileSync('./features/images/test_images/'+scenarioName+'_TestImage.png')
    
        world.attach(Buffer.from(base64BaseImage).toString('base64'), "base64:image/png")
        world.attach(Buffer.from(base64TestImage).toString('base64'), "base64:image/png")

    }

    await browser.close()
})