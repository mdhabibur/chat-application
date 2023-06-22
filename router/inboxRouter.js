//external imports
const express = require("express");

//internal imports
const {getInbox} = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");


const router = express.Router();

//inbox page
router.get("/", decorateHtmlResponse("Inbox"), getInbox);
//before calling the pages, we passed the titles at router level through middleware function
//but as middleware takes (req,res,next) params so this function must return a middleware of (req,res,next)


module.exports = router;