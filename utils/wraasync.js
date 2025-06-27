// utility is the folder for extra thomg like wrap async 
//  wrap async is a way to handle the error in place of try catch block we use wrapasync its like playing with function 


//function wrapasync
    module.exports = (fn) =>    // it takes argument as a function 
{
    return (req,res,next) => {       //  wrapasync also return function which contain res,req,next
        fn(req,res,next).catch(next);    //the above function work to execute the fn funtion which 
                                         // use catch to handle the error by sending next with catch 
    }

}

















//Standard way of async funtion 
// function wrapasync(fn)    // it takes argument as a function 
// {
//     return function(res,req,next){       //  wrapasync also return function which contain res,req,next
//         fn(req,res,next).catch(next);    //the above function work to execute the fn funtion which 
//                                          // use catch to handle the error by sending next with catch 
//     }

// }