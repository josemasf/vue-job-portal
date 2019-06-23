/* global require */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
module.exports.bcrypt = bcrypt;
const morgan  = require('morgan');
const process = require('process');
const {sequelize} = require('./models')
const config = require('./config/config.js');
const path  = require('path')
const app = express();
const fs = require('fs')
app.use(morgan('tiny'));
app.use(bodyParser.json())
app.use(cors());
app.use('/', express.static(path.join(__dirname, '../../vue-client/dist')))
const dir = '../../uploads';
//Create Uploads directory
try {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
   }
} catch (err) {
    console.log(err);
}

require('./JobSeekerPassport')
require('./EmployerPassport')
require('../src/routes/routes.js')(app, express)

app.set('port', process.env.PORT || config.port);



try{
    sequelize.sync().then(() =>{
        app.listen(process.env.PORT || config.port, () => console.log(`App listening on port ${config.port}!`))

    })
}catch(err){
    console.log(`${err}`)
}


