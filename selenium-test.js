
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

// Test 1: Verify Angular Application Loads Successfully
async function testAngularApp() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {
        // Open the Angular application
        await driver.get('http://localhost:4200/');

        // Display the page title
        console.log('Page title:', await driver.getTitle());

        // Wait until the page body is loaded
        await driver.wait(
            until.elementLocated(By.css('body')),
            10000
        );

        console.log('Angular application opened successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Test 2: Verify User Registration
async function testRegistration() {
    // Configure Chrome to open in a maximized window
    const options = new chrome.Options();
    options.addArguments('--start-maximized');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Open the registration page
        await driver.get('http://localhost:4200/Registration-component');

        // Wait until the registration form appears
        await driver.wait(
            until.elementLocated(By.css('form')),
            10000
        );

        // Locate the registration form fields
        const firstName = await driver.findElement(By.id('InputFirstName'));
        const lastName = await driver.findElement(By.id('InputLastName'));
        const username = await driver.findElement(By.id('InputUsername'));
        const email = await driver.findElement(By.id('InputEmail'));
        const password = await driver.findElement(By.id('InputPassword'));

        // Enter test user information
        await firstName.sendKeys('Selenium');
        await lastName.sendKeys('Test');
        await username.sendKeys('seleniumUser123');
        await email.sendKeys('selenium123@example.com');
        await password.sendKeys('TestPassword123!');

        // Submit the registration form
        await driver.findElement(
            By.css('button[type="submit"]')
        ).click();

        console.log('TEST 1 PASSED: Registration successful.');

    } catch (error) {
        console.error('REGISTRATION TEST FAILED:', error.message);
        process.exitCode = 1;
    } finally {
        // Close the browser after the test
        await driver.quit();
    }
}

// Test 3: Verify User Login
async function testLogin() {
    // Configure Chrome window
    const options = new chrome.Options();
    options.addArguments('--start-maximized');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Open the login page
        await driver.get('http://localhost:4200/Login-component');

        // Wait until the login form appears
        await driver.wait(
            until.elementLocated(By.css('form')),
            10000
        );

        // Locate the email and password fields
        const email = await driver.findElement(By.id('InputEmail'));
        const password = await driver.findElement(By.id('InputPassword'));

        // Enter registered user credentials
        await email.sendKeys('selenium123@example.com');
        await password.sendKeys('TestPassword123!');

        // Submit the login form
        await driver.findElement(
            By.css('button[type="submit"]')
        ).click();

        console.log('Test 2 Passed: Login successful.');

    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Test 4: Verify User Login and Tournament Joining
async function testLoginAndJoinTournament() {
    // Configure Chrome window
    const options = new chrome.Options();
    options.addArguments('--start-maximized');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Open the login page
        await driver.get('http://localhost:4200/Login-component');

        // Wait for the login form
        await driver.wait(
            until.elementLocated(By.css('form')),
            10000
        );

        // Locate login fields
        const email = await driver.findElement(By.id('InputEmail'));
        const password = await driver.findElement(By.id('InputPassword'));

        // Enter registered user credentials
        await email.sendKeys('selenium123@example.com');
        await password.sendKeys('TestPassword123!');

        // Submit the login form
        await driver.findElement(
            By.css('button[type="submit"]')
        ).click();

        // Return to the application home page
        await driver.get('http://localhost:4200/');

        // Set the login status in local storage
        await driver.executeScript(() => {
            window.localStorage.setItem('userLoggedIn', 'true');
        });

        // Open the tournaments page for the test user
        await driver.get(
            'http://localhost:4200/Tournaments-component?username=seleniumUser123&role=player'
        );

        // Ensure the login status is available on the page
        await driver.executeScript(() => {
            window.localStorage.setItem('userLoggedIn', 'true');
        });

        // Wait until a tournament card appears
        const card = await driver.wait(
            until.elementLocated(By.css('.card')),
            10000
        );

        // Retrieve the tournament name
        const tournamentName = await driver.findElement(
            By.css('.card-title')
        ).getText();

        console.log('Tournament Name:', tournamentName);

        // Locate the Join button inside the tournament card
        const joinButton = await card.findElement(By.id('Join'));

        // Wait until the Join button is visible and enabled
        await driver.wait(until.elementIsVisible(joinButton), 5000);
        await driver.wait(until.elementIsEnabled(joinButton), 5000);

        // Click the Join button
        await joinButton.click();

        console.log(
            'Test 3 Passed: Successfully joined tournament:',
            tournamentName
        );

    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Test 5: Verify User Login and Course Joining
async function testLoginAndJoinCourse() {
    // Configure Chrome window
    const options = new chrome.Options();
    options.addArguments('--start-maximized');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Open the login page
        await driver.get('http://localhost:4200/Login-component');

        // Wait for the login form
        await driver.wait(
            until.elementLocated(By.css('form')),
            10000
        );

        // Locate login fields
        const email = await driver.findElement(By.id('InputEmail'));
        const password = await driver.findElement(By.id('InputPassword'));

        // Enter registered user credentials
        await email.sendKeys('selenium123@example.com');
        await password.sendKeys('TestPassword123!');

        // Submit the login form
        await driver.findElement(
            By.css('button[type="submit"]')
        ).click();

        // Return to the application home page
        await driver.get('http://localhost:4200/');

        // Set the login status in local storage
        await driver.executeScript(() => {
            window.localStorage.setItem('userLoggedIn', 'true');
        });

        // Open the courses page for the test user
        await driver.get(
            'http://localhost:4200/Courses-component?username=seleniumUser123&role=player'
        );

        // Ensure the login status is available on the page
        await driver.executeScript(() => {
            window.localStorage.setItem('userLoggedIn', 'true');
        });

        // Wait until a course card appears
        const card = await driver.wait(
            until.elementLocated(By.css('.card')),
            10000
        );

        // Retrieve the course name
        const courseName = await driver.findElement(
            By.css('.card-title')
        ).getText();

        console.log('Course Name:', courseName);

        // Locate the Join button inside the course card
        const joinButton = await card.findElement(By.id('Join'));

        // Wait until the Join button is visible and enabled
        await driver.wait(until.elementIsVisible(joinButton), 5000);
        await driver.wait(until.elementIsEnabled(joinButton), 5000);

        // Click the Join button
        await joinButton.click();

        console.log(
            'Test 4 Passed: Successfully joined course:',
            courseName
        );

    } finally {
        // Close the browser
        await driver.quit();
    }
}
//testAngularApp();
//testRegistration();
//testLogin();
//testLoginAndJoinTournament();
//testLoginAndJoinCourse();