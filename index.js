const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const appPort = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res, next) => {
   response.send('Hello! Welcome to Application!');
});

app.use("/authen/", require("./routes/authen"));
app.use("/vaccination/", require("./routes/vaccination"));

app.listen(appPort, () => console.log(`Server is running! it is listening on port ${appPort}...`));
