const mongoose = require("mongoose");

/**
 * job description schema:string
 * resume text:string
 * self description:string
 *
 * matchScore:Number
 * technical question and answer:[{
 *       question:"",
 *        intension:"",
 *        answer:"",
 * }]
 * behavioral question and answer:[
 * {
 *        question:"",
 *        intension:"",
 *        answer:"",
 * }
 * ]
 * skills gap:[
 * {
 *      skill:"",
 * servirity:{
 * type: String,
 * enum: ['low', 'medium', 'high'],}}]
 * preparation plan;[{
 * day:Number,
 * topic:string,
 * task:[String]
 * }]
 */

const technicalQuestionsSchema= new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical Questions is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is Required"]
    }
},{
    _id:false
})

const behavioralQuestionsSchema= new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical Questions is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is Required"]
    }

},{
    _id:false
})


const skillGapSchema= new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type: String,
        enum: ['low', 'medium', 'high'],
        required:[true,"Severity is required"]
    }
},{
    _id:false
})

const preparationPlanSchema= new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    }, 
    tasks:[{
        type:String,
        required:[true,"Task is required"]
    }]
})




const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"JOB Description is Required"]
    },
    resume:{
        type:String,
    },
    selfDescciption:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{
    timestamps:true
})


const interviewReportModel=mongoose.model("InterviewReport",interviewReportSchema);

module.exports=interviewReportModel;
