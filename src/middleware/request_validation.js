import { badRequest } from "../errors/index.js";
import checkBooks from "../utils/check_books.js";
import checkUsersInfo from "../utils/check_users_info.js";

const request_validation = async (req, res, next) => {
    const { books, ...userInfo } = req.body;
    const invalidBooks = books ? checkBooks(books) : []
    const checkForEmptyFields = Object.keys(userInfo).filter(item => userInfo[item] === "");

    if (invalidBooks.length > 0) {
        return next(new badRequest("Você precisa preencher todos os campos"))
    }


    if (checkForEmptyFields.length > 0) {
        return next(new badRequest(`Você precisa preencher os campos: ${checkForEmptyFields.join(', ')}`));
    }

    const usersInfoValidation = checkUsersInfo(userInfo)

    if (usersInfoValidation) {
        return next(usersInfoValidation)
    }

    next();
};

export default request_validation;






