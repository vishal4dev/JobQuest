import jwt from 'jsonwebtoken';

const isAuthenticated = async (req,res,next)=>{

    try {
        //This line attempts to retrieve the JWT token from the cookies, where the token is assumed to be stored under the key token.
        const token = req.cookies.token;
        //check if token exists
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            });
        }
        
        //verify the token if it exists
        //If a token exists, the code verifies it using jwt.verify(). It uses the secret key stored in process.env.SECRET_KEY to validate the token.
        //jwt.verify() returns the decoded payload (the data embedded in the token, such as the userId).
        const decoded = await jwt.verify(token,process.env.SECRET_KEY);

        if(!decoded){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            });
        }

        //store the user info in req object
        req.id = decoded.userId;

        //next() passes control to the next middleware function or route handler. This only happens if the token is valid.
        next();
    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated; 