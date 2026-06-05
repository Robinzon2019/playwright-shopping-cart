import {test} from 'playwright/test';
import {faker} from '@faker-js/faker';

const loginPageUrl = 'http://127.0.0.1:5500/login.html';

test('create transaction', async ({page}) => {
    await page.goto(loginPageUrl);

    await page.locator('input#username').fill('user');
    await page.locator("input[id='password']").fill('pass');

    await page.locator("//button[@type='submit']").click(); 
    
    
    for (let i = 0; i <= 10; i++) {
        await page.waitForLoadState('load')
        await page.locator("//button[contains(text(), 'Añadir transacción')]").click()
        await page.locator("id=date").fill('2024-10-23')
        await page.locator("input[id='amount']").fill(faker.number.int({ min: 100, max: 200 }).toString())
        await page.locator("input[id='description']").fill(faker.lorem.sentence())
        await page.locator("//button[contains(text(), 'Guardar')]").click()
    }

    // await page.pause()
})


test('test', async ({ page }) => {
  await page.goto(loginPageUrl);
  await page.getByRole('textbox', { name: 'Nombre de usuario:' }).fill('user');
  await page.getByRole('textbox', { name: 'Contraseña:' }).fill('pass');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForLoadState('load')
  await page.getByRole('button', { name: 'Añadir transacción' }).click();
  await page.waitForLoadState('load')

  await page.getByRole('textbox', { name: 'Fecha:' }).fill('2026-05-27');
  await page.getByRole('spinbutton', { name: 'Monto:' }).fill('700');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('N');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('New ');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('New T');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('New Test ');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('New Test D');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('New Test Deccription');
  await page.getByRole('textbox', { name: 'Descripción:' }).click();
  await page.getByRole('textbox', { name: 'Descripción:' }).click();
  await page.getByRole('textbox', { name: 'Descripción:' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Descripción:' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('New Test Description');
  await page.getByRole('button', { name: 'Guardar' }).click();
});