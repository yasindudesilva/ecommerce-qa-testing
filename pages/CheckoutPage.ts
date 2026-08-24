import { Page } from '@playwright/test';

export class CheckoutPage {

    constructor(private page: Page) { }

    async enterFirstName(firstName: string) {
        await this.page
            .locator('[data-test="firstName"]')
            .fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.page
            .locator('[data-test="lastName"]')
            .fill(lastName);
    }

    async enterPostalCode(postalCode: string) {
        await this.page
            .locator('[data-test="postalCode"]')
            .fill(postalCode);
    }

    async fillCustomerInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterPostalCode(postalCode);
    }

    async clickContinue() {
        await this.page
            .locator('[data-test="continue"]')
            .click();
    }

    async clickCancel() {
        await this.page
            .locator('[data-test="cancel"]')
            .click();
    }

    async clickFinish() {
        await this.page
            .locator('[data-test="finish"]')
            .click();
    }

    async getErrorMessage() {
        return this.page.locator('[data-test="error"]');
    }

    async getCheckoutProductName() {
        return this.page.locator('.inventory_item_name');
    }

    async getItemPrice() {
        return this.page.locator('.inventory_item_price');
    }

    async getItemTotal() {
        return this.page.locator('.summary_subtotal_label');
    }

    async getCompletionMessage() {
        return this.page.locator('.complete-header');
    }

}