
// //  We use JOI wrong way to handle what if we have 1000 datas 
// Joi helps that we define a schema other than mongoose but same that we need to validate in server so we use joi as a validation schema 


const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({

        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.object({
         url: Joi.string().allow("")  // allow empty string if user doesn't input a value
    })

    }).required()

});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});