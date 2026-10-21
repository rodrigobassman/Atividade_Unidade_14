
import { test as base, Page } from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";

type authFixtures = {
    loginPage: LoginPage;
    loggedPage: Page;
};

export const test = base.extend<authFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    }, 

    // Entregando página logada
    loggedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('admin@system.com', 'AdminPassword123');
        await page.waitForURL(/painel\.html/);
        await use(page);
    }
});