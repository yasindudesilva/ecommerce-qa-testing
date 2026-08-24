import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page).toHaveURL(/inventory/);
    });


    test('TC-CART-001 - product can be added to the cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        await page.locator('.shopping_cart_link').click();

        await expect(page.locator('.inventory_item_name'))
            .toContainText('Sauce Labs Backpack');
    });


    test('TC-CART-002 - multiple products can be added to the cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

        await page.locator('.shopping_cart_link').click();

        await expect(page.locator('.cart_item')).toHaveCount(2);
    });


    test('TC-CART-003 - product can be removed from the cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        await page.locator('.shopping_cart_link').click();

        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

        await expect(page.locator('.cart_item')).toHaveCount(0);
    });


    test('TC-CART-004 - cart badge updates after adding a product', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });


    test('TC-CART-005 - cart badge updates after removing a product', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });


    test('TC-CART-006 - selected product details are correct in the cart', async ({ page }) => {
        const productName =
            await page.locator('.inventory_item_name').first().textContent();

        const productPrice =
            await page.locator('.inventory_item_price').first().textContent();

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('.shopping_cart_link').click();

        await expect(page.locator('.inventory_item_name'))
            .toHaveText(productName!);

        await expect(page.locator('.inventory_item_price'))
            .toHaveText(productPrice!);
    });


    test('TC-CART-007 - user can continue shopping from the cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        await page.locator('.shopping_cart_link').click();

        await page.locator('[data-test="continue-shopping"]').click();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

});