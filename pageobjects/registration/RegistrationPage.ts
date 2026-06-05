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
        testInfo: TestInfo): Promise<Page>
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

        return summaryPage; 
    }
}