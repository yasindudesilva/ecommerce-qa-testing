import { test, expect } from '@playwright/test';

test.describe('Product Catalogue Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page).toHaveURL(/inventory/);
    });


    test('TC-PROD-001 - products are displayed after login', async ({ page }) => {
        const products = page.locator('.inventory_item');

        await expect(products).toHaveCount(6);
    });


    test('TC-PROD-002 - product names are displayed', async ({ page }) => {
        const productNames = page.locator('.inventory_item_name');

        await expect(productNames).toHaveCount(6);

        for (const name of await productNames.all()) {
            await expect(name).toBeVisible();
        }
    });


    test('TC-PROD-003 - product prices are displayed', async ({ page }) => {
        const prices = page.locator('.inventory_item_price');

        await expect(prices).toHaveCount(6);

        for (const price of await prices.all()) {
            await expect(price).toBeVisible();
        }
    });


    test('TC-PROD-004 - product images are displayed', async ({ page }) => {
        const images = page.locator('.inventory_item_img img');

        await expect(images).toHaveCount(6);

        for (const image of await images.all()) {
            await expect(image).toBeVisible();
        }
    });


    test('TC-PROD-005 - product details page can be opened', async ({ page }) => {
        await page.locator('.inventory_item_name').first().click();

        await expect(page).toHaveURL(/inventory-item/);
        await expect(page.locator('.inventory_details_name')).toBeVisible();
        await expect(page.locator('.inventory_details_price')).toBeVisible();
    });


    test('TC-PROD-006 - products can be sorted by Name A to Z', async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('az');

        const names = await page.locator('.inventory_item_name').allTextContents();

        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

        expect(names).toEqual(sortedNames);
    });


    test('TC-PROD-007 - products can be sorted by Name Z to A', async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('za');

        const names = await page.locator('.inventory_item_name').allTextContents();

        const sortedNames = [...names].sort((a, b) => b.localeCompare(a));

        expect(names).toEqual(sortedNames);
    });


    test('TC-PROD-008 - products can be sorted by Price low to high', async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

        const priceTexts = await page.locator('.inventory_item_price').allTextContents();

        const prices = priceTexts.map(price =>
            parseFloat(price.replace('$', ''))
        );

        const sortedPrices = [...prices].sort((a, b) => a - b);

        expect(prices).toEqual(sortedPrices);
    });


    test('TC-PROD-009 - products can be sorted by Price high to low', async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

        const priceTexts = await page.locator('.inventory_item_price').allTextContents();

        const prices = priceTexts.map(price =>
            parseFloat(price.replace('$', ''))
        );

        const sortedPrices = [...prices].sort((a, b) => b - a);

        expect(prices).toEqual(sortedPrices);
    });

});