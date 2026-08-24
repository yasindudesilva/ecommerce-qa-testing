import { Page } from '@playwright/test';

export class CartPage {

    constructor(private page: Page) { }

    async addBackpackToCart() {
        await this.page
            .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();
    }

    async addBikeLightToCart() {
        await this.page
            .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click();
    }

    async openCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    async removeBackpackFromCart() {
        await this.page
            .locator('[data-test="remove-sauce-labs-backpack"]')
            .click();
    }

    async continueShopping() {
        await this.page
            .locator('[data-test="continue-shopping"]')
            .click();
    }

    async getCartItems() {
        return this.page.locator('.cart_item');
    }

    async getCartBadge() {
        return this.page.locator('.shopping_cart_badge');
    }

    async getCartProductName() {
        return this.page.locator('.inventory_item_name');
    }

    async getCartProductPrice() {
        return this.page.locator('.inventory_item_price');
    }

}