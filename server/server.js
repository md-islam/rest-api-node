var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var lions = [{id:1, name:"hello"},{id:2, name:"gaggu"}];
var id = 3;

app.get('/lions', function(req, res){
  res.json(lions);
});

//Get resource with ID
app.get('/lions/:id', function(req, res){
  // var lion = _.find(lions, {id: req.params.id});
  var lion = _.find(lions, {id:parseInt(req.params.id)});
  console.log(req.params.id)
  console.log(typeof(req.params.id))
  res.json(lion || {});
});

//Delete a resource
app.delete('/lions/:id', function (req, res) {
  res.send('DELETE request to homepage');
  var uri_id = parseInt(req.params.id);
  console.log(uri_id);
  _.remove(lions, {
    id: uri_id
  });
});


//Post resource incrementing ID
app.post('/lions', function(req, res) {
  console.log(req.body);
  var lion = req.body;
  id++;
  lion.id = id + '';

  lions.push(lion);

  res.json(lion);
});

//Put/ update a resource using ID
app.put('/lions/:id', function(req, res) {
  var update = req.body;
  console.log(update);
  if (update.id) {
    console.log("insideIf")
    delete update.id
  }

  var lion = _.findIndex(lions, {id: parseInt(req.params.id)});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function() {
 console.log("Node app is running at localhost:" + app.get('port'))
});

