import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {

    test('TC-AUTH-001 - valid user can login successfully', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toHaveText('Products');
    });


    test('TC-AUTH-002 - invalid username should be rejected', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('wrong_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username and password do not match');
    });


    test('TC-AUTH-003 - invalid password should be rejected', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('wrong123');
        await page.locator('#login-button').click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username and password do not match');
    });


    test('TC-AUTH-004 - empty username should show validation', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username is required');
    });


    test('TC-AUTH-005 - empty password should show validation', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user');
        await page.locator('#login-button').click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Password is required');
    });


    test('TC-AUTH-006 - both fields empty should show validation', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#login-button').click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username is required');
    });


    test('TC-AUTH-007 - locked user should not be able to login', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('locked_out_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('locked out');
    });


    test('TC-AUTH-008 - logged in user can logout successfully', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await page.locator('#react-burger-menu-btn').click();
        await page.locator('[data-test="logout-sidebar-link"]').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('#login-button')).toBeVisible();
    });

});