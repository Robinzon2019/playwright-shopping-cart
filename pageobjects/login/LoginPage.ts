import { Locator, Page } from "@playwright/test";

export class LoginPage{
    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator

    constructor(page: Page) {
        this.usernameTextbox = page.locator('input#username');
        this.passwordTextbox = page.locator("input[id='password']");
        this.loginButton = page.locator("//button[@type='submit']");
    }

    private async fillUserName(username: string) {
        await this.usernameTextbox.fill(username);
    }

    private async fillPassword(password: string) {
        await this.passwordTextbox.fill(password);
    }

    private async clickLoginButton() {
        await this.loginButton.click();
    }

    async doLogin(username: string, password: string) {
        await this.fillUserName(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }
}