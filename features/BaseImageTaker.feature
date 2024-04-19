@AutomatedTests
@BaseImageTaker

Feature: Takes the Base images of all the pages

  Scenario: Valid user login
    Given I open the web page
    And I take the base image of the "login" page
    When I login as a "standard" user
    And I take the base image of the "product" page
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