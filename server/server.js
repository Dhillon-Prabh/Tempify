const express = require('express');
const helmet = require('helmet')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = 3001; 

// includes db configuration info
let dbconfig = require(__dirname + '/config/db-config.json');

// mysql connection
let connection = mysql.createConnection(dbconfig);

connection.connect(function (err) {
  if (err) throw err;
  connection.query("SELECT * FROM test", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  console.log('Database connected!');
});

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// **************************************************************************** //
//                    Gets Around CORS ISSUE                                    // 
//            Will be unneccesary once we serve the build file                  // 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

// **************************************************************************** //

app.get('/', (req,res,next) => {
  res.send({
    temp: "five guys - json data"
  });
})

// *************************************************************** //
//                    Serving Our Build File                       //  

// app.use(express.static(path.join(__dirname, '/../client/build')));
// app.get('/', (req, res) => {
//   res.sendfile(path.join(__dirname = '/../client/build/index.html'));
// })

// *************************************************************** //

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})

//