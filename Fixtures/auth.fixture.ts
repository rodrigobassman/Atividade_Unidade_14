import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

type authFixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<authFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    }
});

export { expect } from '@playwright/test';