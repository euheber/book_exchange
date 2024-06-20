import { badRequest } from "../errors/index.js";
import checkEmail from "../utils/check_if_email_is_valid.js"
import validStates from "../utils/valid_states.js";

const request_validation = async (req, res, next) => {
    const { books, ...rest } = req.body;
    const invalidBooks = [];
    const getObjectFields = Object.keys(rest).filter(item => rest[item] === "");

    if (books) {
        books.forEach(book => {
            if (!book.name || !book.book_id || !book.publisher) {
                invalidBooks.push(book);
            }
        });

        if (invalidBooks.length > 0) {
            return next(new badRequest(`Você precisa preencher todos os campos dos livros que serão enviados.`));
        }
    }

    if (rest.email) {
        if (!checkEmail(rest.email)) {
            return next(new badRequest("Ofereça um email válido para contato"));
        }
    }


    if (getObjectFields.length > 0) {
        return next(new badRequest(`Você precisa preencher os campos: ${getObjectFields.join(', ')}`));
    }

    if (!validStates(rest.state)) {

        return next(new badRequest("Você precisa enviar um estado válido"))
    }

    next();
};

export default request_validation;






