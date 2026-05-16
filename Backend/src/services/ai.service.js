const { GoogleGenAI } =require("@google/genai");
const {z}= require("zod");
const {zodToJsonSchema}=require("zod-to-json-schema")
const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

    const interviewReportSchema=z.object({

        matchScore:z.number().describe("A score indicating how well the candidate's resume and self-description match the job description, on a scale of 0 to 100"),
        technicalQuestions:z.array(z.object({
            question:z.string().describe("The technical question asked during the interview"),
            intension:z.string().describe("The intention behind asking the technical question"),
            answer:z.string().describe("How to answer this question, what points to cover,what approach to take, etc.")
        })).describe("Technical questions asked during the interview"),
        behavioralQuestions:z.array(z.object({
            question:z.string().describe("The behavioral question asked during the interview"),
            intension:z.string().describe("The intention behind asking the behavioral question"),
            answer:z.string().describe("How to answer this question, what points to cover,what approach to take, etc.")
        })).describe("Behavioral questions asked during the interview"),
        skillGaps:z.array(z.object({
            skill:z.string().describe("The skill that the candidate is lacking"),
          severity:z.enum(["low","medium","high"]).describe("The severity of the skill gap"),
    })).describe("Skill gaps identified during the interview"),


        preparationPlan:z.array(z.object({
           day:z.string().describe("The day of the preparation plan"),
           focus:z.string().describe("The focus of the preparation for that day, e.g., technical questions, behavioral questions, etc."),
           tasks:z.array(z.string()).describe("The specific tasks to be completed on that day to prepare for the interview, e.g., practice coding problems, review common behavioral questions, etc.")
        })).describe("Preparation plan for the candidate to improve their interview performance in the future")
    })
async function generateInterviewReport({resume,selfDescription,jobDescription}){
    const prompt=`Generate an interview report for a candidate based on the following information:

Resume: ${resume}
selfDescription: ${selfDescription}
Job Description: ${jobDescription}`
    const response=await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:zodToJsonSchema(interviewReportSchema)

        }
    })
    return JSON.parse(response.text)
}  

module.exports= generateInterviewReport

