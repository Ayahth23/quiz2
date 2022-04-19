
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/city_attributes.csv', function(req, res) {
    res.sendFile(path.join(__dirname, '/city_attributes.csv'));
  });

app.get('/data.csv', function(req, res) {
    res.sendFile(path.join(__dirname, '/data.csv'));
 });

app.get('/jquery.js',function(req,res){
    res.sendFile(__dirname+'/jquery.js');
});

app.use(express.static(path.join(__dirname, './quiz2/dist/quiz2')));



const MongoClient = require('mongodb').MongoClient;

//connection url
const uri = "mongodb+srv://tharwa:password1234@cluster0.pw9fk.mongodb.net/quiz2?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("quiz2").collection("quiz2");
  // perform actions on the collection object

  client.close();
});

//GET /mongo
app.get('/',(req,res) => {
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("quiz2");
      dbo.collection("quiz2").find().toArray(function(err,result){
          if (err) throw err;
          res.send(result);
          db.close();
      });
  });
});


app.get('/weather/:id',(req,res) => {
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("quiz2");
      dbo.collection("quiz2").find().toArray(function(err,result){
          if (err) throw err;
          res.send(result);
          db.close();
      });
  });
});

app.get('/weather/:id', async(req, res) =>{
    
  let code = req.query['country'];
  const api_url='http://api.weatherapi.com/v1/current.json?key=e22885d2e04db7ae273c6e5676b5a918'+code;
  const fetch_response = await fetch(api_url);
  const api_result = await fetch_response.json();
  
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("quiz2");
      dbo.collection("quiz2").insertOne(api_result["current"], function(err, res) {
          if (err) throw err;
          console.log("Number of weather record inserted: " + res.insertedCount);
          db.close();
      });
  });
})

app.post('/weather:id', function(req, res){
  res.send({
      type: 'POST',
      country: req.body.country,
      city: req.body.city
  });
});

// update a country's weather in the database
app.put('/weather/:id',function(req,res){
  Weather.findOneAndUpdate({_id: req.params.id},req.body).then(function(weather){
      weather.findOne({_id: req.params.id}).then(function(weather){
          res.send(weather);
      });
  });
});
app.put('/weather/:id', function(req, res){
  res.send({type: 'PUT'});
});

app.delete('/weather/:id', function(req, res){
  Weather.findOneAndDelete({_id: req.params.id}).then(function(weather){
    res.send(weather);
  });
});

app.delete('/weather', function(req, res){
  console.log('Fetching data');
  db.quiz2.remove({_id: req.params.id}, function(err,doc){
  if (err){
    res.send(err);
  }else{
    console.log('removing data');
 
    res.json(doc);
    }
  });
});


/*create weather schema & model
const weatherSchema = new Schema({
    country: {
        type: String,
    },
    city: {
        type: String,
        required: [true, 'Roll field is required']
    },
    present: {
        type: Boolean,
        deafult: true
    }
});

*/

app.listen(port);
console.log('Server started at http://localhost:' + port);
