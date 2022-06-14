
//Object data modelling library for mongo
const mongoose = require('mongoose');

//Mongo db client library
//const MongoClient  = require('mongodb');

//Express web service library
const express = require('express')

//used to parse the server response from json to object.
const bodyParser = require('body-parser');

//instance of express and port to use for inbound connections.
const app = express()
const port = 3000

//connection string listing the mongo servers. This is an alternative to using a load balancer. THIS SHOULD BE DISCUSSED IN YOUR ASSIGNMENT.
const connectionString = 'mongodb://localmongo1:27017,localmongo2:27017,localmongo3:27017/sweetShopDB?replicaSet=rs0';

setInterval(function() {

  console.log(`Intervals are used to fire a function for the lifetime of an application.`);

}, 3000);

//tell express to use the body parser. Note - This function was built into express but then moved to a seperate package.
app.use(bodyParser.json());

//connect to the cluster
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var stockSchema = new Schema({
  _id: Number,
  rigID:Number,
 sensorData:String,
 timeStamp:Date
});

var dataModel = mongoose.model('data', dataSchema, 'data');


app.get('/', (req, res) => {
  dataModel.find({},'rigID sensorData timeStamp', (err, data) => {
    if(err) return handleError(err);
    res.send(JSON.stringify(data))
  }) 
})


app.post('/',  (req, res) => { 
  var new_data_instance = new dataModel(req.body); 
  new_data_instance.save(function (err) { 
  if (err) res.send('Error'); 
    res.send(JSON.stringify(req.bod


app.put('/',  (req, res) => {
  res.send('Got a PUT request at /')
})

app.delete('/',  (req, res) => {
  res.send('Got a DELETE request at /')
})

//bind the express web service to the port specified
app.listen(port, () => {
 console.log(`Express Application listening at port ` + port)
})



	  
