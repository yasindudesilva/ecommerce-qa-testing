import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Product Catalogue Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory/);
    });


    test('TC-PROD-001 - products are displayed after login', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        const products = await productsPage.getProducts();

        await expect(products).toHaveCount(6);
    });


    test('TC-PROD-002 - product names are displayed', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        const productNames = await productsPage.getProductNames();

        await expect(productNames).toHaveCount(6);

        for (const name of await productNames.all()) {
            await expect(name).toBeVisible();
        }
    });


    test('TC-PROD-003 - product prices are displayed', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        const prices = await productsPage.getProductPrices();

        await expect(prices).toHaveCount(6);

        for (const price of await prices.all()) {
            await expect(price).toBeVisible();
        }
    });


    test('TC-PROD-004 - product images are displayed', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        const images = await productsPage.getProductImages();

        await expect(images).toHaveCount(6);

        for (const image of await images.all()) {
            await expect(image).toBeVisible();
        }
    });


    test('TC-PROD-005 - product details page can be opened', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.openFirstProduct();

        await expect(page).toHaveURL(/inventory-item/);
        await expect(page.locator('.inventory_details_name')).toBeVisible();
        await expect(page.locator('.inventory_details_price')).toBeVisible();
    });


    test('TC-PROD-006 - products can be sorted by Name A to Z', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.sortBy('az');

        const names =
            await (await productsPage.getProductNames()).allTextContents();

        const sortedNames =
            [...names].sort((a, b) => a.localeCompare(b));

        expect(names).toEqual(sortedNames);
    });


    test('TC-PROD-007 - products can be sorted by Name Z to A', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.sortBy('za');

        const names =
            await (await productsPage.getProductNames()).allTextContents();

        const sortedNames =
            [...names].sort((a, b) => b.localeCompare(a));

        expect(names).toEqual(sortedNames);
    });


    test('TC-PROD-008 - products can be sorted by Price low to high', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.sortBy('lohi');

        const priceTexts =
            await (await productsPage.getProductPrices()).allTextContents();

        const prices =
            priceTexts.map(price => parseFloat(price.replace('$', '')));

        const sortedPrices =
            [...prices].sort((a, b) => a - b);

        expect(prices).toEqual(sortedPrices);
    });


    test('TC-PROD-009 - products can be sorted by Price high to low', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.sortBy('hilo');

        const priceTexts =
            await (await productsPage.getProductPrices()).allTextContents();

        const prices =
            priceTexts.map(price => parseFloat(price.replace('$', '')));

        const sortedPrices =
            [...prices].sort((a, b) => b - a);

        expect(prices).toEqual(sortedPrices);
    });

});