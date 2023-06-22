const createError = require("http-errors");

//404 not found handlers
function notFoundHandler(req, res, next){
    next(createError(404, "Your requested content was not found oops")); //the parameter passed inside the next() will show as errors

}


//default error handlers: 'err' will be one more parameter
function errorHandler(err, req, res, next){
    //this project is a full stack project where html template(front end) will also be run by the server and json request too
    //not like the react single page project where front-end and back-end works separately and request goes from front-end to back-end in json format

    //so here need to handle both the html and json response

    //response in json formate
    // res.json({ });

    //but response in html format(views)
    //we can pass object too

    /*

    //these two are equivalent, you can pass the 'title' or any property inside the 'res.locals' object or as 
    a separate object inside the res.render() method

    res.locals.title = "Error page";
     res.render("error");

    case 2:

    res.render('error',{
        title: "Error page",
    });
    */

    res.locals.error = process.env.NODE_ENV === 'development' ? err : {message: err.message};

    res.status(err.status || 500);

    //response may be in html format or in json(when api calling)
    if(res.locals.html){
        //html response
        res.render("error", {
            title: "error page",

        });

    }else {
        //json response
        res.json(res.locals.error);
    }

    //so this error handler handles both the json and html error response

}


module.exports = {
    notFoundHandler: notFoundHandler,
    errorHandler: errorHandler,
}