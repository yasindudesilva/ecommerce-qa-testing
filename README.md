# E-Commerce Quality Assurance & Test Automation Suite

A Quality Assurance portfolio project covering manual testing, end-to-end UI automation, cross-browser testing, API testing, Page Object Model design, and Continuous Integration using GitHub Actions.

---

## Project Overview

This project demonstrates a complete QA workflow for an e-commerce application.

The **SauceDemo** web application is used as the System Under Test for manual and automated UI testing.

The project covers the main e-commerce workflows:

- Authentication
- Product Catalogue
- Shopping Cart
- Checkout

In addition to UI testing, REST API testing was performed using the **DummyJSON Products API** with Postman.

---

## Systems Under Test

### UI Testing

**SauceDemo Web Application**

https://www.saucedemo.com/

### API Testing

**DummyJSON Products API**

https://dummyjson.com/

---

## Manual Testing

A structured manual test suite was created to validate the main SauceDemo workflows.

### Test Coverage

| Module | Test Cases |
|---|---:|
| Authentication | 8 |
| Product Catalogue | 9 |
| Shopping Cart | 7 |
| Checkout | 9 |
| **Total** | **33** |

### Manual Test Execution Result

| Result | Count |
|---|---:|
| Total Test Cases | 33 |
| Passed | 33 |
| Failed | 0 |
| **Pass Rate** | **100%** |

The manual test cases contain:

- Test Case ID
- Module
- Test Scenario
- Preconditions
- Test Steps
- Test Data
- Expected Result
- Actual Result
- Status
- Priority

Detailed test execution documentation is available at:

`manual-testing/test-cases.xlsx`

---

## Test Documentation

The project includes structured QA documentation covering requirements, planning, and test scenarios.

Files include:

- `docs/requirements-analysis.md`
- `docs/test-plan.md`
- `docs/test-scenarios.md`

The testing approach includes:

- Functional Testing
- Positive Testing
- Negative Testing
- Smoke Testing
- Regression Testing
- Exploratory Testing

---

## UI Test Automation

The UI automation suite was developed using:

- Playwright
- TypeScript

The automated test suite covers the same four major functional areas used during manual testing.

### Automated Test Files

- `tests/authentication.spec.ts`
- `tests/products.spec.ts`
- `tests/cart.spec.ts`
- `tests/checkout.spec.ts`

### Automated Test Coverage

| Module | Automated Tests |
|---|---:|
| Authentication | 8 |
| Product Catalogue | 9 |
| Shopping Cart | 7 |
| Checkout | 9 |
| **Total** | **33** |

---

## Cross-Browser Testing

The Playwright test suite is configured to run across:

- Chromium
- Firefox
- WebKit

This results in:

```text
33 automated test cases × 3 browsers = 99 test executions
```

Latest full local execution result:

```text
99 passed
0 failed
```

---

## Page Object Model

The automation framework uses the **Page Object Model (POM)** design pattern.

Page-specific actions and locators are separated from the test files to improve:

- Code reusability
- Maintainability
- Readability
- Separation of test logic and page interaction logic

### Page Objects

```text
pages/
├── LoginPage.ts
├── ProductsPage.ts
├── CartPage.ts
└── CheckoutPage.ts
```

The test files use these page objects instead of repeating common browser interaction logic.

---

## API Testing

REST API testing was performed using **Postman** with the DummyJSON Products API.

The API suite covers common CRUD operations and search functionality.

### API Requests

| Method | Request |
|---|---|
| GET | Get All Products |
| GET | Get Product By ID |
| GET | Search Products |
| POST | Add Product |
| PUT | Update Product |
| DELETE | Delete Product |

Postman test scripts validate areas such as:

- HTTP status codes
- Response structure
- Product IDs
- Product titles
- Product prices
- Search results
- Updated values
- Delete responses

The Postman collection files are stored in:

```text
api-testing/E-Commerce API Testing/
```

---

## Continuous Integration

GitHub Actions is configured to automatically execute the Playwright test suite when changes are pushed to the repository.

Workflow file:

```text
.github/workflows/playwright.yml
```

The CI workflow performs:

1. Repository checkout
2. Node.js setup
3. Dependency installation
4. Playwright browser installation
5. Playwright test execution
6. Test report generation

Successful workflow runs can be viewed from the repository's **Actions** tab.

---

## Repository Structure

```text
ecommerce-qa-testing/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── api-testing/
│   └── E-Commerce API Testing/
│       ├── .resources/
│       ├── Add Product
│       ├── Delete Product
│       ├── Get All Products
│       ├── Get Product By ID
│       ├── Search Products
│       └── Update Product
│
├── docs/
│   ├── requirements-analysis.md
│   ├── test-plan.md
│   └── test-scenarios.md
│
├── manual-testing/
│   └── test-cases.xlsx
│
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/
│   ├── authentication.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

---

## Technologies and Tools

- Playwright
- TypeScript
- Postman
- Git
- GitHub
- GitHub Actions
- Microsoft Excel
- Node.js
- npm

---

## Running the Automated Tests

### 1. Clone the repository

```bash
git clone https://github.com/yasindudesilva/ecommerce-qa-testing.git
```

Move into the project directory:

```bash
cd ecommerce-qa-testing
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Run the complete test suite

```bash
npx playwright test
```

### 5. Run tests with visible browsers

```bash
npx playwright test --headed
```

### 6. Run tests only on Chromium

```bash
npx playwright test --project=chromium
```

### 7. Run a specific module

Authentication:

```bash
npx playwright test tests/authentication.spec.ts
```

Product Catalogue:

```bash
npx playwright test tests/products.spec.ts
```

Shopping Cart:

```bash
npx playwright test tests/cart.spec.ts
```

Checkout:

```bash
npx playwright test tests/checkout.spec.ts
```

### 8. View the Playwright HTML report

```bash
npx playwright show-report
```

---

## Key Learning Outcomes

This project provided practical experience in:

- Requirements-based test design
- Writing structured test scenarios and test cases
- Manual functional testing
- Positive and negative testing
- Recording expected and actual test results
- End-to-end browser automation with Playwright
- TypeScript-based automated testing
- Cross-browser testing
- Page Object Model implementation
- REST API testing with Postman
- API response assertions
- Git and GitHub version control
- GitHub Actions Continuous Integration
- Organizing a QA automation project using a maintainable repository structure

---

## Project Status

- Manual test design: Completed
- Manual test execution: 33/33 Passed
- Playwright automation: Completed
- Automated test coverage: 33 test cases
- Cross-browser execution: 99/99 Passed
- Page Object Model: Implemented
- Postman API testing: Completed
- GitHub Actions CI: Configured and passing
