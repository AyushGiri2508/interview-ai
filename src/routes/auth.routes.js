const {Router}=require('express')
const authController=require("../controllers/auth.controller")

const authRouter= Router()

/**
* @route POST/api/auth/register
* @description Register a new user
* @access Public
*/

authRouter.post("/register",authController.registerUserControllers)



/**
 * @route POST/api/auth/login
 * @description loginuser with emailand password
 * @access Public
 
 */

authRouter.post("/login",authController.loginUserControllers)



/**
 * @route: GET /api/auth/logout
 * @description: clear token from user cookie and add the token in blacklist
 * @access: Public
 */


module.exports=authRouter