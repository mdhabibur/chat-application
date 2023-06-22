//entry point of the application

//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal imports
const {notFoundHandler, errorHandler} = require('./middlewares/common/errorHandler');
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");



const app = express();
dotenv.config();  //dotenv is set up

//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true, //for suppressing error or  warning
    useUnifiedTopology: true, //for suppressing error with legacy package


})
.then(() => console.log("database connection successful"))
.catch(err => console.log(err));

//request parser
app.use(express.json()); //for parsing json data
app.use(express.urlencoded({extended: true})); //for handling for data and extended: true for query parameter too

//set view engine (set up ejs template)
//by default it will find/read the .ejs files inside the views folder

app.set("view engine", "ejs");

// app.get('/', function(req, res){
//     res.send("Hello world22s!");
//  });

//set static folders/public folders : will be accessible
app.use(express.static(path.join(__dirname, "public")));

//parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));



//routing setup
//there will be 3 pages(index/home/login, inbox and user list page)so routes will also be three

app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);



//error handling
//404 not found handlers middleware
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);






app.listen(process.env.PORT, () => {

    console.log(`app listening to port no ${process.env.PORT}` );
    console.log('from coding terminal');


});







