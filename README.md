# URL-SHORT
URL Shorter

# How to run the  project

1) Step 1:

    A) Server:
    
    Install the packages:
    npm install

    Install pgAdmin
    
    In development Stage:
    
    Config the pgAdmin Database

  "development": {

    "username": "postgres",
    "password": "root",
    "database": "urlshort",
    "host": "127.0.0.1",
    "dialect": "postgres"

  },

  Create the database (pgAdmin):
  urlshort

  
  Type the command:
  npx sequelize db:migrate


  Now first run the server side.
  npm start

2) Step 2:

Go to client folder:
cd client

Install the packages:
npm install


now run the client side :
npm start

