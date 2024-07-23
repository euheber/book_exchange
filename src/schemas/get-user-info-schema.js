export const getUserInfoSchema = { 
    tracking_code : { 
        isString: { errorMessage: "Tracking code must be a string"},
        notEmpty: { errorMessage: 'Tracking code is a required field and cannot be empty' }
    }
}