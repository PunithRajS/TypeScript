Feature: User Sign-Up
  As a new user
  I want to sign up for a UPS account
  So that I can access  services and manage my shipments

  Background:
    Given I am on the sign-up page

  @positive
  Scenario: Successful sign-up with valid information
    When I enter my first name "John"
    And I enter my last name "Doe"
    And I enter my email address "john.doe@example.com"
    And I enter my password "Password123"
    And I agree to the terms and conditions
    And I click the "Sign Up" button
    Then I should be directed to the email verification page
    When I enter the verification code sent to my email "123456"
    And I click the "Verify" button
    Then I should see a message confirming successful sign-up
    And I should be redirected to the home page

  @negative
  Scenario: Sign-up with already registered email
    When I enter my first name "Jane"
    And I enter my last name "Smith"
    And I enter my email address "jane.smith@example.com"
    And I enter my password "Password123"
    And I agree to the terms and conditions
    And I click the "Sign Up" button
    Then I should see an error message indicating the email is already registered
    And I should remain on the sign-up page

  
