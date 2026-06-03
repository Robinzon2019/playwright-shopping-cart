import { Page } from "@playwright/test";

export class NavigateTo {
    private readonly page: Page;
    private readonly loginPageUrl: string = 'http://127.0.0.1:5500/login.html';
    private readonly registerPageUrl: string = 'http://127.0.0.1:5500/register.html';
    private readonly shoppingCartUrl: string = 'http://127.0.0.1:5500/shopping-cart.html';

    constructor(page: Page) {
        this.page = page;
    }

    async loginPage() {
        await this.page.goto(this.loginPageUrl);
    }

    async registerPage() {
        await this.page.goto(this.registerPageUrl);
    }

    async shoppingCartPage() {
        await this.page.goto(this.shoppingCartUrl);
    }
}
