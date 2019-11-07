const express = require('express');
const helmet = require('helmet')
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
const routes = require('./routes/routes');

app.use(helmet());
app.use(bodyParser.urlencoded({
  extended: true
}));
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

app.use('/', routes);

// **************************************************************************** //

// *************************************************************** //
//                    Serving Our Build File                       //  

// app.use(express.static(path.join(__dirname, '/../client/build')));
// app.get('/', (req, res) => {
//   res.sendfile(path.join(__dirname = '/../client/build/index.html'));
// })

// *************************************************************** //

app.post('/register', function(req, res, next) {
  connection.query('INSERT INTO temps values(2+req.body.name+'',''+req.body.email+'')', function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})