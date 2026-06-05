import {test, expect} from 'playwright/test';
import { NavigateTo } from '../../pageobjects/navigate/NavigateTo';
import { RegistrationPage } from '../../pageobjects/registration/RegistrationPage';
import { SummaryPage } from '../../pageobjects/registration/SummaryPage';

test('registration', async ({page}, testInfo) => {
    const name = 'Carlos'
    const lastName = 'Gomez'
    const age = '15'
    const country = 'Colombia'
    const gender = 'M'
    const email = 'carlos.gomez@example.com'
    const dayToSelect = 'Lunes'
    const dayToSelectOption = 'monday'
    const picture = 'images/naruto.jpg'
    const expectedTitle = 'Summary'

    await test.step("Navigate to register page", async () => {
        const navigateTo = new NavigateTo(page)
        await navigateTo.registerPage()
    });  

    await test.step("Send registration form", async () => {
        const registrationPage = new RegistrationPage(page)
        const summaryPageBrowser = await registrationPage.doRegistration(
            name,
            lastName,
            age,
            country,
            gender,
            email,
            dayToSelect,
            dayToSelectOption,
            picture,
            expectedTitle,
            testInfo
        )

        summaryPageBrowser.waitForLoadState()
        const summaryPage = new SummaryPage(summaryPageBrowser)
        
        await expect(summaryPageBrowser).toHaveTitle(expectedTitle)
        
        // Assert that the values ​​shown on the summary page are the same as those entered in the form.
        expect(await summaryPage.getNameLabel()).toContain(name)
        expect(await summaryPage.getLastNameLabel()).toContain(lastName)
        expect(await summaryPage.getAgeLabel()).toContain(age)
        expect(await summaryPage.getCountryLabel()).toContain(country)
        expect(await summaryPage.getGenderLabel()).toContain(gender)
        expect(await summaryPage.getEmailLabel()).toContain(email)
        expect(await summaryPage.getDayLabel()).toContain(dayToSelect)
    });

    await testInfo.attach('register2', {
        body: await page.screenshot(),
        contentType: 'image/png'
    })

    // await summaryPage.screenshot({path: 'screenshots/register2.png', fullPage: true})

    // await page.pause()
})