class DriverMethods{

    constructor(){
    }

    async LoadAUrl(url){
        await page.goto(url) 
    }

    async TypeText(element, text){
        await page.locator(element).type(text)
    }

    async ClickButton(element){
        await page.locator(element).click()
    }

    async ClickNthButton(element, Index){
        await page.locator(element).nth(Index).click()
    }

    async TakeScreenshotWithFullPage(path){
        await page.screenshot({path : path, fullPage: true})
    }

    async TakeScreenshotOfAnElement(element, path){
        await page.locator(element).screenshot({ path: path })
    }

}

module.exports = new DriverMethods()