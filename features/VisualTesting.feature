@AutomatedTests
@VisualTests

Feature: Verifies if current webpage visually matches the base images

  Scenario: Login Page Visual test
    Given I open the web page
    Then I verify if the "login" page image matches the base image

  Scenario: Prodcut Page Visual test
    Given I open the web page
    When I login as a "standard" user
    Then I verify if the "product" page image matches the base image

  Scenario: Specific Prodcut Page Visual test
    Given I open the web page
    When I login as a "standard" user
    And I open the page of the first product 
    Then I verify if the "specific product" page image matches the base image    

  Scenario: Cart Page Visual test
    Given I open the web page
    When I login as a "standard" user
    And I open the page of the first product 
    And I add this product to the cart
    And I open the cart page
    Then I verify if the "cart" page image matches the base image    

  Scenario: Checkout Page Visual test
    Given I open the web page
    When I login as a "standard" user
    And I open the page of the first product 
    And I add this product to the cart
    And I open the cart page
    And I checkout
    Then I verify if the "checkout" page image matches the base image    

  Scenario: Checkout Confirmation Page Visual test
    Given I open the web page
    When I login as a "standard" user
    And I open the page of the first product 
    And I add this product to the cart
    And I open the cart page
    And I checkout
    And I enter my information to continue
       | FirstName | LastName | Zip   |
       | John      | Doe      | 37188 |    
    Then I verify if the "checkout confirmation" page image matches the base image      

  Scenario: Checkout Finish Page Visual test
    Given I open the web page
    When I login as a "standard" user
    And I open the page of the first product 
    And I add this product to the cart
    And I open the cart page
    And I checkout
    And I enter my information to continue
       | FirstName | LastName | Zip   |
       | John      | Doe      | 37188 |    
    And I confirm my order       
    Then I verify if the "checkout finish" page image matches the base image      