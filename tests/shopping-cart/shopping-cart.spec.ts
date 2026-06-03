import { faker } from '@faker-js/faker';
import {chromium, expect, test} from 'playwright/test';

test('Buying new products', async ({page}) => {
    const shoppingCartUrl = 'http://127.0.0.1:5500/';
    await page.goto(shoppingCartUrl);

    for (let i = 0; i <= 5; i++) {
        await page.locator(`//h5[contains(text(), 'Producto 1')]/ancestor::div[contains(@class, 'card-body')]//button`).click();
    }

    // await page.locator("//h5[contains(text(), 'Producto 1')]/ancestor::div[contains(@class, 'card-body')]//button[contains(text(), 'Añadir al carrito')]").click();
    await page.locator("//h5[contains(text(), 'Producto 2')]/ancestor::div[contains(@class, 'card-body')]//button[contains(text(), 'Añadir al carrito')]").click();
    await page.locator("//h5[contains(text(), 'Producto 3')]/ancestor::div[contains(@class, 'card-body')]//button[contains(text(), 'Añadir al carrito')]").click();

    await page.locator("button#view-cart-btn").click();

    const product1Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(text(), 'Producto 3')]/ancestor::tr//td[3]").textContent();
    const product2Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(text(), 'Producto 2')]/ancestor::tr//td[3]").textContent();
    const product3Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(text(), 'Producto 1')]/ancestor::tr//td[3]").textContent();
    
    expect(product1Quantity).toEqual('1');
    expect(product2Quantity).toEqual('1');
    expect(product3Quantity).toEqual('6');
    
    await page.locator("id=checkout-btn").click();

    // Personal information
    await page.locator("//input[@id='name']").fill(faker.person.firstName())
    await page.locator("//input[@id='email']").fill(faker.internet.email())
    await page.locator("//input[@id='address']").fill(faker.location.streetAddress())

    // Payment information
    await page.waitForLoadState('load')
    await page.locator("//a[@href='#paymentInfo']").click()

    await page.locator("//input[@id='card-number']").fill(faker.finance.creditCardNumber())
    await page.locator("input#card-expiry").fill('12-2027')
    await page.locator("input[id='card-cvc']").fill(faker.finance.creditCardCVV())

    await page.locator("button#place-order-btn").click();

    await page.waitForLoadState('load')
    await expect(page.locator("//h4[contains(text(),'¡Tu compra fue exitosa!')]")).toBeVisible();

    //await page.pause();
})


// test('cerrar pestaña existente', async () => {

//     const browser = await chromium.connectOverCDP(
//         'https://playwright.dev/docs/intro'
//     );

//     const context = browser.contexts()[0];

//     const pages = context.pages();

//     for (const page of pages) {

//         if (page.url().includes('facebook')) {

//             await page.close();

//             break;
//         }
//     }

// });