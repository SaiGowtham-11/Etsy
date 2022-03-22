# Etsy Application

### __GOAL:__ ###

The Etsy app's purpose is to perform the following tasks:
Customer:
1) If they are a new user, they can sign up, and if they are an existing user, they can log in and out.
2) Each user has a dashboard page that lists all of his or her items.
3) A search option has been created to help you find the things you need.
4) The user will have access to a profile page where they may change their profile pictures and information.
5) A separate favorite page allows the user to keep track of their preferred products.
6) The store page can be used to add products to the page, which are then added to the products.
7) The cart is where the user's saved things are kept.


### __SYSTEM DESIGN:__ ###
Users can place orders from online retailers using this Etsy application. NodeJS is used for the server, MYSQL is used for the backend, and ReactJS is used for the frontend. ReactJS makes a call to the NodeJS server in the system, which collects the calls and stores them in the database. ReactJS sends requests to the backend, while NodeJS receives them and performs database queries, inserting, updating, or retrieving data. All of the data is posted and retrieved using certain routes. The data entered by the user upon signup was encrypted using Bcrypt. Every function has its own validation and error exceptions. Cookies have been used to manage the session.
1) The client's perspective To make GET and POST REST API calls to server-side express, ReactJS needs various routes.
2) On the server, NodeJS receives the requests and runs the appropriate queries against the Amazon RDS MySQL database.
3) NodeJS controls the session and sets the cookies at the same time on the server.
4) When a request is received via NodeJS, CRUD operations are performed on the MySQL database.
5) NodeJS on the server sends data to ReactJS on the client, which is subsequently displayed.


### __Front End:__ ###
React – A powerful JavaScript Framework used for building single page applications. Redux – A state management library used by react to 
manage global state of the application.JSX (Embedded HTML in JS) CSS – Cascaded Style sheets.

### __Backend:__ ###
Node Js – A JavaScript runtime on the server side based on Google Chromes V8 Engine and supports ES6 features of JavaScript Express – Nodejs Framework for handling incoming requests and outgoing responses.Database : MySQL is an open source relational database management system (RDBMS) with a client-server model. RDBMS is a software or service used to create and manage databases based on a relational model. Now, let’s take a closer look at each term: A database is simply a collection of structured data.

### __In the project directory, you can run:__ ###
### __npm run dev__ ###
This command is used to concurrenlty run both frontend and backend at the same time. We leveraged the concurrenlty pacakage. 
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
