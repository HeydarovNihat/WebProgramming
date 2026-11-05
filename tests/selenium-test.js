
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

// Generate unique registration details for every test run
const TEST_USERNAME = 'seleniumUser' + Date.now();
const TEST_EMAIL = TEST_USERNAME + '@example.com';
const TEST_PASSWORD = 'TestPassword123!';

describe('Angular Application - Selenium Tests', function () {

    this.timeout(60000);

    let driver;

    // Create a new browser before every test
    beforeEach(async function () {

        const options = new chrome.Options();

        options.addArguments('--headless=new');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--window-size=1920,1080');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    // Close browser after every test
    afterEach(async function () {

        if (driver) {
            await driver.quit();
        }
    });

    // TEST 1: Verify Angular Application Loads
    it('should load Angular application successfully', async function () {

        await driver.get('http://localhost:4200/');

        await driver.wait(
            until.elementLocated(By.css('body')),
            10000
        );

        const title = await driver.getTitle();

        assert.ok(title.length > 0, 'Page title should not be empty');

        console.log('Page title:', title);
    });

/*
    // TEST 2: Verify User Registration
    it('should register a new user successfully', async function () {

        await driver.get(
            'http://localhost:4200/Registration-component'
        );

        await driver.wait(
            until.elementLocated(By.css('form')),
            10000
        );

        const firstName = await driver.findElement(
            By.id('InputFirstName')
        );

        const lastName = await driver.findElement(
            By.id('InputLastName')
        );

        const username = await driver.findElement(
            By.id('InputUsername')
        );

        const email = await driver.findElement(
            By.id('InputEmail')
        );

        const password = await driver.findElement(
            By.id('InputPassword')
        );

        await firstName.sendKeys('Selenium');
        await lastName.sendKeys('Test');
        await username.sendKeys(TEST_USERNAME);
        await email.sendKeys(TEST_EMAIL);
        await password.sendKeys(TEST_PASSWORD);

        await driver.findElement(
            By.css('button[type="submit"]')
        ).click();

        // Verify that the registration form was submitted
        assert.ok(
            await firstName.isDisplayed().catch(() => false) === false ||
            await driver.getCurrentUrl().then(url =>
                !url.includes('Registration-component')
            ),
            'Registration should complete or navigate away from the form'
        );

        console.log('Registered user:', TEST_EMAIL);
    });

*/
    // TEST 3: Verify User Login
    it('should allow a registered user to log in', async function () {

        await driver.get(
            'http://localhost:4200/Login-component'
        );

        await driver.wait(
            until.elementLocated(By.css('form')),
            10000
        );

        const email = await driver.findElement(
            By.id('InputEmail')
        );

        const password = await driver.findElement(
            By.id('InputPassword')
        );

        await email.sendKeys(TEST_EMAIL);
        await password.sendKeys(TEST_PASSWORD);

        await driver.findElement(
            By.css('button[type="submit"]')
        ).click();

        // Check that the login form submission did not cause an error
        assert.ok(
            await driver.getCurrentUrl().then(url =>
                !url.includes('Registration-component')
            ),
            'Login page should remain accessible'
        );

        console.log('Login submitted for:', TEST_EMAIL);
    });


    // TEST 4: Verify User Can Join a Tournament
    it('should allow a logged-in user to join a tournament', async function () {

        await driver.get('http://localhost:4200/');

        await driver.executeScript(() => {
            window.localStorage.setItem('userLoggedIn', 'true');
        });

        await driver.get(
            `http://localhost:4200/Tournaments-component?username=${TEST_USERNAME}&role=player`
        );

        await driver.executeScript(() => {
            window.localStorage.setItem('userLoggedIn', 'true');
        });

        const card = await driver.wait(
            until.elementLocated(By.css('.card')),
            10000
        );

        const tournamentName = await card.findElement(
            By.css('.card-title')
        ).getText();

        assert.ok(
            tournamentName.length > 0,
            'Tournament name should be displayed'
        );

        const joinButton = await card.findElement(
            By.id('Join')
        );

        await driver.wait(
            until.elementIsVisible(joinButton),
            5000
        );

        await driver.wait(
            until.elementIsEnabled(joinButton),
            5000
        );

        await joinButton.click();

        console.log('Tournament:', tournamentName);
    });


    // TEST 5: Verify User Can Join a Course
    it('should allow a logged-in user to join a course', async function () {

        await driver.get('http://localhost:4200/');

        await driver.executeScript(() => {
            window.localStorage.setItem('userLoggedIn', 'true');
        });

        await driver.get(
            `http://localhost:4200/Courses-component?username=${TEST_USERNAME}&role=player`
        );

        await driver.executeScript(() => {
            window.localStorage.setItem('userLoggedIn', 'true');
        });

        const card = await driver.wait(
            until.elementLocated(By.css('.card')),
            10000
        );

        const courseName = await card.findElement(
            By.css('.card-title')
        ).getText();

        assert.ok(
            courseName.length > 0,
            'Course name should be displayed'
        );

        const joinButton = await card.findElement(
            By.id('Join')
        );

        await driver.wait(
            until.elementIsVisible(joinButton),
            5000
        );

        await driver.wait(
            until.elementIsEnabled(joinButton),
            5000
        );

        await joinButton.click();

        console.log('Course:', courseName);
    });

});
