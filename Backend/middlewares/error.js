class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode
    }
}

export const errorMiddleware = (err, req, res, next) =>{
    const statusCode = err.statusCode || 500; //500 means internal server error
    const message = err.message || "Internal Server Error";

    if(err.name === "CastError"){
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);  //400 means bad request
    }

    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is Invalid, Try Again`;
        err = new ErrorHandler(message, 400);  //400 means bad request
    }   
    
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is Invalid, Try Again`;
        err = new ErrorHandler(message, 400);  //400 means bad request
    }
    
    if(err.code === 11000){ //Duplicate User Error
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);  //400 means bad request
    }
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
}    

export default ErrorHandler;