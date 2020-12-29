var express = require("express");
var bodyParser = require('body-parser')
var app = express();

// --> 7)  Mount the Logger middleware here
app.use((req, res, next)=>{
	console.log(req.method + " " + req.path + " - " + req.ip)
	next()
})


// --> 11)  Mount the body-parser middleware  here
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
// app.get("/", (req, res) => res.send("Hello Express"));

/** 3) Serve an HTML file */
app.get("/", (req, res)=>res.sendFile(__dirname+"/views/index.html"))

/** 4) Serve static assets  */
// express.static(path) is an example of a middleware
//this middleware is mounted using app.use(path, middleWare) where the path is optional
//if no path is provided, the middleware is executed for all reqeests
app.use(express.static(__dirname+"/public"))

/** 5) serve JSON on a specific route */
app.get("/json", (req, res)=>{
	var msg = "Hello json"
	// console.log(process.env.MESSAGE_STYLE)
	if(process.env.MESSAGE_STYLE=="uppercase") msg = msg.toUpperCase()
	res.json({"message":msg})
})

/** 6) Use the .env file to configure the app */

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */
app.get("/now", (req, res, next)=>{
	req.time = new Date().toString()
	next()
}, (req, res)=>{
	res.json({time:req.time})
})

/** 9)  Get input from client - Route parameters */
// the colon indicates that this is part of the URL is input from the client
//so e.g. /darthvader/echo will result in req.word being darthvader
app.get("/:word/echo", (req, res)=>{
	// console.log(req)
	// console.log(req.params)
	res.json({echo:req.params.word})	
})


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req, res)=>{
	// console.log(req.query)
	res.json({name: req.query.first + " " + req.query.last})
})


// app.route("/name")
// 	.get((req, res)=>{
// 		res.json({name: req.query.first + " " + req.query.last})
// 	})
// 	.post((req, res)=>{
// 		console.log(req)
// 	})

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post("/name", (req, res)=>{
	// console.log(req.body)
	res.json({name:req.body.first + " " + req.body.last})
})

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
