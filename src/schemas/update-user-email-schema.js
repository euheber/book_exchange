export const updateUserEmailSchema = { 
    updatedEmail: {
        isString: { errorMessage: 'Email must be a string'},
        isEmail:{errorMessage: 'Email is not valid'},
        notEmpty:{errorMessage: 'Email is a required field and cannot be empty'}
    },
    token: {
        isJWT:{errorMessage: "Token must be a valid token"},
        notEmpty: {errorMessage: "Token is a required parameter and cannot be empty"}
    }
}