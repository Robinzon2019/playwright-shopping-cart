import { Locator, Page } from "@playwright/test"

export class AddTransactionPage {
    private readonly addTransactionButton: Locator
    private readonly transactionDate: Locator
    private readonly transactionAmount: Locator
    private readonly transactionDescription: Locator
    private readonly saveTransactionButton: Locator
    private readonly page: Page

    private currentDateRow: Locator
    private currentAmountRow: Locator
    private currentDescriptionRow: Locator

    constructor(page: Page) {
        this.page = page
        this.addTransactionButton = page.locator("//button[contains(text(), 'Añadir transacción')]");
        this.transactionDate = page.locator("id=date");
        this.transactionAmount = page.locator("input[id='amount']");
        this.transactionDescription = page.locator("input[id='description']");  
        this.saveTransactionButton = page.locator("//button[contains(text(), 'Guardar')]");
        this.currentDateRow = page.locator(`//tbody[@id='transactions-list']//tr[1]//td[1]`);
        this.currentAmountRow = page.locator(`//tbody[@id='transactions-list']//tr[1]//td[2]`);
        this.currentDescriptionRow = page.locator(`//tbody[@id='transactions-list']//tr[1]//td[3]`);
    }

    async addTransaction(date: string, amount: string, description: string) {
        await this.addTransactionButton.click();
        await this.transactionDate.fill(date);
        await this.transactionAmount.fill(amount);
        await this.transactionDescription.fill(description);
        await this.saveTransactionButton.click();
    }

    async getCurrentAmount(rowNumber: number) {
        this.currentAmountRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${rowNumber}]//td[2]`);
        return await this.currentAmountRow.textContent();
    }

    async getCurrentDate(rowNumber: number) {
        this.currentDateRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${rowNumber}]//td[1]`);
        return await this.currentDateRow.textContent();
    }

    async getCurrentDescription(rowNumber: number) {
        this.currentDescriptionRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${rowNumber}]//td[3]`);
        return await this.currentDescriptionRow.textContent();
    }
}