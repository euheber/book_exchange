export const registerBooksSchema =  { 
  books: {
    isArray: {
      errorMessage: 'Books must be an array'
    },
    notEmpty: { errorMessage: 'Books is required field and cannot be empty' }
  },
  'books.*.name': {
    isString: {
      errorMessage: 'Name must be a string'
    },
    notEmpty: { errorMessage: 'book name is a required field and cannot be empty' }
  },
  'books.*.book_id': {
    isString: {
      errorMessage: 'Book ID must be a string' 
    },
    notEmpty: { errorMessage: 'book_id is required and cannot be empty' }
  },
  'books.*.publisher': {
    isString: {
      errorMessage: 'Publisher must be a string'
    },
    notEmpty: { errorMessage: 'publisher field is required and cannot be empty' }
  },
};
