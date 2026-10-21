import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests com Page Object Model', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    // Cenário 1: Caminho Feliz
    test('LOGIN ADM COM SUCESSO VIA POM', async ({ page }) => {
        await loginPage.login('admin@system.com', 'AdminPassword123');
        await expect(loginPage.statusMessage).toBeVisible();
        await expect(loginPage.statusMessage).toContainText(/Login bem-sucedido/i);
        await expect(page).toHaveURL(/painel\.html/);
    });

    // Cenário 2: Caminho Triste (Senha Incorreta)
    test('LOGIN COM SENHA INCORRETA', async ({ page }) => {
        await loginPage.login('admin@system.com', 'SenhaErrada123');
        await expect(loginPage.errorMessage).toBeVisible();
    });

    // Cenário 3: Regra de Negócio (Botão desabilitado)
    test('testar visibilidade do bt login', async ({ page }) => {
        await expect(loginPage.loginButton).toBeDisabled();
    });
});