import { badRequest } from "../errors/index.js";

const request_validation = (req, res, next) => {
    const books =  req.body?.books
    const keys = Object.keys(req.body).filter(item => req.body[item] === "");
    const invalidBooks = []
    
    books.forEach(book => { 
        if(!book.name  || !book.book_id || !book.publisher) {
            invalidBooks.push(book)
         }
    })

    if(invalidBooks.length > 0 ) { 
        next(new badRequest(`Você precisa preencher todos os campos dos livros que serao enviados.`, invalidBooks))
    }

    if(keys.length > 0) {
        next(new badRequest(`Você precisa preencher os campos: ${keys}`))
    }
    next()
}


export default request_validation



