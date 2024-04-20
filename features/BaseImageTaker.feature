@BaseImageTaker

# IMPORTANT : This feature file needs to be run only when there is any intended change in the pages, as it updates the images that we use to compare against.

# IMPORTANT : Scenario, Base image, Test image names should be the same
# Scenario name should have "<SCENARIO_NAME> Visual test"
# If the scenario name is "Menu Item Element Visual test"
# Base name image should be "MenuItemElement_BaseImage.PNG"
# Test name image should be "MenuItemElement_TestImage.PNG"
Feature: Takes the Base images of all the pages

  Background: Take Backup of base images
    Given I take the backup of the existing base images

  Scenario: Valid user login
    Given I open the web page
    And I take the base image of the "login" page
    When I login as a "standard" user
    And I take the base image of the "product" page
    And I open the side menu
    And I take the base image of the "sidebar" element
    And I open the page of the first product 
    And I take the base image of the "specific product" page
    And I add this product to the cart
    And I open the cart page
    And I take the base image of the "cart" page
    And I checkout
    And I take the base image of the "checkout" page    
    And I enter my information to continue
       | FirstName | LastName | Zip   |
       | John      | Doe      | 37188 |
    And I take the base image of the "checkout confirmation" page  
    And I confirm my order
    Then I take the base image of the "checkout finish" page  