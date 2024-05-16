import { Prisma } from "@prisma/client"
import prisma from "../lib/prismaClient.js"
import badRequest from "../errors/badRequest.js"
import sendEmail from "../utils/send_email_confirmation.js"


async function register_books(req, res) {
    const { name, email, tracking_code, books } = req.body

    
    try{ 
       const user =  await prisma.user.create({data: {name, email, tracking_code}})
       sendEmail(user.email)
       res.status(200).send(`Aqui está o seu id: ${user.id}. Não perca este identificador ou não conseguirá ter acesso aos seus dados na nossa plataforma`)
    }catch(e){ 
        if(e instanceof Prisma.PrismaClientKnownRequestError){ 
            if(e.code = 'P2002'){ 
                    throw new badRequest(`Usuário já cadastrado`)
            }
        }
    }

        // ! receber uma confirmação de cadastro via email.
        // * Usar nodemailer pra isso
    
    // const editedBooks = books.map(book => { 
    //     return { 
    //         ...book, 
    //         userId: user.id
    //     }
    // })

    // await prisma.books.createMany({data: editedBooks})
    
    
}

export default register_books