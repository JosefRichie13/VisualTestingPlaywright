import { Before, After } from '@cucumber/cucumber';
import { chromium, firefox, webkit, devices } from 'playwright';
import { readFileSync } from 'fs';

// Increases the default timeout to 1 min, default is 30 sec
import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(60 * 1000);


Before(async function () {
    //browser = await chromium.launch({headless: false})
    global.browser = await chromium.launch({headless: false, channel: 'chrome'}) //-- Launches installed Chrome browser
    global.context = await browser.newContext();
    global.page = await context.newPage();
})


After(async function (scenario) {

    await new Promise(r => setTimeout(() => r(), 3000))

    // If the scenario fails, we attach both the base image and the current image in the report for manual comparison
    if (scenario.result.status === "FAILED") {

        // All the scenario names should have the naming convention like, "Cart Page Visual test" 
        // We extract "Cart Page" from the above string and remove the spaces to make it "CartPage"
        const scenarioName = (scenario.pickle.name).replace("Visual test", "").replaceAll(" ", "")

        var world = this

        // Based on this, "CartPage", we get the base64encoding of the images and attach both of them to the report for manual comparison
        const base64BaseImage = readFileSync('./features/images/base_images/'+scenarioName+'_BaseImage.png')
        const base64TestImage = readFileSync('./features/images/test_images/'+scenarioName+'_TestImage.png')
    
        world.attach(Buffer.from(base64BaseImage).toString('base64'), "base64:image/png")
        world.attach(Buffer.from(base64TestImage).toString('base64'), "base64:image/png")

    }

    await browser.close()
})