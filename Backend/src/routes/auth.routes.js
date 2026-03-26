const {Router}=require('express')
const authController=require("../controllers/auth.controller")
const authMiddleware=require("../middlewares/auth.middleware")

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

authRouter.get("/logout",authController.logoutUserControllers)


/**
 * @route: GET /api/auth/get-me
 * @description: get user details of current logged in user
 * @access: Private
 */

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeControllers)


module.exports=authRouter