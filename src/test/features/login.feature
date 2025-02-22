Feature: User Login
  As a registered user
  I want to log into my account
  So that I can manage my shipments and view my account details

  Background:
    Given I am on the homepage
    And I navigate to the login page

  @positive
  Scenario: Successful login with valid credentials
    When I enter my Valid UserName
    And I click the "Continue" button
    And I enter my Valid Password
    And I click the "LogIn" button
    Then I should be redirected to my account dashboard
    # And I should see a greeting message with my name
   
  @negative
  Scenario: Unsuccessful login with invalid credentials
    When I enter my Valid UserName
    And I click the "Continue" button
    And I enter an Invalid password 
    And I click the "LogIn" button
    Then I should see an error message indicating incorrect login details
    And I should remain on the password entry page

  @negative
  Scenario: Unrecognized username during login
    When I enter an unregistered username 
    And I click the "Continue" button
    And I enter an Invalid password 
    And I click the "LogIn" button
    Then I should see an error message indicating the username is unrecognized
    And I should remain on the username entry page



 