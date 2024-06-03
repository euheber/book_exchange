import { badRequest } from "../errors/index.js";

const request_validation = (req, res, next) => {
    const { books, ...rest } = req.body;
    const invalidBooks = [];


    if (books) {
        books.forEach(book => { 
            if (!book.name || !book.book_id || !book.publisher) {
                invalidBooks.push(book);
            }
        });

        if (invalidBooks.length > 0) { 
             next(new badRequest(`Você precisa preencher todos os campos dos livros que serão enviados.`));
        }
    }


    const getObjectFields = Object.keys(rest).filter(item => rest[item] === "");

    if (getObjectFields.length > 0) {
        return next(new badRequest(`Você precisa preencher os campos: ${getObjectFields}`));
    }

    next();
};

export default request_validation;






