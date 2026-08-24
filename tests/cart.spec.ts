import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

test.describe('Shopping Cart Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory/);
    });


    test('TC-CART-001 - product can be added to the cart', async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.addBackpackToCart();

        await expect(await cartPage.getCartBadge()).toHaveText('1');

        await cartPage.openCart();

        await expect(await cartPage.getCartProductName())
            .toContainText('Sauce Labs Backpack');
    });


    test('TC-CART-002 - multiple products can be added to the cart', async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.addBackpackToCart();
        await cartPage.addBikeLightToCart();

        await expect(await cartPage.getCartBadge()).toHaveText('2');

        await cartPage.openCart();

        await expect(await cartPage.getCartItems()).toHaveCount(2);
    });


    test('TC-CART-003 - product can be removed from the cart', async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.addBackpackToCart();
        await cartPage.openCart();
        await cartPage.removeBackpackFromCart();

        await expect(await cartPage.getCartItems()).toHaveCount(0);
    });


    test('TC-CART-004 - cart badge updates after adding a product', async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.addBackpackToCart();

        await expect(await cartPage.getCartBadge()).toHaveText('1');
    });


    test('TC-CART-005 - cart badge updates after removing a product', async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.addBackpackToCart();

        await expect(await cartPage.getCartBadge()).toHaveText('1');

        await cartPage.removeBackpackFromCart();

        await expect(await cartPage.getCartBadge()).toHaveCount(0);
    });


    test('TC-CART-006 - selected product details are correct in the cart', async ({ page }) => {
        const cartPage = new CartPage(page);

        const productName =
            await page.locator('.inventory_item_name').first().textContent();

        const productPrice =
            await page.locator('.inventory_item_price').first().textContent();

        await cartPage.addBackpackToCart();
        await cartPage.openCart();

        await expect(await cartPage.getCartProductName())
            .toHaveText(productName!);

        await expect(await cartPage.getCartProductPrice())
            .toHaveText(productPrice!);
    });


    test('TC-CART-007 - user can continue shopping from the cart', async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.addBackpackToCart();
        await cartPage.openCart();
        await cartPage.continueShopping();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

});