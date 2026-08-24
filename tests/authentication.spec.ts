import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication Tests', () => {

    test('TC-AUTH-001 - valid user can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toHaveText('Products');
    });


    test('TC-AUTH-002 - invalid username should be rejected', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('wrong_user', 'secret_sauce');

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username and password do not match');
    });


    test('TC-AUTH-003 - invalid password should be rejected', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'wrong123');

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username and password do not match');
    });


    test('TC-AUTH-004 - empty username should show validation', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username is required');
    });


    test('TC-AUTH-005 - empty password should show validation', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.enterUsername('standard_user');
        await loginPage.clickLogin();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Password is required');
    });


    test('TC-AUTH-006 - both fields empty should show validation', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.clickLogin();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username is required');
    });


    test('TC-AUTH-007 - locked user should not be able to login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('locked_out_user', 'secret_sauce');

        await expect(page.locator('[data-test="error"]'))
            .toContainText('locked out');
    });


    test('TC-AUTH-008 - logged in user can logout successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await page.locator('#react-burger-menu-btn').click();
        await page.locator('[data-test="logout-sidebar-link"]').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('#login-button')).toBeVisible();
    });

});