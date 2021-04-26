# Notion Take-Home Server

## Description

I built a Fullstack Application to add new entries to my Notion “Netflix Shows” database. The database includes 3 columns: Title, Seen and Description. The app was built using React.js for the Web-Client and Node.js for the Web-Server. The server was created to not only support my database, but any database that only has "text" columns- the database ID and AuthToken may be changed from the ./config file. Future iterations of this app may include supporting additional data types and allowing users to add their database id and AuthToken from the Web-UI. The app works as:

1. App is started and Web client makes GET to server to attain the title and columns of database. Server interprets the HTTP request using the Express framework: the request is routed to the correct handler.
2. Server makes an Axios request to the API Notion API to perform database transaction (GET request: /databases/database_id). Server sends response (database title and columns or error)
   - If successful, Web-Client creates a Form composed of the database title and columns
   - If unsuccessful Error status and message is displayed to the user
3. User fills out form and hits submit button.
   - Web-client send request body to server
   - Server standardizes the request body to match Notion's api /pages requirements. The standardized body is used in the Axios request to the Notion API
4. Server makes an Axios request to the API Notion API to perform database transaction (POST request: /pages). Server sends response (success message or error)
   - If successful, Web-Client displays success message for 5 seconds and clears form
   - If unsuccessful: Error status and message is displayed to the user

Youtube Demo (Notion not mentioned): https://www.youtube.com/watch?v=jpGbF5gSTqs&ab_channel=MarcoFriaz

## Prereqs

Please ensure you have the latest version of Node downloaded.

- To check if already downloaded, from terminal: node -v
- To install, visit [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

## Setup

1. Setup Web-Server:

   1. From terminal, cd into notion-take-home-server directory
   2. Install dependencies (npm install)
   3. Run the server by running 'npm start'.

2. Set up Web-Client:

   1. From terminal, cd into notion-take-home-client directory
   2. Install dependencies (npm install)
   3. Run the client by running 'npm start'. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

3. Fill out form and click "submit" button

## Questions

1. Was there anything you got stuck on, and if so what did you do to resolve it?
   - I originally had only made a Web UI, and faced CORS issues making requests to Notion’s API. After getting a clarification from the assignment instructions to create a web server, I created my Web-Server and included CORs middleware to add the “Access-Control-Allow-Origin” to my response header, allowing my client to make requests to my server.
2. Do you have any suggestions for improving the API documentation to make it clearer or easier to use?
   - Initially, I thought I was going to use the “databases” endpoint for my GET and POST requests, but after reading into the API docs it was clear that the “pages” endpoint would be used for my POST request. This was also clarified in the “Database object” page clarifying that Pages are the 'rows' of the database. For a user that is not very familiar with Notion’s naming conventions, the idea that “Databases live inside pages. A Database is a bunch of pages” may confuse a developer when determining which endpoint to use. I would suggestion adding this as a clarification in the database and pages docs.
   - Rest of docs were great and extremely detailed!
3. A list of links to any major sources you relied on
   - Express Documentation: https://expressjs.com/en/guide/routing.html
4. A list of major open-source libraries you chose to use

- Web-Server:

  - Axios for networking
  - Express node framework to interpret HTTP requests and send HTTP responses
  - CORS: Express middleware to enable CORS

- Web-Client:
  - Axios for networking
  - [Create React App](https://github.com/facebook/create-react-app) for quickly boostrapping a React App with all configs
  - React
