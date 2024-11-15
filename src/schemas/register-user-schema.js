import  {validStates}  from "../utils/valid_states.js"

export const registerUserSchema = { 
    name: {
        isString:{ errorMessage: "Name must be a string"},
        notEmpty: { errorMessage: 'Name is required and cannot be empty'},
        isAlpha: {options: ['pt-BR', {ignore: ' '}] ,errorMessage: 'Name must contain only alphabetic characters'},
        isLength: { options: { min: 3 }, errorMessage: 'Name must be at least 3 characters long'}
    }, 
    email:{ 
        isEmail: {errorMessage: "Must be an email,"},
        isString: true,
        notEmpty: { errorMessage: 'Name is required and cannot be empty'}
    }, 
    state: { 
        isString: { 
            errorMessage: 'State must be a string'
        },
        notEmpty: {
            errorMessage: 'State is required and cannot be empty'
        },
        isLength: {
            options: { min: 2, max: 2 },
            errorMessage: 'State must be a valid 2-character string'
        },
        isIn: {
            options: [validStates],
            errorMessage: 'State must be a valid Brazilian state'
        },
    },
}
