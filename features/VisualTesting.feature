@AutomatedTests
@VisualTests

Feature: Verifies if current webpage visually matches the base images

  Scenario: Login Page Visual test
    Given I open the web page
    Then I verify if the "login" page image matches the base image