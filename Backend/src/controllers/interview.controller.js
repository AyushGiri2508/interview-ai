
const pdfParse=require("pdf-parse");
const generateInterViewReport=require("../services/ai.service")
const interviewReportModel=require("../models/interviewReport.model")


async function generateInterViewReportController(req,res){


    const resumeContent=await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const{jobDescription,selfDescription}=req.body

    const interViewReportbyAi= await generateInterViewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })
    const interviewReport= await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescciption,
        jobDescription,
        ...interViewReportbyAi
    })
    res.status(201).json({
        message:"Interview report generated Successfully",
        interviewReport
    })

 } 

module.exports={generateInterViewReportController}