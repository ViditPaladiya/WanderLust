// utility is the folder for extra thomg like wrap async 
// Express Error to show the different ERROR rather than showing same error as in wrap class

class ExpressError extends Error{

    constructor(statusCode , message){
    super();
    this.statusCode = statusCode;   // it get the predefined function using constructor from Error
    this.message = message;

    }
}

module.exports = ExpressError;