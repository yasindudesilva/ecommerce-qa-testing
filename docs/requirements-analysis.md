# Requirements Analysis

## Project
E-Commerce Quality Assurance & Test Automation Suite

## System Under Test
SauceDemo Web Application

## Project Objective
The objective of this project is to evaluate the quality and reliability of the core e-commerce workflows of the SauceDemo web application through manual testing and automated web testing.

## Functional Areas

### 1. Authentication
The system should allow authorized users to access the application.

Expected behaviours:
- Valid users should be able to log in successfully.
- Invalid credentials should display an appropriate error message.
- Required login fields should be validated.
- Locked users should not be allowed to access the application.
- Logged-in users should be able to log out.

### 2. Product Catalogue
After successful login, users should be able to view available products.

Expected behaviours:
- Products should be displayed.
- Product names should be visible.
- Product prices should be displayed.
- Product images should be displayed.
- Users should be able to open product details.
- Products should support the available sorting options.

### 3. Shopping Cart
Users should be able to manage products in the shopping cart.

Expected behaviours:
- Users should be able to add products to the cart.
- Users should be able to remove products from the cart.
- The shopping cart badge should reflect the number of selected products.
- Product information should remain consistent between the catalogue and cart.

### 4. Checkout
Users should be able to complete the checkout workflow.

Expected behaviours:
- Users should be able to proceed from the cart to checkout.
- Required customer information should be validated.
- The checkout overview should display the selected products.
- Item prices and totals should be displayed.
- Users should be able to cancel the checkout process.
- Users should be able to complete an order successfully.

### 5. Navigation
Users should be able to navigate between major application areas.

Expected behaviours:
- Users should be able to access the shopping cart.
- Users should be able to return to the product catalogue.
- Users should be able to navigate between product details and the product list.
- Users should be able to log out.

## Initial Testing Scope

The project will cover:

- Functional Testing
- Positive Testing
- Negative Testing
- Smoke Testing
- Regression Testing
- Exploratory Testing
- UI Test Automation

## Out of Scope

The initial version will not deeply cover:

- Performance Testing
- Security Penetration Testing
- Native Mobile Application Testing
- Production Database Testing
