import { test, expect } from '@playwright/test';

test.describe('Checkout Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();

        await expect(page).toHaveURL(/checkout-step-one/);
    });


    test('TC-CHECK-001 - checkout works with valid customer information', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('Test');
        await page.locator('[data-test="lastName"]').fill('User');
        await page.locator('[data-test="postalCode"]').fill('10000');

        await page.locator('[data-test="continue"]').click();

        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    });


    test('TC-CHECK-002 - empty first name shows validation', async ({ page }) => {
        await page.locator('[data-test="lastName"]').fill('User');
        await page.locator('[data-test="postalCode"]').fill('10000');

        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('First Name is required');
    });


    test('TC-CHECK-003 - empty last name shows validation', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('Test');
        await page.locator('[data-test="postalCode"]').fill('10000');

        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Last Name is required');
    });


    test('TC-CHECK-004 - empty postal code shows validation', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('Test');
        await page.locator('[data-test="lastName"]').fill('User');

        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Postal Code is required');
    });


    test('TC-CHECK-005 - all empty fields show validation', async ({ page }) => {
        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('First Name is required');
    });


    test('TC-CHECK-006 - checkout can be cancelled', async ({ page }) => {
        await page.locator('[data-test="cancel"]').click();

        await expect(page).toHaveURL(/cart/);
        await expect(page.locator('.title')).toHaveText('Your Cart');
    });


    test('TC-CHECK-007 - selected products appear in checkout overview', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('Test');
        await page.locator('[data-test="lastName"]').fill('User');
        await page.locator('[data-test="postalCode"]').fill('10000');

        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('.inventory_item_name'))
            .toContainText('Sauce Labs Backpack');
    });


    test('TC-CHECK-008 - item total is displayed correctly', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('Test');
        await page.locator('[data-test="lastName"]').fill('User');
        await page.locator('[data-test="postalCode"]').fill('10000');

        await page.locator('[data-test="continue"]').click();

        const priceText =
            await page.locator('.inventory_item_price').textContent();

        const totalText =
            await page.locator('.summary_subtotal_label').textContent();

        const itemPrice = parseFloat(priceText!.replace('$', ''));
        const itemTotal = parseFloat(totalText!.replace('Item total: $', ''));

        expect(itemTotal).toBe(itemPrice);
    });


    test('TC-CHECK-009 - order can be completed successfully', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('Test');
        await page.locator('[data-test="lastName"]').fill('User');
        await page.locator('[data-test="postalCode"]').fill('10000');

        await page.locator('[data-test="continue"]').click();
        await page.locator('[data-test="finish"]').click();

        await expect(page).toHaveURL(/checkout-complete/);

        await expect(page.locator('.complete-header'))
            .toHaveText('Thank you for your order!');
    });

});