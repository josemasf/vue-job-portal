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
// const fs = require('fs')
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static(path.join(__dirname, '../../vue-client/dist')));
app.use('*/app/uploads/*', express.static(path.join(__dirname, '../../uploads/')));

// const employers = '../uploads/employers/employers/';
// const jobseekers = './uploads/employers/jobseekers/';
// //Create Uploads directory
// try {
//   if (!fs.existsSync(employers)){
//     fs.mkdirSync(employers);
//   }
//   if(!jobseekers){
//     fs.mkdirSync(jobseekers);
//   }
// } catch (err) {
//     console.log(err);
// }

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


