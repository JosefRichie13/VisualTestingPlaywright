const {When} = require('@cucumber/cucumber');
const driverMethods = require('../support/driver.js')
const selectors = require('../support/selectors.js')
const {assert} = require('chai');
const Pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const fs = require('fs');


function visuallyTestTheImages(baseImage, currentImage){

    const baseImageForComparison = PNG.sync.read(fs.readFileSync(baseImage))
    const currentImageForComparison = PNG.sync.read(fs.readFileSync(currentImage))
    const { width, height } = baseImageForComparison
    const diff = new PNG({ height, width })
    return Pixelmatch(baseImageForComparison.data, currentImageForComparison.data, diff.data, width, height)
    
}

When('I verify if the {string} page image matches the base image', async function(PageType){
    switch(PageType){
        case "login":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/LoginPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/LoginPage_BaseImage.png', './features/images/test_images/LoginPage_TestImage.png'), 0 , 
                "Please manually compare the top Base image with the below Current image")
            break
        case "product": 
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/ProductPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/ProductPage_BaseImage.png', './features/images/test_images/ProductPage_TestImage.png'), 0 , 
            "Please manually compare the top Base image with the below Current image")
            break
        case "specific product":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/SpecificProductPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/SpecificProductPage_BaseImage.png', './features/images/test_images/SpecificProductPage_TestImage.png'), 0 , 
            "Please manually compare the top Base image with the below Current image")
            break 
        case "cart":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/CartPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/CartPage_BaseImage.png', './features/images/test_images/CartPage_TestImage.png'), 0 , 
            "Please manually compare the top Base image with the below Current image")
            break      
        case "checkout":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/CheckoutPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/CheckoutPage_BaseImage.png', './features/images/test_images/CheckoutPage_TestImage.png'), 0 , 
            "Please manually compare the top Base image with the below Current image")
            break   
        case "checkout confirmation":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/CheckoutConfirmationPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/CheckoutConfirmationPage_BaseImage.png', './features/images/test_images/CheckoutConfirmationPage_TestImage.png'), 0 , 
            "Please manually compare the top Base image with the below Current image")
            break      
        case "checkout finish":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/CheckoutFinishPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/CheckoutFinishPage_BaseImage.png', './features/images/test_images/CheckoutFinishPage_TestImage.png'), 0 , 
            "Please manually compare the top Base image with the below Current image")
            break   
        default :
            throw new Error("Incorrect Page " + PageType)            
    }
})


When('I verify if the {string} element image matches the base image', async function(ElementType){
    switch(ElementType){
        case "menu item":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotOfAnElement(selectors.MenuItems, './features/images/test_images/MenuItemElement_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/MenuItemElement_BaseImage.png', './features/images/test_images/MenuItemElement_TestImage.png'), 0 , 
                "Please manually compare the top Base image with the below Current image")
            break
        default :
            throw new Error("Incorrect Page " + PageType)            
    }
})