# Freelance Pro

## Summary
A Customer Relationship Manager (CRM) is a necessary tool for all businesses to thrive. Freelance Pro is the solution tailored for Freelancers to grow their business! A lightweight CRM that allows users to better manage and engage with their clients and prospects. Full feature list below! If you are interested in using the application please see "Join - Freelance Pro" section

### Features
<ol>
    <li>Track your services</li>
    <li>Track your client engagements</li>
    <li>Create and Track promotions to reward your clients</li>
    <li>Connect directly to your email
        <ul>
            <li>Email promotions</li>
            <li>Email Invoices</li>
            <li>Email Thank You's</li>
        </ul>
    </li>
    <li>Connect directly to your Google Calender to schedule appointments </li>
    <li>Analyze your earnings by month/ clients</li>
</ol>

### Try it out
Visit the deployment for this site https://freelancepro-client.rtanubra.now.sh and follow the Give us a quick try section on the landing page.

### Join - Freelance Pro
To use the full features of the application, a bit of back end work needs to be done to connect to your email and callender. I would love to help you with that, contact me below:

Contact Rey Tanubrata - rdtanubrata@gmail.com

## Links

### Deployment for this site:
https://freelancepro-client.rtanubra.now.sh

### Backend Github
https://github.com/rtanubra/freelancePro_backEnd

### Frontend Github
https://github.com/rtanubra/FreeLancePro_Client

## Current and Future Clients

### Feature Request
If you would like to request features to be added to this CRM or collaborate on development, please reach out to me at my contact below.

### Contact
Email - rdtanubrata@gmail.com

## Available Scripts
### `npm start`
Runs the app in the development mode.<br>
### `npm test`
Launches the test runner in the interactive watch mode.<br>
### `npm run build`
Builds the app for production to the `build` folder.<br>
### `npm run deploy`
Builds and deploys your application to production<br>

## API Documentation

Development Server located at: [http://localhost:8000/api/](http://localhost:8000/api/)

Production Server located at: [https://stark-beach-37537.herokuapp.com/api/](https://stark-beach-37537.herokuapp.com/api/)

All return objects (if present) will be in JSON objects. All input bodies (if required) are JSON objects.

<ol>
    <li>Authentication</li>
    <li>Promos</li>
    <li>Clients</li>
    <li>Services</li>
    <li>Emails (Continuing Development)</li>
</ol>

### `Authentication`

#### `POST: /login`

Posts a user authentication for login. 
Body should include:

<ul>
    <li>email - base 64 encoded</li>
    <li>password - base 64 encoded</li>
</ul>

Success will return:
<ul>
    <li>authToken</li>
    <li>Payload
        <ul>
            <li>user_id</li>
            <li>email</li>
        </ul>
    </li>
</ul>

Failure will return:
error

### `Promos`

promos is protected. All protected endpoints require an authentication header. Authentication header is a bearer token with an authtoken obtained from Authorization.

#### `GET /promos`

Gets all promotions from flp_promos table

Success returns an array of promotion objects
