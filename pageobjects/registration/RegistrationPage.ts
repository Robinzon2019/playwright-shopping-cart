import { expect, Locator, Page, TestInfo } from "@playwright/test"

export class RegistrationPage {
    // Register page fields
    private readonly nameTextBox: Locator
    private readonly lastNameTextBox: Locator
    private readonly ageTextBox: Locator
    private readonly countrySelect: Locator
    private readonly genderRadio: Locator
    private readonly emailTextBox: Locator
    private daySelect: Locator
    private readonly picture: Locator

    // Summary page fields
    private nameLabel: Locator
    private lastNameLabel: Locator
    private ageLabel: Locator
    private countryLabel: Locator
    private genderLabel: Locator
    private emailLabel: Locator
    private dayLabel: Locator

    private readonly page: Page

    constructor(page: Page) {
        this.page = page

        // Register page fields
        this.nameTextBox = page.locator("id=name");
        this.lastNameTextBox = page.locator("id=last-name");
        this.ageTextBox = page.locator("input[id=age]");
        this.countrySelect = page.locator("//select[@id='country']");
        this.genderRadio = page.locator(`input[value='M']`);
        this.emailTextBox = page.locator("input[id=email]");
        this.picture = page.locator("id=picture");
        this.daySelect = page.locator("//input[@id='monday']");

        // Summary page fields
        this.nameLabel = page.locator("//strong[contains(text(), 'Nombre')]/ancestor::p");
        this.lastNameLabel = page.locator("//strong[contains(text(), 'Apellido')]/ancestor::p");
        this.ageLabel = page.locator("//strong[contains(text(), 'Edad')]/ancestor::p");
        this.countryLabel = page.locator("//strong[contains(text(), 'País')]/ancestor::p");
        this.genderLabel = page.locator("//strong[contains(text(), 'Sexo')]/ancestor::p");
        this.emailLabel = page.locator("//strong[contains(text(), 'Correo electrónico')]/ancestor::p");
        this.dayLabel = page.locator("//strong[contains(text(), 'Días en los que trabaja:')]/ancestor::p");
    }

    async fillName(name: string) {
        await this.nameTextBox.fill(name)
    }

    async fillLastName(lastName: string) {
        await this.lastNameTextBox.fill(lastName)
    }

    async fillAge(age: string) {
        await this.ageTextBox.fill(age)
    }

    async fillCountry(country: string) {
        await this.countrySelect.selectOption(country)
    }

    async fillGender(gender: string) {
        await this.genderRadio.click()
    }

    async fillEmail(email: string) {
        await this.emailTextBox.fill(email)
    }

    async selectDay(dayOption: string) {
        this.daySelect = this.page.locator(`//input[@id='${dayOption}']`)
        await this.daySelect.check()
    }

    async fillPicture(picture: string) {
        await this.picture.setInputFiles(picture)
    }

    async setSummaryPageLocators(summaryPage: Page) {
        // Summary page fields
        this.nameLabel = summaryPage.locator("//strong[contains(text(), 'Nombre')]/ancestor::p");
        this.lastNameLabel = summaryPage.locator("//strong[contains(text(), 'Apellido')]/ancestor::p");
        this.ageLabel = summaryPage.locator("//strong[contains(text(), 'Edad')]/ancestor::p");
        this.countryLabel = summaryPage.locator("//strong[contains(text(), 'País')]/ancestor::p");
        this.genderLabel = summaryPage.locator("//strong[contains(text(), 'Sexo')]/ancestor::p");
        this.emailLabel = summaryPage.locator("//strong[contains(text(), 'Correo electrónico')]/ancestor::p");
        this.dayLabel = summaryPage.locator("//strong[contains(text(), 'Días en los que trabaja:')]/ancestor::p");
    }

    async doRegistration(
        name: string, 
        lastName: string, 
        age: string, 
        country: string, 
        gender: string, 
        email: string, 
        dayToSelect: string,
        dayToSelectOption: string,
        picture: string,
        expectedTitle: string, 
        testInfo: TestInfo) 
    {
        await this.nameTextBox.fill(name)
        await this.lastNameTextBox.fill(lastName)
        await this.ageTextBox.fill(age)
        await this.countrySelect.selectOption(country)
        await this.genderRadio.click()
        await this.emailTextBox.fill(email)
        await this.selectDay(dayToSelectOption)
        await this.fillPicture(picture)

        await testInfo.attach('register1', {
            body: await this.page.screenshot(),
            contentType: 'image/png'
        })
    
        const [summaryPage] = await Promise.all(
            [
                this.page.waitForEvent('popup'),
                this.page.locator("id=save-btn").click()
            ]
        )

        await summaryPage.waitForLoadState()

        await this.setSummaryPageLocators(summaryPage);
        
        await expect(summaryPage).toHaveTitle(expectedTitle)
        
        // Assert that the values ​​shown on the summary page are the same as those entered in the form.
        expect(await this.nameLabel.textContent()).toContain(name)
        expect(await this.lastNameLabel.textContent()).toContain(lastName)
        expect(await this.ageLabel.textContent()).toContain(age)
        expect(await this.countryLabel.textContent()).toContain(country)
        expect(await this.genderLabel.textContent()).toContain(gender)
        expect(await this.emailLabel.textContent()).toContain(email)
        expect(await this.dayLabel.textContent()).toContain(dayToSelect)
    }
}