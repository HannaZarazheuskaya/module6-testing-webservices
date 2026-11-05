# Module 6 Task. Testing WebServices


## Task Description

### Task
1. Familiarize with restful-booker API - https://restful-booker.herokuapp.com/apidoc/index.html
2. Implement at least 4 test scenarios using one of JS native fetch (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 
For debugging please use Postman.
e.g.
Create a token and reuse it in the next API calls
Create a booking
Get created booking by id
Update booking
Remove booking

3. Add assertions for headers, status code and body of response
4. Add script into package.json to run API tests through the CLI
5. Push API tests to the remote repository and create a Merge Request

### Evaluation criteria (pass rate is 70%)
Here’s the list of actions which result in reduction of overall mark for a completed task:
1. Less than 3 tests implemented (-20%)
2. Not all mentioned assertions were used (-10%)
3. Script to run API test through the CLI was not added (-10%)
4. Small mistakes in code (-10%)


## Test scenarios
CRUD test scenarios were implemented (Create, Read, Update, Delete) in a single test suite.

```text
Manage booking using a specific token received in precondition
└── Precondition: should create a token - POST method
    ├── Scenario 1: should create a booking - POST method
    ├── Scenario 2: should get created booking by id - GET method
    ├── Scenario 3: should partially update created booking - PATCH method
    └── Scenario 4: should remove previously created booking - DELETE method
```



## Project structure
```
module6-testing-webservices
├── api.test.js         api-tests
├── test-data.js        test data
├── config.js           config file
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

```
* **api.test.js**: api tests for managing booking with a specific token created in precondition (Auth, Create, Get, Update, Delete endpoints)
* **test-data.js**: contains test data fixtures for api requests.
* **config.js**: contains base url.


## Tools and stack
* **Language:** JavaScript (Node.js modules)
* **HTTP CLient:** Native Fetch API
* **Test Runner/ Framework:** Mocha v12.0.3
* **Assertions:** Node.js assert module in strict mode (`node:assert/strict`)


## Instructions to run 

As a prerequisite, you need to have Node.js, Chrome and Edge installed. 

**1. Install the dependencies**

Open the project folder and run in terminal:
`npm install`

**2. Run all tests**

To run the api test suite using Mocha:
`npm test`