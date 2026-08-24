import { Page } from '@playwright/test';

export class ProductsPage {

    constructor(private page: Page) { }

    async getProducts() {
        return this.page.locator('.inventory_item');
    }

    async getProductNames() {
        return this.page.locator('.inventory_item_name');
    }

    async getProductPrices() {
        return this.page.locator('.inventory_item_price');
    }

    async getProductImages() {
        return this.page.locator('.inventory_item_img img');
    }

    async openFirstProduct() {
        await this.page.locator('.inventory_item_name').first().click();
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.page
            .locator('[data-test="product-sort-container"]')
            .selectOption(option);
    }

}