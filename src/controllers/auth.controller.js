const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const blacklistTokenModel=require("../models/blacklist.model")

/**
 * @name registerUserControllers
 * @description Register a new user,expects name,email and password in the request body
 * @access Public
 */

async function registerUserControllers(req,res){
    const {username,email,password}=req.body

    if(!username || !email || !password){
        return res.status(400).json({message:"Please provide all required fields"})
    }

    const isUserAlreadyExists=await userModel.findOne({
        $or:[{username},{email}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({message:"User already exists with this username or email address"})
    }

    const hash=await bcrypt.hash(password,10);

    const user=await userModel.create({
        username,
        email,
        password:hash
    })

    const token=jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )


    res.cookie("token",token)

    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
    

}

/**
 * @name loginUserControllers
 * @description Login a user,expects email and password in the request body
 * @access Public
 */

async function loginUserControllers(req,res){
const {email,password}=req.body;

const user= await userModel.findOne({
    email
})
if(!user){
    return res.status(400).json({message:"Invalid email or password"})
}

const isPasswordValid= await bcrypt.compare(password,user.password);
if(!isPasswordValid){
    return res.status(400).json({
        message:'Invalid email or password',
    })
}
        const token=jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)
    res.status(200).json({
        message:"User loggedIN successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }

    })   
}


async function logoutUserControllers(req,res){
  const token=req.cookies.token;
  if(!token){
    return res.status(400).json({message:"No token found in cookies"})
  }
}
module.exports={
    registerUserControllers,
    loginUserControllers,
}