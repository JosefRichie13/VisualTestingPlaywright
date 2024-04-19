const {Given, When, Then} = require('@cucumber/cucumber');
const configs = require('../support/configs.js')
const selectors = require('../support/selectors.js')
const driverMethods = require('../support/driver.js')

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
            throw new Exception("Incorrect user type " + UserType)      
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
            throw new Exception("Incorrect Page " + PageType)            
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