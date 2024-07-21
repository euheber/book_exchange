export const updateUserEmailSchema = { 
    email: {
        isString: { errorMessage: 'Email must be a string'},
        isEmail:{errorMessage: 'Email is not valid'},
        notEmpty:{errorMessage: 'Email is a required field and cannot be empty'}
    }
}