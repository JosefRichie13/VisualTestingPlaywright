const {Given, When, Then} = require('@cucumber/cucumber');
const configs = require('../support/configs.js')
const selectors = require('../support/selectors.js')
const driverMethods = require('../support/driver.js')
const {assert, expect} = require('chai');
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
                "Please manually compare these images at /base_images/LoginPage_BaseImage.png and /test_images/LoginPage_TestImage.png")
            break
        case "product": 
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/ProductPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/ProductPage_BaseImage.png', './features/images/test_images/ProductPage_TestImage.png'), 0 , 
            "Please manually compare these images at /base_images/ProductPage_BaseImage.png and /test_images/ProductPage_TestImage.png")
            break
        case "specific product":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/SpecificProductPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/SpecificProductPage_BaseImage.png', './features/images/test_images/SpecificProductPage_TestImage.png'), 0 , 
            "Please manually compare these images at /base_images/SpecificProduct_BaseImage.png and /test_images/SpecificProduct_TestImage.png")
            break 
        case "cart":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/CartPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/CartPage_BaseImage.png', './features/images/test_images/CartPage_TestImage.png'), 0 , 
            "Please manually compare these images at /base_images/CartPage_BaseImage.png and /test_images/CartPage_TestImage.png")
            break      
        case "checkout":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/CheckoutPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/CheckoutPage_BaseImage.png', './features/images/test_images/CheckoutPage_TestImage.png'), 0 , 
            "Please manually compare these images at /base_images/CheckoutPage_BaseImage.png and /test_images/CheckoutPage_TestImage.png")
            break   
        case "checkout confirmation":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/CheckoutConfirmationPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/CheckoutConfirmationPage_BaseImage.png', './features/images/test_images/CheckoutConfirmationPage_TestImage.png'), 0 , 
            "Please manually compare these images at /base_images/CheckoutConfirmation_BaseImage.png and /test_images/CheckoutConfirmation_TestImage.png")
            break      
        case "checkout finish":
            await new Promise(r => setTimeout(() => r(), 2000))
            await driverMethods.TakeScreenshotWithFullPage('./features/images/test_images/CheckoutFinishPage_TestImage.png')
            await new Promise(r => setTimeout(() => r(), 2000))
            assert.equal(visuallyTestTheImages('./features/images/base_images/CheckoutFinishPage_BaseImage.png', './features/images/test_images/CheckoutFinishPage_TestImage.png'), 0 , 
            "Please manually compare these images at /base_images/CheckoutFinishPage_BaseImage.png and /test_images/CheckoutFinishPage_TestImage.png")
            break   
        default :
            throw new Error("Incorrect Page " + PageType)            
    }
})


