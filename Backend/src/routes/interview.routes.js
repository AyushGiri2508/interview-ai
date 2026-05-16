const express=require("express");
const authMiddleware=require("../middlewares/auth.middleware");
const interviewController=require("../controllers/interview.controller")
const upload=require("../middlewares/file.middleware")



const interviewRouter=express.Router();

/**
 * @route POST/API/INTERVIEW
 * @description Generate interview report for the candidate based on the resume,self description and job description
 * @access PRIVATE
 */


interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterViewReportController)

module.exports=interviewRouter