test.describe('Testes Data-Driven de Login', () => {
    for (const cenario of cenarios) {
        test(`Cenário: ${cenario.nome}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            await loginPage.login(cenario.email, cenario.senha);

            if (cenario.sucessoEsperado) {
                // Descobre qual URL a aplicação abriu de verdade para o cliente
                console.log(`URL atual (${cenario.nome}):`, page.url());
                
                // Validação temporária genérica apenas para ver se logou
                await expect(page).not.toHaveURL(/login\.html/);
            } else {
                await expect(loginPage.errorMessage).toBeVisible();
            }
        });
    }
});