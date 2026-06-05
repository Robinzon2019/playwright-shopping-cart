import { Locator, Page } from "@playwright/test"

export class SummaryPage {
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
        // Summary page fields
        this.nameLabel = page.locator("//strong[contains(text(), 'Nombre')]/ancestor::p");
        this.lastNameLabel = page.locator("//strong[contains(text(), 'Apellido')]/ancestor::p");
        this.ageLabel = page.locator("//strong[contains(text(), 'Edad')]/ancestor::p");
        this.countryLabel = page.locator("//strong[contains(text(), 'País')]/ancestor::p");
        this.genderLabel = page.locator("//strong[contains(text(), 'Sexo')]/ancestor::p");
        this.emailLabel = page.locator("//strong[contains(text(), 'Correo electrónico')]/ancestor::p");
        this.dayLabel = page.locator("//strong[contains(text(), 'Días en los que trabaja:')]/ancestor::p");
    }

    async getNameLabel() {
        return await this.nameLabel.textContent()
    }

    async getLastNameLabel() {
        return await this.lastNameLabel.textContent()
    }

    async getAgeLabel() {
        return await this.ageLabel.textContent()
    }

    async getCountryLabel() {
        return await this.countryLabel.textContent()
    }

    async getGenderLabel() {
        return await this.genderLabel.textContent()
    }

    async getEmailLabel() {
        return await this.emailLabel.textContent()
    }

    async getDayLabel() {
        return await this.dayLabel.textContent()
    }
}