const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const helmet = require('helmet');
const employeesRouter = require('./routes/employees');
const clientsRouter = require('./routes/clients');
const diagnosisRouter = require('./routes/diagnosis');

const port = process.env.PORT || 5000; 

const app = express();

let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

supertokens.init({
    supertokens: {
        //connectionURI: "http://localhost:3567", //https://try.supertokens.io http://localhost:3567
        connectionURI: "https://f5118131000e11ec82f83b2ed341776e-eu-west-1.aws.supertokens.io:3568",      
        apiKey: "HqXXKkxr5tBRqpovD9Zt4W8acjdilz"
    },
    appInfo: {
        // learn more about this on https://supertokens.io/docs/emailpassword/appinfo
        appName: "felis", // Example: "SuperTokens",
        apiDomain: "http://localhost:3000", // Example: "https://api.supertokens.io",
        websiteDomain: "http://localhost:3000" // Example: "https://supertokens.io"
    },
    recipeList: [
        EmailPassword.init(), // initializes signin / sign up features 
        Session.init() // initializes session features
    ]
});

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: false,
}));

app.use(supertokens.middleware());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.use('/employees', employeesRouter);
  app.use('/clients', clientsRouter);
  app.use('/diagnosis', diagnosisRouter);

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../frontend/build/index.html'))
  })

  
  app.use(supertokens.errorHandler());
  
  app.listen(port, function(){
      console.log('Server started on port '+port);
  });