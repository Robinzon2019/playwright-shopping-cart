import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pageobjects/login/LoginPage';
import { AddTransactionPage } from '../../pageobjects/add-transactions/AddTransactionPage';
import { faker } from '@faker-js/faker';
import { NavigateTo } from '../../pageobjects/navigate/NavigateTo';

test('login', async ({page}) => {
    
    await test.step("Navigate to login page", async () => {
        const navigateTo = new NavigateTo(page)
        await navigateTo.loginPage()
    });  

    const transactionDate = '2024-10-23'
    const transactionAmount = faker.number.int({ min: 2000, max: 10000 }).toString()
    const transactionDescription = faker.food.description()

    await test.step("Login to the application", async () => {
        const loginPage = new LoginPage(page)
        await loginPage.doLogin('user', 'pass')
    });

    await page.waitForLoadState('load')

    const addTransactionPage = new AddTransactionPage(page)

    await test.step("Add a new transaction", async () => {
        await addTransactionPage.addTransaction(transactionDate, transactionAmount, transactionDescription)
    });

    await test.step("Verify the added transaction", async () => {
        expect(await addTransactionPage.getCurrentDate(1)).toEqual(transactionDate)
        expect(await addTransactionPage.getCurrentAmount(1)).toEqual(transactionAmount)
        expect(await addTransactionPage.getCurrentDescription(1)).toEqual(transactionDescription)
    });

    // await page.pause()
})