import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await cartPage.addBackpackToCart();
        await cartPage.openCart();

        await page.locator('[data-test="checkout"]').click();

        await expect(page).toHaveURL(/checkout-step-one/);
    });


    test('TC-CHECK-001 - checkout works with valid customer information', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.fillCustomerInformation(
            'Test',
            'User',
            '10000'
        );

        await checkoutPage.clickContinue();

        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(page.locator('.title'))
            .toHaveText('Checkout: Overview');
    });


    test('TC-CHECK-002 - empty first name shows validation', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterLastName('User');
        await checkoutPage.enterPostalCode('10000');
        await checkoutPage.clickContinue();

        await expect(await checkoutPage.getErrorMessage())
            .toContainText('First Name is required');
    });


    test('TC-CHECK-003 - empty last name shows validation', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterFirstName('Test');
        await checkoutPage.enterPostalCode('10000');
        await checkoutPage.clickContinue();

        await expect(await checkoutPage.getErrorMessage())
            .toContainText('Last Name is required');
    });


    test('TC-CHECK-004 - empty postal code shows validation', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterFirstName('Test');
        await checkoutPage.enterLastName('User');
        await checkoutPage.clickContinue();

        await expect(await checkoutPage.getErrorMessage())
            .toContainText('Postal Code is required');
    });


    test('TC-CHECK-005 - all empty fields show validation', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.clickContinue();

        await expect(await checkoutPage.getErrorMessage())
            .toContainText('First Name is required');
    });


    test('TC-CHECK-006 - checkout can be cancelled', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.clickCancel();

        await expect(page).toHaveURL(/cart/);
        await expect(page.locator('.title'))
            .toHaveText('Your Cart');
    });


    test('TC-CHECK-007 - selected products appear in checkout overview', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.fillCustomerInformation(
            'Test',
            'User',
            '10000'
        );

        await checkoutPage.clickContinue();

        await expect(await checkoutPage.getCheckoutProductName())
            .toContainText('Sauce Labs Backpack');
    });


    test('TC-CHECK-008 - item total is displayed correctly', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.fillCustomerInformation(
            'Test',
            'User',
            '10000'
        );

        await checkoutPage.clickContinue();

        const priceText =
            await (await checkoutPage.getItemPrice()).textContent();

        const totalText =
            await (await checkoutPage.getItemTotal()).textContent();

        const itemPrice =
            parseFloat(priceText!.replace('$', ''));

        const itemTotal =
            parseFloat(totalText!.replace('Item total: $', ''));

        expect(itemTotal).toBe(itemPrice);
    });


    test('TC-CHECK-009 - order can be completed successfully', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.fillCustomerInformation(
            'Test',
            'User',
            '10000'
        );

        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();

        await expect(page).toHaveURL(/checkout-complete/);

        await expect(await checkoutPage.getCompletionMessage())
            .toHaveText('Thank you for your order!');
    });

});