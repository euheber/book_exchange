export const getUserInfoSchema = { 
    token: { 
        isString: true,
        notEmpty: { 
            errorMessage: 'Token params is a required field and cannot be empty'
        }
    }
}