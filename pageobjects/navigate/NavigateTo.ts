import { Page } from "@playwright/test";

export class NavigateTo {
    private readonly page: Page;
    private readonly loginPageUrl: string = 'https://robinzon2019.github.io/shopping-cart-demo/login/login.html';
    private readonly registerPageUrl: string = 'https://robinzon2019.github.io/shopping-cart-demo/registration/register.html';
    private readonly shoppingCartUrl: string = 'https://robinzon2019.github.io/shopping-cart-demo/shopping%20cart/cart.html';

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
