import {test, expect} from 'playwright/test';
import { NavigateTo } from '../../pageobjects/navigate/NavigateTo';

test('registration', async ({page}, testInfo) => {
    const name = 'Julian'
    const lastName = 'Gomez'
    const age = '15'
    const country = 'Colombia'
    const gender = 'M'
    const email = 'julian.gomez@example.com'
    const dayToSelect = 'Lunes'
    const dayOption = 'monday'
    const picture = 'images/naruto.jpg'
    const expectedTitle = 'Summary'

    await test.step("Navigate to register page", async () => {
        const navigateTo = new NavigateTo(page)
        await navigateTo.registerPage()
    });  

    await test.step("Send registration form", async () => {
        await page.locator("id=name").fill(name)
        await page.locator("id=last-name").fill(lastName)
        await page.locator("input[id=age]").fill(age)
        await page.locator("//select[@id='country']").selectOption(country)
        await page.locator(`input[value='${gender}']`).click()
        await page.locator("input[id=email]").fill(email)
        await page.locator(`id=${dayOption}`).click()
        await page.locator("id=picture").setInputFiles(picture)
    
        await testInfo.attach('register1', {
            body: await page.screenshot(),
            contentType: 'image/png'
        })
    
        const [summaryPage] = await Promise.all(
            [
                page.waitForEvent('popup'),
                page.locator("id=save-btn").click()
            ]
        )

        await summaryPage.waitForLoadState()

        // Retrieve the values ​​shown on the summary page.
        const currentName = await summaryPage
            .locator("//strong[contains(text(), 'Nombre')]/ancestor::p").textContent()
        const currentLastName = await summaryPage
            .locator("//strong[contains(text(), 'Apellido')]/ancestor::p").textContent()
        const currentAge = await summaryPage
            .locator("//strong[contains(text(), 'Edad')]/ancestor::p").textContent()
        const currentCountry = await summaryPage
            .locator("//strong[contains(text(), 'País')]/ancestor::p").textContent()
        const currentGender = await summaryPage
            .locator("//strong[contains(text(), 'Sexo')]/ancestor::p").textContent()
        const currentEmail = await summaryPage
            .locator("//strong[contains(text(), 'Correo electrónico')]/ancestor::p").textContent()
        const currentDay = await summaryPage
            .locator("//strong[contains(text(), 'Días en los que trabaja:')]/ancestor::p").textContent()
        
        await expect(summaryPage).toHaveTitle(expectedTitle)
        
        // Assert that the values ​​shown on the summary page are the same as those entered in the form.
        expect(currentName).toContain(name)
        expect(currentLastName).toContain(lastName)
        expect(currentAge).toContain(age)
        expect(currentCountry).toContain(country)
        expect(currentGender).toContain(gender)
        expect(currentEmail).toContain(email)
        expect(currentDay).toContain(dayToSelect)
    });


    await testInfo.attach('register2', {
        body: await page.screenshot(),
        contentType: 'image/png'
    })

    // await summaryPage.screenshot({path: 'screenshots/register2.png', fullPage: true})

    // await page.pause()
})