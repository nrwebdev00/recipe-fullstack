import ErrorResponse from "../Utlis/errorResponse.js";

const errorHandler =(err,req,res,next)=>{
    let error = { ...err }
    
    error.message = err.message;

    console.log(err)


    // Mongoose incorrect fromat of Object id => CastError
    if(err.name === 'CastError'){
        const message = `item not found with an id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose Duplicate field enterd
    if(err.code == 11000){
        const message = "Item is already in the system";
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success:false,
        error: error.message || 'Server Error'
    });
}

export default errorHandler;