const {Given, When} = require('@cucumber/cucumber');
const configs = require('../support/configs.js')
const selectors = require('../support/selectors.js')
const driverMethods = require('../support/driver.js')
const jetpack = require("fs-jetpack");
const AdmZip = require("adm-zip");
const fs = require('fs')

/*
This function generates a string based on the current timestamp in the format, DDMMMYYY_HHMMSS. For example, 19Apr2024_160934
*/
function timeStampGenerator() {
        const today = new Date();
      
        const date = today.getDate().toString().padStart(2, '0')
        const month = today.toLocaleString('en-US', { month: 'short' })
        const year = today.getFullYear()
      
        const hours = today.getHours().toString().padStart(2, '0')
        const minutes = today.getMinutes().toString().padStart(2, '0')
        const seconds = today.getSeconds().toString().padStart(2, '0')
      
        return `${date}${month}${year}_${hours}${minutes}${seconds}`
}

/*
Takes the backup of the current base images and stores it in a ZIP with the current timestamp provided by the timeStampGenerator() function 
*/
Given('I take the backup of the existing base images', async function(){
    const backupFileName = timeStampGenerator()
    const sourceFilePath = './features/images/base_images/'
    const backupFilePath = './features/images/base_images/' + backupFileName

    //Moves the existing base images to a new folder by changing its path
    const src = jetpack.cwd(sourceFilePath);
    const dst = jetpack.cwd(backupFilePath);

    src.find({ matching: "*.png" }).forEach(filePath => {
    src.move(filePath, dst.path(filePath));
    });

    //Zip's the created folder
    const zip = new AdmZip()
    const backupZIPFile = backupFilePath+".zip"
    zip.addLocalFolder(backupFilePath)
    zip.writeZip(backupZIPFile)

    //Deletes the created folder once ZIP's done
    fs.rmSync(backupFilePath, { recursive: true, force: true })

})


Given('I open the web page', async function(){
    await driverMethods.LoadAUrl(configs.MainURL)
})

When('I login as a {string} user', async function(UserType){
    switch(UserType){
        case "standard":
            await driverMethods.TypeText(selectors.UserName, configs.ValidUser)
            await driverMethods.TypeText(selectors.Password, configs.Password)
            await driverMethods.ClickButton(selectors.LoginButton)
            break
        case "visual_user":
            await driverMethods.TypeText(selectors.UserName, configs.VisualUser)
            await driverMethods.TypeText(selectors.Password, configs.Password)
            await driverMethods.ClickButton(selectors.LoginButton)
            break            
        default :
            throw new Error("Incorrect user type " + UserType)      
    }
})

When('I take the base image of the {string} page', async function(PageType){
    switch(PageType){
        case "login":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/base_images/LoginPage_BaseImage.png')
            break
        case "product": 
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/base_images/ProductPage_BaseImage.png')
            break
        case "specific product":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/base_images/SpecificProductPage_BaseImage.png')
            break 
        case "cart":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/base_images/CartPage_BaseImage.png')
            break      
        case "checkout":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/base_images/CheckoutPage_BaseImage.png')
            break   
        case "checkout confirmation":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/base_images/CheckoutConfirmationPage_BaseImage.png')
            break      
        case "checkout finish":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/base_images/CheckoutFinishPage_BaseImage.png')
            break   
        default :
            throw new Error("Incorrect Page " + PageType)            
    }
})

When('I open the page of the first product', async function(){
    await driverMethods.ClickNthButton(selectors.ProductList, 0)
})

When('I add this product to the cart', async function(){
    await driverMethods.ClickButton(selectors.AddToCart)
})

When('I open the cart page', async function(){
    await driverMethods.ClickButton(selectors.Cart)
})

When('I checkout', async function(){
    await driverMethods.ClickButton(selectors.Checkout)
})

When('I enter my information to continue', async function(table){

    const UserDetails = table.hashes()

    await driverMethods.TypeText(selectors.FirstName, UserDetails[0]['FirstName'])
    await driverMethods.TypeText(selectors.LastName, UserDetails[0]['FirstName'])
    await driverMethods.TypeText(selectors.ZipCode, UserDetails[0]['FirstName'])

    await driverMethods.ClickButton(selectors.ContinueButton)

})

When('I confirm my order', async function(){
    await driverMethods.ClickButton(selectors.FinishButton)
})