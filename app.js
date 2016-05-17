const PORT_NUMBER = 5000;
var express = require("express");
var app = express();

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req,res){
   res.render("index");
});
app.get("/:time", function(req,res){
	//setup variables
	var unixtime, naturaldate, date;
	//check if :time is unix or natural
	if (Number.isInteger(+req.params.time)) {
		//unix timestamp
		unixtime = +req.params.time;
		date = new Date(unixtime * 1000);
	}
	else {
		date = new Date(req.params.time);
		if (!date.getTime()) {
			//bad request
			res.writeHead(400);
			res.end("bad request");
		}
		unixtime = date.getTime() /1000;//convert to second
		//natural date
	}

	//formatting natural date
	var locale = 'en-us';
	var month = date.toLocaleString(locale, {month : "long"});
	var day = date.getDate();
	var year = date.getFullYear();
	naturaldate = month + " " + day + ", " + year;
	
	//building result
	var result = {
		unix : unixtime,
		natural : naturaldate
	};
	res.writeHead(200, { 'Content-Type': 'application/json' });   
	res.end(JSON.stringify(result));
});
//dummy api for bukalapak tech test
app.get("/bukalapak/:id", function(req,res){
	res.writeHead(200, { 'Content-Type': 'application/json' });   
	res.end(JSON.stringify({
		id: req.params.id,
		stock: Math.floor(Math.random() * 500) + 1,
		description: "Four dollar toast flexitarian hella, chia fashion axe quinoa chicharrones. Pickled pug DIY, four dollar toast skateboard umami gluten-free brooklyn put a bird on it chartreuse craft beer small batch lomo health goth"
	}));
});

app.listen(process.env.PORT || PORT_NUMBER);
console.log("listening at port " + PORT_NUMBER);