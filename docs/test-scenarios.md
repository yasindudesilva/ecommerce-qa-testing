
# Test Scenarios

## Authentication

| ID | Test Scenario | Test Type |
|---|---|---|
| AUTH-001 | Verify login using valid credentials | Positive |
| AUTH-002 | Verify login using an invalid username | Negative |
| AUTH-003 | Verify login using an invalid password | Negative |
| AUTH-004 | Verify login with an empty username | Negative |
| AUTH-005 | Verify login with an empty password | Negative |
| AUTH-006 | Verify login with both fields empty | Negative |
| AUTH-007 | Verify login behaviour for a locked user | Negative |
| AUTH-008 | Verify logout after successful login | Functional |

## Product Catalogue

| ID | Test Scenario | Test Type |
|---|---|---|
| PROD-001 | Verify products are displayed after login | Functional |
| PROD-002 | Verify product names are displayed | Functional |
| PROD-003 | Verify product prices are displayed | Functional |
| PROD-004 | Verify product images are displayed | Functional |
| PROD-005 | Verify a product details page can be opened | Functional |
| PROD-006 | Verify products can be sorted A to Z | Functional |
| PROD-007 | Verify products can be sorted Z to A | Functional |
| PROD-008 | Verify products can be sorted by price low to high | Functional |
| PROD-009 | Verify products can be sorted by price high to low | Functional |

## Shopping Cart

| ID | Test Scenario | Test Type |
|---|---|---|
| CART-001 | Verify a product can be added to the cart | Positive |
| CART-002 | Verify multiple products can be added to the cart | Positive |
| CART-003 | Verify a product can be removed from the cart | Functional |
| CART-004 | Verify the cart badge updates after adding a product | Functional |
| CART-005 | Verify the cart badge updates after removing a product | Functional |
| CART-006 | Verify selected product details are correct in the cart | Functional |
| CART-007 | Verify the user can continue shopping from the cart | Functional |

## Checkout

| ID | Test Scenario | Test Type |
|---|---|---|
| CHECK-001 | Verify checkout using valid customer information | Positive |
| CHECK-002 | Verify checkout with an empty first name | Negative |
| CHECK-003 | Verify checkout with an empty last name | Negative |
| CHECK-004 | Verify checkout with an empty postal code | Negative |
| CHECK-005 | Verify checkout with all required fields empty | Negative |
| CHECK-006 | Verify the checkout process can be cancelled | Functional |
| CHECK-007 | Verify selected products appear in checkout overview | Functional |
| CHECK-008 | Verify item total is displayed correctly | Functional |
| CHECK-009 | Verify order can be completed successfully | Positive |
