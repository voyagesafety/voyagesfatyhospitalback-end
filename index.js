const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const appPort = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
   origin: ['https://voyagesafetybackend.ninja','https://voyage-safety-frontend.herokuapp.com','https://voyage-hospital-frontend.herokuapp.com'];
}
app.use(cors(corsOptions));
// app.use(cors);

// app.use(function (req, res, next) {

//    var allowedDomains = ['https://voyagesafetybackend.ninja','https://voyage-safety-frontend.herokuapp.com','https://voyage-hospital-frontend.herokuapp.com'];
//    var origin = req.headers.origin;
//    if(allowedDomains.indexOf(origin) > -1){
//      res.setHeader('Access-Control-Allow-Origin', origin);
//    }
 
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
//    res.setHeader('Access-Control-Allow-Credentials', true);
 
//    next();
//  })

app.get('/', (req, res, next) => {
   res.send('Hello! Welcome to Application!');
});

app.use("/authen/", require("./routes/authen"));
app.use("/vaccination/", require("./routes/vaccination"));

app.listen(appPort, () => console.log(`Server is running! it is listening on port ${appPort}...`));
