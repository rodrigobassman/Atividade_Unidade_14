import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const cenarios = [
    {
        nome: 'Cliente Válido',
        email: 'cliente@system.com',
        senha: 'ClientPassword123',
        sucessoEsperado: true,
    },
    {
        nome: 'Admin Válido',
        email: 'admin@system.com',
        senha: 'AdminPassword123',
        sucessoEsperado: true,
    },
    {
        nome: 'Senha Incorreta',
        email: 'admin@system.com',
        senha: 'SenhaErrada123',
        sucessoEsperado: false,
    },
];

test.describe('Testes Data-Driven de Login', () => {
    for (const cenario of cenarios) {
        test(`Cenário: ${cenario.nome}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            await loginPage.login(cenario.email, cenario.senha);

            if (cenario.sucessoEsperado) {
                await expect(loginPage.statusMessage).toBeVisible();
                await expect(page).toHaveURL(/painel\.html/);
            } else {
                await expect(loginPage.errorMessage).toBeVisible();
            }
        });
    }
});